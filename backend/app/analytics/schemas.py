"""backend/app/analytics/schemas.py — Pydantic v2 schemas for analytics."""

from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class AnalyticsEventCreate(BaseModel):
    event_type: str
    user_id: Optional[UUID] = None
    session_id: Optional[str] = None
    post_id: Optional[UUID] = None
    source: Optional[str] = None
    referrer: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    device_type: Optional[str] = None
    country: Optional[str] = None
    region: Optional[str] = None
    city: Optional[str] = None
    event_metadata: Optional[dict] = None


class AnalyticsEventRead(AnalyticsEventCreate):
    id: UUID
    created_at: datetime

    model_config = {"from_attributes": True}


class PageViewCreate(BaseModel):
    path: str
    referrer: Optional[str] = None
    session_id: Optional[str] = None
    user_id: Optional[UUID] = None
    device_type: Optional[str] = None
    country: Optional[str] = None


class PageViewRead(PageViewCreate):
    id: UUID
    created_at: datetime

    model_config = {"from_attributes": True}


class ClickEventCreate(BaseModel):
    element: str
    url: Optional[str] = None
    post_id: Optional[UUID] = None
    session_id: Optional[str] = None
    user_id: Optional[UUID] = None
