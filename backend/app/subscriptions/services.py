"""backend/app/subscriptions/services.py — VIP subscription business logic."""
from __future__ import annotations
from typing import Optional
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import VipPlan, VipSubscription
from .schemas import VipPlanCreate, VipSubscribeRequest


async def list_plans(db: AsyncSession) -> list[VipPlan]:
    result = await db.execute(
        select(VipPlan).where(VipPlan.status == "active").order_by(VipPlan.price)
    )
    return list(result.scalars().all())


async def create_plan(db: AsyncSession, data: VipPlanCreate) -> VipPlan:
    plan = VipPlan(**data.model_dump())
    db.add(plan)
    await db.commit()
    await db.refresh(plan)
    return plan


async def get_plan_by_id(db: AsyncSession, plan_id: UUID) -> Optional[VipPlan]:
    result = await db.execute(
        select(VipPlan).where(VipPlan.id == plan_id, VipPlan.status == "active")
    )
    return result.scalar_one_or_none()


async def subscribe(db: AsyncSession, data: VipSubscribeRequest) -> VipSubscription:
    sub = VipSubscription(**data.model_dump())
    db.add(sub)
    await db.commit()
    await db.refresh(sub)
    return sub


async def get_user_subscription(db: AsyncSession, user_id: UUID) -> Optional[VipSubscription]:
    result = await db.execute(
        select(VipSubscription)
        .where(VipSubscription.user_id == user_id, VipSubscription.status == "active")
    )
    return result.scalar_one_or_none()
