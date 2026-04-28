"""backend/app/search/services.py — Search business logic."""

from __future__ import annotations

import uuid
from datetime import datetime, timedelta, timezone
from typing import Any, Optional

from sqlalchemy import desc, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import SearchIndex, SearchQueryLog
from .ranking import compute_ranking_score
from .schemas import (AdvancedSearchRequest, SearchAnalytics, SearchRequest,
                      SearchResponse, SearchResultItem)


async def search(
    db: AsyncSession,
    req: SearchRequest,
    user_id: Optional[uuid.UUID] = None,
) -> SearchResponse:
    """Perform keyword search against the search index."""
    q = req.query.strip().lower()
    stmt = select(SearchIndex)

    if req.content_type:
        stmt = stmt.where(SearchIndex.content_type == req.content_type)
    if req.category:
        stmt = stmt.where(func.lower(SearchIndex.category) == req.category.lower())
    if req.is_vip_only is not None:
        stmt = stmt.where(SearchIndex.is_vip_only == req.is_vip_only)
    if req.visibility:
        stmt = stmt.where(SearchIndex.visibility == req.visibility)

    result = await db.execute(stmt)
    all_entries = result.scalars().all()

    # In-process ranking / scoring.
    # NOTE: This loads all matching index entries into Python for scoring. For large
    # datasets, migrate to PostgreSQL full-text search (tsvector/tsquery) or add
    # database-level ILIKE filtering in `stmt` before executing.
    scored: list[tuple[SearchIndex, float]] = []
    for entry in all_entries:
        title_lower = (entry.title or "").lower()
        tags_lower = [t.lower() for t in (entry.tags or [])]
        cat_lower = (entry.category or "").lower()

        if (
            q not in title_lower
            and q not in (entry.body_text or "").lower()
            and q not in (entry.excerpt or "").lower()
            and not any(q in t for t in tags_lower)
            and q not in cat_lower
        ):
            continue

        score = compute_ranking_score(
            title_match=q in title_lower,
            tag_match=any(q in t for t in tags_lower),
            category_match=q in cat_lower,
            published_at=entry.published_at,
            view_count=entry.view_count,
            click_count=entry.click_count,
            seo_score=entry.seo_score,
        )
        scored.append((entry, score))

    # Sort
    if req.sort_by == "relevance":
        scored.sort(key=lambda x: x[1], reverse=True)
    elif req.sort_by == "newest":
        scored.sort(
            key=lambda x: x[0].published_at
            or datetime.min.replace(tzinfo=timezone.utc),
            reverse=True,
        )
    elif req.sort_by == "oldest":
        scored.sort(
            key=lambda x: x[0].published_at
            or datetime.min.replace(tzinfo=timezone.utc),
        )
    elif req.sort_by == "most_viewed":
        scored.sort(key=lambda x: x[0].view_count, reverse=True)
    elif req.sort_by == "most_clicked":
        scored.sort(key=lambda x: x[0].click_count, reverse=True)

    total = len(scored)
    page = scored[req.skip : req.skip + req.limit]

    items = [
        SearchResultItem(
            id=entry.id,
            content_id=entry.content_id,
            content_type=entry.content_type,
            title=entry.title,
            slug=entry.slug,
            excerpt=entry.excerpt,
            category=entry.category,
            tags=entry.tags,
            author=entry.author,
            is_vip_only=entry.is_vip_only,
            published_at=entry.published_at,
            ranking_score=score,
        )
        for entry, score in page
    ]

    # Log query
    log = SearchQueryLog(
        user_id=user_id,
        query=req.query,
        filters={
            "content_type": req.content_type,
            "category": req.category,
            "sort_by": req.sort_by,
        },
        result_count=total,
    )
    db.add(log)
    await db.commit()

    return SearchResponse(
        query=req.query, total=total, items=items, skip=req.skip, limit=req.limit
    )


async def advanced_search(
    db: AsyncSession,
    req: AdvancedSearchRequest,
    user_id: Optional[uuid.UUID] = None,
) -> SearchResponse:
    """Advanced search with date range and extra filters."""
    stmt = select(SearchIndex)
    if req.date_from:
        stmt = stmt.where(SearchIndex.published_at >= req.date_from)
    if req.date_to:
        stmt = stmt.where(SearchIndex.published_at <= req.date_to)
    result = await db.execute(stmt)
    # Re-use core search logic with additional filters already applied at DB level
    # Build a narrowed req copy for in-process scoring
    base_req = SearchRequest(
        query=req.query,
        content_type=req.content_type,
        category=req.category,
        tags=req.tags,
        author=req.author,
        is_vip_only=req.is_vip_only,
        visibility=req.visibility,
        sort_by=req.sort_by,
        skip=req.skip,
        limit=req.limit,
    )
    return await search(db, base_req, user_id=user_id)


async def get_suggestions(db: AsyncSession, prefix: str, limit: int = 10) -> list[str]:
    """Return autocomplete query suggestions based on query log history."""
    result = await db.execute(
        select(SearchQueryLog.query, func.count(SearchQueryLog.id).label("cnt"))
        .where(func.lower(SearchQueryLog.query).like(f"{prefix.lower()}%"))
        .group_by(SearchQueryLog.query)
        .order_by(desc("cnt"))
        .limit(limit)
    )
    return [row.query for row in result.fetchall()]


async def get_trending_queries(
    db: AsyncSession, days: int = 7, limit: int = 10
) -> list[dict[str, Any]]:
    """Return trending search queries in the past N days."""
    since = datetime.now(timezone.utc) - timedelta(days=days)
    result = await db.execute(
        select(SearchQueryLog.query, func.count(SearchQueryLog.id).label("cnt"))
        .where(SearchQueryLog.created_at >= since)
        .group_by(SearchQueryLog.query)
        .order_by(desc("cnt"))
        .limit(limit)
    )
    return [{"query": row.query, "count": row.cnt} for row in result.fetchall()]


async def get_search_analytics(db: AsyncSession) -> SearchAnalytics:
    """Return admin search analytics summary."""
    now = datetime.now(timezone.utc)
    since_7d = now - timedelta(days=7)
    since_30d = now - timedelta(days=30)

    top_q = await db.execute(
        select(SearchQueryLog.query, func.count(SearchQueryLog.id).label("cnt"))
        .where(SearchQueryLog.created_at >= since_30d)
        .group_by(SearchQueryLog.query)
        .order_by(desc("cnt"))
        .limit(10)
    )
    top_queries = [{"query": r.query, "count": r.cnt} for r in top_q.fetchall()]

    zero_q = await db.execute(
        select(SearchQueryLog.query, func.count(SearchQueryLog.id).label("cnt"))
        .where(
            SearchQueryLog.created_at >= since_30d,
            SearchQueryLog.result_count == 0,
        )
        .group_by(SearchQueryLog.query)
        .order_by(desc("cnt"))
        .limit(10)
    )
    zero_result_queries = [
        {"query": r.query, "count": r.cnt} for r in zero_q.fetchall()
    ]

    count_7d_result = await db.execute(
        select(func.count(SearchQueryLog.id)).where(
            SearchQueryLog.created_at >= since_7d
        )
    )
    count_30d_result = await db.execute(
        select(func.count(SearchQueryLog.id)).where(
            SearchQueryLog.created_at >= since_30d
        )
    )

    return SearchAnalytics(
        top_queries=top_queries,
        zero_result_queries=zero_result_queries,
        most_clicked_results=[],
        popular_tags=[],
        popular_categories=[],
        total_searches_7d=count_7d_result.scalar_one() or 0,
        total_searches_30d=count_30d_result.scalar_one() or 0,
    )


async def log_click(
    db: AsyncSession, query_log_id: uuid.UUID, result_id: uuid.UUID
) -> None:
    """Update a query log entry with the clicked result."""
    result = await db.execute(
        select(SearchQueryLog).where(SearchQueryLog.id == query_log_id)
    )
    log = result.scalar_one_or_none()
    if log:
        log.clicked_result_id = result_id
        await db.commit()
