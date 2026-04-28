"""backend/app/payments/webhooks.py — Stripe webhook handler.

Verifies the Stripe signature and dispatches events to the appropriate
handler functions.  Register this router in main.py.

Stripe events handled:
  - checkout.session.completed
  - invoice.payment_succeeded
  - invoice.payment_failed
  - customer.subscription.created
  - customer.subscription.updated
  - customer.subscription.deleted
"""

from __future__ import annotations

import logging
from typing import Optional
from uuid import UUID

import stripe as stripe_sdk
from fastapi import APIRouter, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.config import get_settings
from ..core.database import AsyncSessionLocal
from ..subscriptions import services as sub_services
from ..subscriptions.schemas import VipSubscribeRequest
from . import services as payment_services
from ..revenue.services import record_revenue_event

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/payments", tags=["payments-webhook"])
settings = get_settings()


@router.post("/webhook", include_in_schema=False)
async def stripe_webhook(request: Request) -> dict:
    """Verify Stripe webhook signature and handle events."""
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")
    webhook_secret = settings.stripe_webhook_secret

    if not webhook_secret:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Webhook secret not configured.",
        )

    try:
        event = stripe_sdk.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
    except stripe_sdk.error.SignatureVerificationError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Stripe webhook signature.",
        )

    event_type: str = event["type"]
    data_object = event["data"]["object"]

    logger.info("Stripe webhook received: %s", event_type)

    async with AsyncSessionLocal() as db:
        if event_type == "checkout.session.completed":
            await _handle_checkout_completed(db, data_object)
        elif event_type == "invoice.payment_succeeded":
            await _handle_invoice_succeeded(db, data_object)
        elif event_type == "invoice.payment_failed":
            await _handle_invoice_failed(db, data_object)
        elif event_type == "customer.subscription.created":
            await _handle_subscription_created(db, data_object)
        elif event_type == "customer.subscription.updated":
            await _handle_subscription_updated(db, data_object)
        elif event_type == "customer.subscription.deleted":
            await _handle_subscription_deleted(db, data_object)
        else:
            logger.debug("Unhandled Stripe event: %s", event_type)

    return {"received": True}


# ---------------------------------------------------------------------------
# Event handlers
# ---------------------------------------------------------------------------


async def _handle_checkout_completed(db: AsyncSession, obj: dict) -> None:
    """Activate subscription when checkout completes.

    The checkout session metadata should contain 'plan_id' (internal UUID) and
    'price_id' to identify which plan was purchased.  If plan_id is not present
    in metadata the handler falls back to matching by price_id.
    """
    provider_subscription_id = obj.get("subscription")
    provider_customer_id = obj.get("customer")
    metadata: dict = obj.get("metadata") or {}

    if not provider_subscription_id or not provider_customer_id:
        return

    customer = await payment_services.get_customer_by_provider_id(
        db, provider_customer_id
    )
    if not customer:
        logger.warning(
            "checkout.session.completed: no local customer for %s",
            provider_customer_id,
        )
        return

    # Resolve plan: prefer plan_id from metadata, fall back to first active plan
    plan = None
    metadata_plan_id: Optional[str] = metadata.get("plan_id")
    if metadata_plan_id:
        try:
            plan = await sub_services.get_plan_by_id(db, UUID(metadata_plan_id))
        except (ValueError, Exception):
            logger.warning(
                "checkout.session.completed: invalid plan_id in metadata: %s",
                metadata_plan_id,
            )

    if not plan:
        plans = await sub_services.list_plans(db)
        if not plans:
            logger.warning("checkout.session.completed: no VIP plans found")
            return
        plan = plans[0]
        logger.info(
            "checkout.session.completed: plan_id not in metadata, "
            "defaulting to first plan %s",
            plan.id,
        )

    sub = await sub_services.get_user_subscription(db, customer.user_id)
    if not sub:
        req = VipSubscribeRequest(
            plan_id=plan.id,
            user_id=customer.user_id,
            payment_provider="stripe",
            provider_subscription_id=provider_subscription_id,
        )
        await sub_services.subscribe(db, req)
    else:
        sub.status = "active"
        sub.provider_subscription_id = provider_subscription_id
        await db.commit()

    await sub_services.set_user_vip(db, customer.user_id, True)


async def _handle_invoice_succeeded(db: AsyncSession, obj: dict) -> None:
    """Record revenue event on successful invoice payment."""
    amount_paid = obj.get("amount_paid", 0)
    currency = obj.get("currency", "usd")
    provider_customer_id = obj.get("customer")

    customer = (
        await payment_services.get_customer_by_provider_id(
            db, provider_customer_id
        )
        if provider_customer_id
        else None
    )

    await record_revenue_event(
        db,
        event_type="subscription",
        source_id=obj.get("id"),
        amount=amount_paid / 100.0,
        currency=currency,
        status="completed",
        user_id=customer.user_id if customer else None,
    )

    await payment_services.record_payment(
        db,
        user_id=customer.user_id if customer else None,
        provider_payment_id=obj.get("payment_intent") or obj.get("id", ""),
        amount=amount_paid / 100.0,
        currency=currency,
        status="succeeded",
        description="Invoice payment",
    )


async def _handle_invoice_failed(db: AsyncSession, obj: dict) -> None:
    """Mark subscription as past_due on failed payment."""
    provider_customer_id = obj.get("customer")
    if not provider_customer_id:
        return

    customer = await payment_services.get_customer_by_provider_id(
        db, provider_customer_id
    )
    if not customer:
        return

    sub = await sub_services.get_user_subscription(db, customer.user_id)
    if sub:
        sub.status = "past_due"
        await db.commit()


async def _handle_subscription_created(db: AsyncSession, obj: dict) -> None:
    """Log subscription creation (provisioning handled by checkout.session.completed)."""
    logger.info(
        "customer.subscription.created: %s status=%s",
        obj.get("id"),
        obj.get("status"),
    )


async def _handle_subscription_updated(db: AsyncSession, obj: dict) -> None:
    """Sync subscription status to local DB."""
    provider_subscription_id = obj.get("id")
    new_status = obj.get("status", "active")
    provider_customer_id = obj.get("customer")

    customer = (
        await payment_services.get_customer_by_provider_id(
            db, provider_customer_id
        )
        if provider_customer_id
        else None
    )

    if not customer:
        return

    sub = await sub_services.get_subscription_by_provider_id(
        db, provider_subscription_id
    )
    if sub:
        sub.status = new_status
        await db.commit()

    if new_status == "active":
        await sub_services.set_user_vip(db, customer.user_id, True)
    else:
        await sub_services.set_user_vip(db, customer.user_id, False)


async def _handle_subscription_deleted(db: AsyncSession, obj: dict) -> None:
    """Revoke VIP access when subscription is deleted/canceled."""
    provider_customer_id = obj.get("customer")
    provider_subscription_id = obj.get("id")

    customer = (
        await payment_services.get_customer_by_provider_id(
            db, provider_customer_id
        )
        if provider_customer_id
        else None
    )

    if not customer:
        return

    sub = await sub_services.get_subscription_by_provider_id(
        db, provider_subscription_id
    )
    if sub:
        sub.status = "canceled"
        await db.commit()

    await sub_services.set_user_vip(db, customer.user_id, False)
