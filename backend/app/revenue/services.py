"""backend/app/revenue/services.py — Revenue analytics business logic."""

from __future__ import annotations

from typing import Optional
from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import RevenueEvent
from .schemas import RevenueAnalytics, RevenueEventRead, RevenueSummary


async def record_revenue_event(
    db: AsyncSession,
    *,
    event_type: str,
    source_id: Optional[str],
    amount: float,
    currency: str = "usd",
    status: str = "completed",
    user_id: Optional[UUID] = None,
) -> RevenueEvent:
    event = RevenueEvent(
        type=event_type,
        source_id=source_id,
        amount=amount,
        currency=currency,
        status=status,
        user_id=user_id,
    )
    db.add(event)
    await db.commit()
    await db.refresh(event)
    return event


async def get_summary(db: AsyncSession) -> RevenueSummary:
    """Compute a simple revenue summary from local revenue_events table."""

    async def _sum_by_type(event_type: str) -> float:
        result = await db.execute(
            select(func.coalesce(func.sum(RevenueEvent.amount), 0.0)).where(
                RevenueEvent.type == event_type,
                RevenueEvent.status == "completed",
            )
        )
        return float(result.scalar_one())

    subscription_rev = await _sum_by_type("subscription")
    affiliate_rev = await _sum_by_type("affiliate")
    sponsor_rev = await _sum_by_type("sponsor")
    total = subscription_rev + affiliate_rev + sponsor_rev

    # Simplified MRR: assume subscription revenue is monthly recurring.
    # In production, filter by current month and use proper billing intervals.
    mrr = subscription_rev
    arr = mrr * 12

    return RevenueSummary(
        total_revenue=total,
        subscription_revenue=subscription_rev,
        affiliate_revenue=affiliate_rev,
        sponsor_revenue=sponsor_rev,
        mrr=mrr,
        arr=arr,
    )


async def get_analytics(
    db: AsyncSession, limit: int = 100
) -> RevenueAnalytics:
    result = await db.execute(
        select(RevenueEvent)
        .order_by(RevenueEvent.created_at.desc())
        .limit(limit)
    )
    events = list(result.scalars().all())
    summary = await get_summary(db)

    return RevenueAnalytics(
        period="all_time",
        events=[RevenueEventRead.model_validate(e) for e in events],
        summary=summary,
    )
