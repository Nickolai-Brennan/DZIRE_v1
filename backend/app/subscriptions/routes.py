"""backend/app/subscriptions/routes.py — VIP subscription API routes."""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.database import get_db
from ..admin.permissions import require_role_any_admin
from . import services
from .schemas import VipPlanRead, VipPlanCreate, VipSubscribeRequest, VipSubscriptionRead

router = APIRouter(prefix="/api/vip", tags=["vip"])


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
    # Verify plan exists
    plans = await services.list_plans(db)
    plan_ids = {str(p.id) for p in plans}
    if str(body.plan_id) not in plan_ids:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="VIP plan not found")
    sub = await services.subscribe(db, body)
    return VipSubscriptionRead.model_validate(sub)
