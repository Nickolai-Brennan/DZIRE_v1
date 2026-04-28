"""backend/app/revenue/schemas.py — Pydantic v2 schemas for revenue."""

from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class RevenueEventRead(BaseModel):
    id: UUID
    type: str
    source_id: Optional[str] = None
    user_id: Optional[UUID] = None
    amount: float
    currency: str
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


class RevenueSummary(BaseModel):
    total_revenue: float
    subscription_revenue: float
    affiliate_revenue: float
    sponsor_revenue: float
    mrr: float
    arr: float
    currency: str = "usd"


class RevenueAnalytics(BaseModel):
    period: str
    events: list[RevenueEventRead]
    summary: RevenueSummary
