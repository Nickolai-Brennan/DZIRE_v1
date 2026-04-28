"""backend/app/recommendations/routes.py — Recommendation and saved-posts API routes."""

from __future__ import annotations

from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.database import get_db
from . import services
from .schemas import RecommendationRead, SavedPostCreate, SavedPostRead, SavedPostRemove

router = APIRouter(prefix="/api/recommendations", tags=["recommendations"])
saved_router = APIRouter(prefix="/api/saved-posts", tags=["saved-posts"])


# ── Recommendations ───────────────────────────────────────────────────────────


@router.get("/related/{content_id}", response_model=list[RecommendationRead])
async def related_posts(
    content_id: UUID,
    limit: int = Query(6, ge=1, le=20),
    db: AsyncSession = Depends(get_db),
) -> list[RecommendationRead]:
    return await services.get_related_posts(db, content_id=content_id, limit=limit)


@router.get("/trending", response_model=list[RecommendationRead])
async def trending_posts(
    days: int = Query(7, ge=1, le=90),
    limit: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
) -> list[RecommendationRead]:
    return await services.get_trending_posts(db, days=days, limit=limit)


@router.get("/for-you/{user_id}", response_model=list[RecommendationRead])
async def recommended_for_user(
    user_id: UUID,
    limit: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
) -> list[RecommendationRead]:
    return await services.get_recommended_for_user(db, user_id=user_id, limit=limit)


# ── Saved Posts ───────────────────────────────────────────────────────────────


@saved_router.get("", response_model=list[SavedPostRead])
async def list_saved_posts(
    user_id: UUID = Query(...),
    collection_name: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
) -> list[SavedPostRead]:
    saved = await services.list_saved_posts(
        db, user_id=user_id, collection_name=collection_name
    )
    return [SavedPostRead.model_validate(s) for s in saved]


@saved_router.post("/add", response_model=SavedPostRead, status_code=201)
async def add_saved_post(
    body: SavedPostCreate,
    db: AsyncSession = Depends(get_db),
) -> SavedPostRead:
    saved = await services.add_saved_post(db, body)
    return SavedPostRead.model_validate(saved)


@saved_router.post("/remove", status_code=200)
async def remove_saved_post(
    body: SavedPostRemove,
    db: AsyncSession = Depends(get_db),
) -> dict:
    removed = await services.remove_saved_post(
        db,
        user_id=body.user_id,
        post_id=body.post_id,
        collection_name=body.collection_name,
    )
    if not removed:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Saved post not found"
        )
    return {"status": "removed"}


@saved_router.get("/collections", response_model=list[str])
async def list_collections(
    user_id: UUID = Query(...),
    db: AsyncSession = Depends(get_db),
) -> list[str]:
    return await services.list_collections(db, user_id=user_id)
