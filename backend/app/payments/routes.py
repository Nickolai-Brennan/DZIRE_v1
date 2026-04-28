"""backend/app/payments/routes.py — Payment API routes."""

from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..auth.dependencies import get_current_user
from ..core.database import get_db
from ..models.user import User
from . import services
from .schemas import (CheckoutSessionRequest, CheckoutSessionResponse,
                      PaymentMethodRead, PaymentRead)

router = APIRouter(prefix="/api/payments", tags=["payments"])


@router.post("/create-checkout-session", response_model=CheckoutSessionResponse, status_code=201)
async def create_checkout_session(
    body: CheckoutSessionRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CheckoutSessionResponse:
    """Create a Stripe Checkout session and return the redirect URL."""
    try:
        result = await services.create_checkout_session(
            db,
            user_id=current_user.id,
            email=current_user.email,
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
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[PaymentMethodRead]:
    methods = await services.list_payment_methods(db, current_user.id)
    return [PaymentMethodRead.model_validate(m) for m in methods]


@router.get("/history", response_model=list[PaymentRead])
async def list_payments(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[PaymentRead]:
    payments = await services.list_payments(db, current_user.id)
    return [PaymentRead.model_validate(p) for p in payments]
