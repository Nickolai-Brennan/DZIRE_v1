"""backend/app/sponsors/schemas.py — Pydantic v2 schemas for sponsors."""

from __future__ import annotations

from datetime import date, datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class SponsorBase(BaseModel):
    name: str
    website: Optional[str] = None
    contact_name: Optional[str] = None
    contact_email: Optional[str] = None
    logo_url: Optional[str] = None
    status: str = "active"
    notes: Optional[str] = None


class SponsorCreate(SponsorBase):
    pass


class SponsorRead(SponsorBase):
    id: UUID
    created_at: datetime

    model_config = {"from_attributes": True}


class SponsorCampaignBase(BaseModel):
    sponsor_id: UUID
    campaign_name: str
    placement_type: str
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    budget: Optional[float] = None
    status: str = "draft"


class SponsorCampaignCreate(SponsorCampaignBase):
    pass


class SponsorCampaignRead(SponsorCampaignBase):
    id: UUID
    impressions: int
    clicks: int
    ctr: Optional[float] = None
    created_at: datetime

    model_config = {"from_attributes": True}
