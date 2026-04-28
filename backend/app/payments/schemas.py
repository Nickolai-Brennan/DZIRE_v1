"""backend/app/payments/schemas.py — Pydantic v2 schemas for payments."""

from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


# ---------------------------------------------------------------------------
# Checkout session
# ---------------------------------------------------------------------------


class CheckoutSessionRequest(BaseModel):
    price_id: str
    user_id: UUID
    success_url: Optional[str] = None
    cancel_url: Optional[str] = None


class CheckoutSessionResponse(BaseModel):
    session_id: str
    url: str


# ---------------------------------------------------------------------------
# Payment methods
# ---------------------------------------------------------------------------


class PaymentMethodRead(BaseModel):
    id: UUID
    user_id: UUID
    provider_payment_method_id: str
    type: str
    last4: Optional[str] = None
    brand: Optional[str] = None
    exp_month: Optional[int] = None
    exp_year: Optional[int] = None
    is_default: bool
    created_at: datetime

    model_config = {"from_attributes": True}


# ---------------------------------------------------------------------------
# Payment
# ---------------------------------------------------------------------------


class PaymentRead(BaseModel):
    id: UUID
    user_id: Optional[UUID] = None
    provider_payment_id: Optional[str] = None
    amount: float
    currency: str
    status: str
    description: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


# ---------------------------------------------------------------------------
# Stripe Customer
# ---------------------------------------------------------------------------


class StripeCustomerRead(BaseModel):
    id: UUID
    user_id: UUID
    provider_customer_id: str
    email: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}
