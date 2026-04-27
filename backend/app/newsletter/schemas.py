"""backend/app/newsletter/schemas.py — Pydantic v2 schemas for newsletter."""
from __future__ import annotations
from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class SubscribeRequest(BaseModel):
    email: str
    first_name: Optional[str] = None
    source: Optional[str] = None


class SubscriberRead(BaseModel):
    id: UUID
    email: str
    first_name: Optional[str] = None
    source: Optional[str] = None
    status: str
    is_vip: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class CampaignBase(BaseModel):
    subject: str
    preview_text: Optional[str] = None
    body_content: Optional[str] = None
    status: str = "draft"
    scheduled_at: Optional[datetime] = None


class CampaignCreate(CampaignBase):
    pass


class CampaignRead(CampaignBase):
    id: UUID
    sent_at: Optional[datetime] = None
    open_rate: Optional[float] = None
    click_rate: Optional[float] = None
    created_at: datetime

    model_config = {"from_attributes": True}
