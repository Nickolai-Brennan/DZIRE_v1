"""backend/app/subscriptions/schemas.py — Pydantic v2 schemas for VIP subscriptions."""
from __future__ import annotations
from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class VipPlanBase(BaseModel):
    name: str
    price: float
    billing_interval: str = "monthly"
    description: Optional[str] = None
    features: Optional[dict] = None
    status: str = "active"


class VipPlanCreate(VipPlanBase):
    pass


class VipPlanRead(VipPlanBase):
    id: UUID
    created_at: datetime

    model_config = {"from_attributes": True}


class VipSubscribeRequest(BaseModel):
    plan_id: UUID
    user_id: UUID
    payment_provider: Optional[str] = None
    provider_subscription_id: Optional[str] = None


class VipSubscriptionRead(BaseModel):
    id: UUID
    user_id: UUID
    plan_id: UUID
    status: str
    started_at: datetime
    renews_at: Optional[datetime] = None
    canceled_at: Optional[datetime] = None
    payment_provider: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}
