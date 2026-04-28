"""backend/app/content_calendar/schemas.py — Pydantic v2 schemas for Content Calendar."""

from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class ContentCalendarBase(BaseModel):
    title: str
    content_type: str
    related_post_id: Optional[UUID] = None
    campaign_id: Optional[UUID] = None
    platform: Optional[str] = None
    status: str = "idea"
    scheduled_at: Optional[datetime] = None
    published_at: Optional[datetime] = None
    assigned_to: Optional[UUID] = None
    priority: int = 3
    notes: Optional[str] = None
    last_verified_at: Optional[datetime] = None


class ContentCalendarCreate(ContentCalendarBase):
    pass


class ContentCalendarUpdate(BaseModel):
    title: Optional[str] = None
    content_type: Optional[str] = None
    related_post_id: Optional[UUID] = None
    campaign_id: Optional[UUID] = None
    platform: Optional[str] = None
    status: Optional[str] = None
    scheduled_at: Optional[datetime] = None
    published_at: Optional[datetime] = None
    assigned_to: Optional[UUID] = None
    priority: Optional[int] = None
    notes: Optional[str] = None
    last_verified_at: Optional[datetime] = None


class ContentCalendarRead(ContentCalendarBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


# ── Action payload schemas ────────────────────────────────────────────────────


class SchedulePayload(BaseModel):
    item_id: UUID
    scheduled_at: datetime


class PublishPayload(BaseModel):
    item_id: UUID


class StatusPayload(BaseModel):
    item_id: UUID
    status: str
