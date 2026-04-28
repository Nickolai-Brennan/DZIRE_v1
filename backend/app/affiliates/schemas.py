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


# ---------------------------------------------------------------------------
# Tracking
# ---------------------------------------------------------------------------


class AffiliateClickCreate(BaseModel):
    affiliate_id: Optional[UUID] = None
    post_id: Optional[UUID] = None
    user_id: Optional[UUID] = None
    session_id: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    referrer: Optional[str] = None


class AffiliateClickRead(BaseModel):
    id: UUID
    affiliate_id: Optional[UUID] = None
    click_id: str
    session_id: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    referrer: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class AffiliateConversionCreate(BaseModel):
    session_id: Optional[str] = None
    click_id: Optional[UUID] = None
    order_id: Optional[str] = None
    amount: float
    commission_rate: float = 0.10


class AffiliateConversionRead(BaseModel):
    id: UUID
    affiliate_click_id: Optional[UUID] = None
    order_id: Optional[str] = None
    amount: float
    commission: float
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}
