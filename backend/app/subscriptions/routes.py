"""backend/app/subscriptions/routes.py — VIP subscription API routes."""

from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..admin.permissions import require_role_any_admin
from ..auth.dependencies import get_current_user
from ..core.config import get_settings
from ..core.database import get_db
from ..models.user import User
from ..payments import services as payment_services
from ..payments.schemas import CheckoutSessionRequest, CheckoutSessionResponse
from . import services
from .schemas import (VipPlanCreate, VipPlanRead, VipSubscribeRequest,
                      VipSubscriptionRead)

router = APIRouter(prefix="/api/vip", tags=["vip"])

# Step 8 canonical subscription router (mirrors /api/vip for spec compliance)
sub_router = APIRouter(prefix="/api/subscriptions", tags=["subscriptions"])

settings = get_settings()


# ---------------------------------------------------------------------------
# Legacy /api/vip routes (preserved for backward compatibility)
# ---------------------------------------------------------------------------


@router.get("/plans", response_model=list[VipPlanRead])
async def list_plans(db: AsyncSession = Depends(get_db)) -> list[VipPlanRead]:
    plans = await services.list_plans(db)
    return [VipPlanRead.model_validate(p) for p in plans]


@router.post("/plans", response_model=VipPlanRead, status_code=201)
async def create_plan(
    body: VipPlanCreate,
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_role_any_admin),
) -> VipPlanRead:
    plan = await services.create_plan(db, body)
    return VipPlanRead.model_validate(plan)


@router.post("/subscribe", response_model=VipSubscriptionRead, status_code=201)
async def subscribe(
    body: VipSubscribeRequest,
    db: AsyncSession = Depends(get_db),
) -> VipSubscriptionRead:
    plan = await services.get_plan_by_id(db, body.plan_id)
    if not plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="VIP plan not found"
        )
    sub = await services.subscribe(db, body)
    return VipSubscriptionRead.model_validate(sub)


# ---------------------------------------------------------------------------
# Step 8 /api/subscriptions routes
# ---------------------------------------------------------------------------


@sub_router.get("/plans", response_model=list[VipPlanRead])
async def sub_list_plans(
    db: AsyncSession = Depends(get_db),
) -> list[VipPlanRead]:
    plans = await services.list_plans(db)
    return [VipPlanRead.model_validate(p) for p in plans]


@sub_router.post("/subscribe", response_model=CheckoutSessionResponse, status_code=201)
async def sub_subscribe(
    body: CheckoutSessionRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CheckoutSessionResponse:
    """Create a Stripe Checkout session for a subscription plan."""
    try:
        result = await payment_services.create_checkout_session(
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


@sub_router.post("/cancel", status_code=200)
async def sub_cancel(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> dict:
    """Cancel the active subscription for the authenticated user."""
    sub = await services.get_user_subscription(db, current_user.id)
    if not sub:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No active subscription found.",
        )
    sub.status = "canceled"
    await db.commit()
    await services.set_user_vip(db, current_user.id, False)
    return {"status": "canceled"}


@sub_router.post("/upgrade", response_model=CheckoutSessionResponse, status_code=201)
async def sub_upgrade(
    body: CheckoutSessionRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CheckoutSessionResponse:
    """Create a Stripe Checkout session for an upgraded plan."""
    try:
        result = await payment_services.create_checkout_session(
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


@sub_router.post("/downgrade", response_model=CheckoutSessionResponse, status_code=201)
async def sub_downgrade(
    body: CheckoutSessionRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CheckoutSessionResponse:
    """Create a Stripe Checkout session for a downgraded plan."""
    try:
        result = await payment_services.create_checkout_session(
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
