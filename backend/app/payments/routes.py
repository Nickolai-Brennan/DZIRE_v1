"""backend/app/payments/routes.py — Payment API routes."""

from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.database import get_db
from . import services
from .schemas import (CheckoutSessionRequest, CheckoutSessionResponse,
                      PaymentMethodRead, PaymentRead)

router = APIRouter(prefix="/api/payments", tags=["payments"])


@router.post("/create-checkout-session", response_model=CheckoutSessionResponse, status_code=201)
async def create_checkout_session(
    body: CheckoutSessionRequest,
    db: AsyncSession = Depends(get_db),
) -> CheckoutSessionResponse:
    """Create a Stripe Checkout session and return the redirect URL."""
    try:
        result = await services.create_checkout_session(
            db,
            user_id=body.user_id,
            email="user@example.com",  # caller should supply real email via auth
            data=body,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Stripe error: {exc}",
        )
    return CheckoutSessionResponse(**result)


@router.get("/methods", response_model=list[PaymentMethodRead])
async def list_payment_methods(
    user_id: UUID,
    db: AsyncSession = Depends(get_db),
) -> list[PaymentMethodRead]:
    methods = await services.list_payment_methods(db, user_id)
    return [PaymentMethodRead.model_validate(m) for m in methods]


@router.get("/history", response_model=list[PaymentRead])
async def list_payments(
    user_id: UUID,
    db: AsyncSession = Depends(get_db),
) -> list[PaymentRead]:
    payments = await services.list_payments(db, user_id)
    return [PaymentRead.model_validate(p) for p in payments]
