"""backend/app/user_behavior/routes.py — User behavior API routes."""

from __future__ import annotations

from typing import Any, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.database import get_db
from . import services
from .models import UserBehaviorEvent, UserPreference

router = APIRouter(prefix="/api/behavior", tags=["user-behavior"])


# ── Schemas (inline for simplicity — mirrors pattern in other modules) ────────


class BehaviorEventCreate(BaseModel):
    user_id: Optional[UUID] = None
    session_id: Optional[str] = None
    event_type: str
    content_id: Optional[UUID] = None
    content_type: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[list[str]] = None
    duration_seconds: Optional[int] = None
    scroll_depth: Optional[float] = None
    source: Optional[str] = None
    metadata: Optional[dict[str, Any]] = None


class BehaviorEventRead(BaseModel):
    id: UUID
    user_id: Optional[UUID] = None
    session_id: Optional[str] = None
    event_type: str
    content_id: Optional[UUID] = None
    content_type: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[list[str]] = None
    duration_seconds: Optional[int] = None
    scroll_depth: Optional[float] = None
    source: Optional[str] = None

    model_config = {"from_attributes": True}


class PreferenceUpdate(BaseModel):
    favorite_categories: Optional[list[str]] = None
    favorite_tags: Optional[list[str]] = None
    preferred_content_types: Optional[list[str]] = None
    blocked_tags: Optional[list[str]] = None
    personalization_enabled: Optional[bool] = None


class PreferenceRead(BaseModel):
    id: UUID
    user_id: UUID
    favorite_categories: Optional[list[str]] = None
    favorite_tags: Optional[list[str]] = None
    preferred_content_types: Optional[list[str]] = None
    blocked_tags: Optional[list[str]] = None
    vip_interest_score: float
    personalization_enabled: bool

    model_config = {"from_attributes": True}


# ── Routes ────────────────────────────────────────────────────────────────────


@router.post("/events", response_model=BehaviorEventRead, status_code=201)
async def track_event(
    body: BehaviorEventCreate,
    db: AsyncSession = Depends(get_db),
) -> BehaviorEventRead:
    event = await services.record_event(
        db,
        user_id=body.user_id,
        session_id=body.session_id,
        event_type=body.event_type,
        content_id=body.content_id,
        content_type=body.content_type,
        category=body.category,
        tags=body.tags,
        duration_seconds=body.duration_seconds,
        scroll_depth=body.scroll_depth,
        source=body.source,
        metadata=body.metadata,
    )
    return BehaviorEventRead.model_validate(event)


@router.get("/preferences/{user_id}", response_model=PreferenceRead)
async def get_preferences(
    user_id: UUID, db: AsyncSession = Depends(get_db)
) -> PreferenceRead:
    prefs = await services.get_user_preferences(db, user_id)
    if prefs is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Preferences not found"
        )
    return PreferenceRead.model_validate(prefs)


@router.put("/preferences/{user_id}", response_model=PreferenceRead)
async def update_preferences(
    user_id: UUID,
    body: PreferenceUpdate,
    db: AsyncSession = Depends(get_db),
) -> PreferenceRead:
    prefs = await services.upsert_user_preferences(
        db,
        user_id=user_id,
        favorite_categories=body.favorite_categories,
        favorite_tags=body.favorite_tags,
        preferred_content_types=body.preferred_content_types,
        blocked_tags=body.blocked_tags,
        personalization_enabled=body.personalization_enabled,
    )
    return PreferenceRead.model_validate(prefs)


@router.delete("/history/{user_id}", status_code=200)
async def clear_history(user_id: UUID, db: AsyncSession = Depends(get_db)) -> dict:
    count = await services.clear_behavior_history(db, user_id)
    return {"deleted": count}
