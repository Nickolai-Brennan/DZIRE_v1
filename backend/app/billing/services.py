"""backend/app/billing/services.py — Billing business logic."""

from __future__ import annotations

from typing import Optional
from uuid import UUID

import stripe as stripe_sdk
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.config import get_settings
from .invoices import Invoice

settings = get_settings()


def _stripe() -> stripe_sdk.Stripe:
    return stripe_sdk.Stripe(api_key=settings.stripe_secret_key)


# ---------------------------------------------------------------------------
# Invoices
# ---------------------------------------------------------------------------


async def list_invoices(db: AsyncSession, user_id: UUID) -> list[Invoice]:
    result = await db.execute(
        select(Invoice)
        .where(Invoice.user_id == user_id)
        .order_by(Invoice.created_at.desc())
    )
    return list(result.scalars().all())


async def upsert_invoice_from_stripe(
    db: AsyncSession, stripe_invoice: dict, user_id: UUID
) -> Invoice:
    """Create or update a local Invoice from a Stripe invoice object."""
    provider_id = stripe_invoice.get("id")
    result = await db.execute(
        select(Invoice).where(Invoice.provider_invoice_id == provider_id)
    )
    invoice = result.scalar_one_or_none()
    if not invoice:
        invoice = Invoice(user_id=user_id, provider_invoice_id=provider_id)
        db.add(invoice)

    invoice.amount_due = stripe_invoice.get("amount_due", 0) / 100.0
    invoice.amount_paid = stripe_invoice.get("amount_paid", 0) / 100.0
    invoice.currency = stripe_invoice.get("currency", "usd")
    invoice.status = stripe_invoice.get("status", "open")
    invoice.invoice_url = stripe_invoice.get("hosted_invoice_url")
    invoice.pdf_url = stripe_invoice.get("invoice_pdf")

    await db.commit()
    await db.refresh(invoice)
    return invoice


async def sync_invoices_from_stripe(db: AsyncSession, user_id: UUID) -> list[Invoice]:
    """Return local invoices for a user (Stripe sync handled via webhooks)."""
    return await list_invoices(db, user_id)


# ---------------------------------------------------------------------------
# Customer portal
# ---------------------------------------------------------------------------


async def create_portal_session(
    db: AsyncSession, user_id: UUID, return_url: str
) -> Optional[str]:
    """Create a Stripe customer portal session and return the URL."""
    from ..payments.models import StripeCustomer as SC

    result = await db.execute(select(SC).where(SC.user_id == user_id))
    customer = result.scalar_one_or_none()
    if not customer:
        return None

    client = _stripe()
    session = client.billing_portal.sessions.create(
        params={
            "customer": customer.provider_customer_id,
            "return_url": return_url,
        }
    )
    return session.url
