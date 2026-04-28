"""backend/app/search/routes.py — Search API route handlers."""

from __future__ import annotations

from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.database import get_db
from . import services
from .schemas import (AdvancedSearchRequest, SearchAnalytics, SearchRequest,
                      SearchResponse)

router = APIRouter(prefix="/api/search", tags=["search"])
admin_router = APIRouter(prefix="/api/admin", tags=["admin-search"])


@router.get("", response_model=SearchResponse)
async def search(
    q: str = Query(..., min_length=1, description="Search query"),
    content_type: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    sort_by: str = Query("relevance"),
    is_vip_only: Optional[bool] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
) -> SearchResponse:
    req = SearchRequest(
        query=q,
        content_type=content_type,
        category=category,
        sort_by=sort_by,
        is_vip_only=is_vip_only,
        skip=skip,
        limit=limit,
    )
    return await services.search(db, req)


@router.post("/advanced", response_model=SearchResponse)
async def advanced_search(
    body: AdvancedSearchRequest,
    db: AsyncSession = Depends(get_db),
) -> SearchResponse:
    return await services.advanced_search(db, body)


@router.get("/suggestions", response_model=list[str])
async def search_suggestions(
    q: str = Query(..., min_length=1),
    limit: int = Query(10, ge=1, le=20),
    db: AsyncSession = Depends(get_db),
) -> list[str]:
    return await services.get_suggestions(db, prefix=q, limit=limit)


@router.get("/trending", response_model=list[dict])
async def trending_searches(
    days: int = Query(7, ge=1, le=90),
    limit: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    return await services.get_trending_queries(db, days=days, limit=limit)


@router.get("/tags", response_model=list[str])
async def search_tags(
    q: str = Query(""),
    db: AsyncSession = Depends(get_db),
) -> list[str]:
    from sqlalchemy import select
    from ..cms.models import CmsTag

    stmt = select(CmsTag.name)
    if q:
        stmt = stmt.where(CmsTag.name.ilike(f"%{q}%"))
    result = await db.execute(stmt.limit(50))
    return [row[0] for row in result.fetchall()]


@router.get("/categories", response_model=list[str])
async def search_categories(
    q: str = Query(""),
    db: AsyncSession = Depends(get_db),
) -> list[str]:
    from sqlalchemy import select
    from ..cms.models import CmsCategory

    stmt = select(CmsCategory.name)
    if q:
        stmt = stmt.where(CmsCategory.name.ilike(f"%{q}%"))
    result = await db.execute(stmt.limit(50))
    return [row[0] for row in result.fetchall()]


@admin_router.get("/search-analytics", response_model=SearchAnalytics)
async def search_analytics(
    db: AsyncSession = Depends(get_db),
) -> SearchAnalytics:
    return await services.get_search_analytics(db)
