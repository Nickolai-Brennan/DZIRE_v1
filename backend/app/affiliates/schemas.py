"""backend/app/affiliates/schemas.py — Pydantic v2 schemas for affiliates."""

from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class AffiliateBase(BaseModel):
    name: str
    website: Optional[str] = None
    contact_email: Optional[str] = None
    network: Optional[str] = None
    commission_rate: Optional[float] = None
    status: str = "active"
    notes: Optional[str] = None


class AffiliateCreate(AffiliateBase):
    pass


class AffiliateRead(AffiliateBase):
    id: UUID
    created_at: datetime

    model_config = {"from_attributes": True}


class AffiliateLinkBase(BaseModel):
    affiliate_id: UUID
    post_id: Optional[UUID] = None
    product_name: str
    destination_url: str
    tracking_url: Optional[str] = None
    coupon_code: Optional[str] = None
    status: str = "active"


class AffiliateLinkCreate(AffiliateLinkBase):
    pass


class AffiliateLinkRead(AffiliateLinkBase):
    id: UUID
    click_count: int
    conversion_count: int
    estimated_revenue: float
    created_at: datetime

    model_config = {"from_attributes": True}
