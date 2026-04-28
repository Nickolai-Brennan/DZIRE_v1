"""backend/app/payments/services.py — Payment business logic."""

from __future__ import annotations

from typing import Optional
from uuid import UUID

import stripe as stripe_sdk

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.config import get_settings
from .models import Payment, PaymentMethod, StripeCustomer
from .schemas import CheckoutSessionRequest

settings = get_settings()


def _stripe() -> stripe_sdk.Stripe:
    return stripe_sdk.Stripe(api_key=settings.stripe_secret_key)


# ---------------------------------------------------------------------------
# Stripe customers
# ---------------------------------------------------------------------------


async def get_or_create_customer(
    db: AsyncSession, user_id: UUID, email: str
) -> StripeCustomer:
    """Return existing Stripe customer record or create a new one via Stripe API."""
    result = await db.execute(
        select(StripeCustomer).where(StripeCustomer.user_id == user_id)
    )
    customer = result.scalar_one_or_none()
    if customer:
        return customer

    client = _stripe()
    stripe_customer = client.customers.create(params={"email": email})
    customer = StripeCustomer(
        user_id=user_id,
        provider_customer_id=stripe_customer.id,
        email=email,
    )
    db.add(customer)
    await db.commit()
    await db.refresh(customer)
    return customer


async def get_customer_by_provider_id(
    db: AsyncSession, provider_customer_id: str
) -> Optional[StripeCustomer]:
    result = await db.execute(
        select(StripeCustomer).where(
            StripeCustomer.provider_customer_id == provider_customer_id
        )
    )
    return result.scalar_one_or_none()


# ---------------------------------------------------------------------------
# Checkout session
# ---------------------------------------------------------------------------


async def create_checkout_session(
    db: AsyncSession,
    user_id: UUID,
    email: str,
    data: CheckoutSessionRequest,
) -> dict:
    """Create a Stripe Checkout session for a subscription."""
    customer = await get_or_create_customer(db, user_id, email)
    client = _stripe()

    frontend_url = settings.frontend_url
    success_url = data.success_url or f"{frontend_url}/billing?checkout=success"
    cancel_url = data.cancel_url or f"{frontend_url}/subscribe?checkout=cancel"

    session = client.checkout.sessions.create(
        params={
            "customer": customer.provider_customer_id,
            "mode": "subscription",
            "line_items": [{"price": data.price_id, "quantity": 1}],
            "success_url": success_url,
            "cancel_url": cancel_url,
            "metadata": {
                "user_id": str(user_id),
                "price_id": data.price_id,
            },
        }
    )
    return {"session_id": session.id, "url": session.url}


# ---------------------------------------------------------------------------
# Payment methods
# ---------------------------------------------------------------------------


async def list_payment_methods(
    db: AsyncSession, user_id: UUID
) -> list[PaymentMethod]:
    result = await db.execute(
        select(PaymentMethod)
        .where(PaymentMethod.user_id == user_id)
        .order_by(PaymentMethod.created_at.desc())
    )
    return list(result.scalars().all())


# ---------------------------------------------------------------------------
# Payments
# ---------------------------------------------------------------------------


async def list_payments(db: AsyncSession, user_id: UUID) -> list[Payment]:
    result = await db.execute(
        select(Payment)
        .where(Payment.user_id == user_id)
        .order_by(Payment.created_at.desc())
    )
    return list(result.scalars().all())


async def record_payment(
    db: AsyncSession,
    *,
    user_id: Optional[UUID],
    provider_payment_id: str,
    amount: float,
    currency: str = "usd",
    status: str = "succeeded",
    description: Optional[str] = None,
) -> Payment:
    payment = Payment(
        user_id=user_id,
        provider_payment_id=provider_payment_id,
        amount=amount,
        currency=currency,
        status=status,
        description=description,
    )
    db.add(payment)
    await db.commit()
    await db.refresh(payment)
    return payment
