"""backend/app/recommendations/services.py — Recommendation business logic."""

from __future__ import annotations

import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from ..search.models import SearchIndex
from .models import Recommendation, SavedPost
from .scoring import compute_recommendation_score
from .schemas import RecommendationRead, SavedPostCreate, SavedPostRead


async def get_related_posts(
    db: AsyncSession,
    content_id: uuid.UUID,
    limit: int = 6,
) -> list[RecommendationRead]:
    """Return related posts based on tag/category overlap."""
    source_result = await db.execute(
        select(SearchIndex).where(SearchIndex.content_id == content_id)
    )
    source = source_result.scalar_one_or_none()
    if source is None:
        return []

    all_result = await db.execute(
        select(SearchIndex).where(SearchIndex.content_id != content_id)
    )
    candidates = all_result.scalars().all()

    source_tags = set(source.tags or [])
    scored = []
    for c in candidates:
        c_tags = set(c.tags or [])
        tag_overlap = len(source_tags & c_tags)
        category_match = (c.category == source.category) and bool(c.category)
        score = compute_recommendation_score(
            tag_overlap=tag_overlap,
            category_match=category_match,
            view_count=c.view_count,
            click_count=c.click_count,
            published_at=c.published_at,
        )
        scored.append((c, score))

    scored.sort(key=lambda x: x[1], reverse=True)
    return [
        RecommendationRead(
            id=uuid.uuid4(),
            content_id=c.content_id,
            content_type=c.content_type,
            recommendation_type="related",
            score=score,
            reason=f"Shared tags: {len(set(source_tags) & set(c.tags or []))}",
            created_at=datetime.now(timezone.utc),
        )
        for c, score in scored[:limit]
    ]


async def get_trending_posts(
    db: AsyncSession,
    days: int = 7,
    limit: int = 10,
) -> list[RecommendationRead]:
    """Return trending posts by combined view+click count in the past N days."""
    since = datetime.now(timezone.utc) - timedelta(days=days)
    result = await db.execute(
        select(SearchIndex)
        .where(SearchIndex.published_at >= since)
        .order_by((SearchIndex.view_count + SearchIndex.click_count * 3).desc())
        .limit(limit)
    )
    entries = result.scalars().all()
    return [
        RecommendationRead(
            id=uuid.uuid4(),
            content_id=e.content_id,
            content_type=e.content_type,
            recommendation_type="trending",
            score=float(e.view_count + e.click_count * 3),
            reason="Trending now",
            created_at=datetime.now(timezone.utc),
        )
        for e in entries
    ]


async def get_recommended_for_user(
    db: AsyncSession,
    user_id: uuid.UUID,
    limit: int = 10,
) -> list[RecommendationRead]:
    """Return personalized recommendations for a user."""
    from ..recommendations.personalization import build_personalization_score
    from ..user_behavior.services import get_user_preferences

    prefs = await get_user_preferences(db, user_id)
    fav_tags = set((prefs.favorite_tags or []) if prefs else [])
    fav_cats = set((prefs.favorite_categories or []) if prefs else [])

    result = await db.execute(select(SearchIndex))
    candidates = result.scalars().all()

    scored = []
    for c in candidates:
        tag_overlap = len(fav_tags & set(c.tags or []))
        category_match = c.category in fav_cats if c.category else False
        p_score = await build_personalization_score(
            db,
            user_id,
            content_tags=c.tags,
            content_category=c.category,
        )
        score = compute_recommendation_score(
            tag_overlap=tag_overlap,
            category_match=category_match,
            view_count=c.view_count,
            click_count=c.click_count,
            published_at=c.published_at,
            user_interest=p_score,
        )
        scored.append((c, score))

    scored.sort(key=lambda x: x[1], reverse=True)
    return [
        RecommendationRead(
            id=uuid.uuid4(),
            content_id=c.content_id,
            content_type=c.content_type,
            recommendation_type="recommended_for_you",
            score=score,
            reason="Based on your interests",
            created_at=datetime.now(timezone.utc),
        )
        for c, score in scored[:limit]
    ]


# ── Saved Posts ───────────────────────────────────────────────────────────────


async def add_saved_post(db: AsyncSession, body: SavedPostCreate) -> SavedPost:
    # Check duplicate
    existing_result = await db.execute(
        select(SavedPost).where(
            SavedPost.user_id == body.user_id,
            SavedPost.post_id == body.post_id,
            SavedPost.collection_name == body.collection_name,
        )
    )
    existing = existing_result.scalar_one_or_none()
    if existing:
        return existing

    saved = SavedPost(
        user_id=body.user_id,
        post_id=body.post_id,
        collection_name=body.collection_name,
    )
    db.add(saved)
    await db.commit()
    await db.refresh(saved)
    return saved


async def remove_saved_post(
    db: AsyncSession, user_id: uuid.UUID, post_id: uuid.UUID, collection_name: str
) -> bool:
    result = await db.execute(
        select(SavedPost).where(
            SavedPost.user_id == user_id,
            SavedPost.post_id == post_id,
            SavedPost.collection_name == collection_name,
        )
    )
    saved = result.scalar_one_or_none()
    if saved is None:
        return False
    await db.delete(saved)
    await db.commit()
    return True


async def list_saved_posts(
    db: AsyncSession, user_id: uuid.UUID, collection_name: Optional[str] = None
) -> list[SavedPost]:
    stmt = select(SavedPost).where(SavedPost.user_id == user_id)
    if collection_name:
        stmt = stmt.where(SavedPost.collection_name == collection_name)
    result = await db.execute(stmt.order_by(SavedPost.created_at.desc()))
    return list(result.scalars().all())


async def list_collections(db: AsyncSession, user_id: uuid.UUID) -> list[str]:
    from sqlalchemy import distinct

    result = await db.execute(
        select(distinct(SavedPost.collection_name)).where(
            SavedPost.user_id == user_id
        )
    )
    return [row[0] for row in result.fetchall()]
