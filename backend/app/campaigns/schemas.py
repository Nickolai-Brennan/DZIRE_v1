"""backend/app/campaigns/schemas.py — Pydantic v2 schemas for Campaigns."""

from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class CampaignBase(BaseModel):
    name: str
    campaign_type: str
    goal: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    status: str = "draft"
    budget: Optional[Decimal] = None
    target_platforms: Optional[list[str]] = None
    primary_cta: Optional[str] = None


class CampaignCreate(CampaignBase):
    pass


class CampaignUpdate(BaseModel):
    name: Optional[str] = None
    campaign_type: Optional[str] = None
    goal: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    status: Optional[str] = None
    budget: Optional[Decimal] = None
    target_platforms: Optional[list[str]] = None
    primary_cta: Optional[str] = None


class CampaignRead(CampaignBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
