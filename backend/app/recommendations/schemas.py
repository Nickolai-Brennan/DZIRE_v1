"""backend/app/recommendations/schemas.py — Pydantic v2 schemas for recommendations."""

from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


# ── Recommendation ───────────────────────────────────────────────────────────


class RecommendationRead(BaseModel):
    id: UUID
    user_id: Optional[UUID] = None
    content_id: UUID
    content_type: str
    recommendation_type: str
    score: float
    reason: Optional[str] = None
    shown_at: Optional[datetime] = None
    clicked_at: Optional[datetime] = None
    dismissed_at: Optional[datetime] = None
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Saved Posts ───────────────────────────────────────────────────────────────


class SavedPostCreate(BaseModel):
    user_id: UUID
    post_id: UUID
    collection_name: str = "default"


class SavedPostRead(BaseModel):
    id: UUID
    user_id: UUID
    post_id: UUID
    collection_name: str
    created_at: datetime

    model_config = {"from_attributes": True}


class SavedPostRemove(BaseModel):
    user_id: UUID
    post_id: UUID
    collection_name: str = "default"
