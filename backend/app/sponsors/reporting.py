"""backend/app/sponsors/reporting.py — Sponsor revenue reporting helpers."""

from __future__ import annotations

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from .revenue import SponsorRevenue


async def get_sponsor_revenue_total(db: AsyncSession) -> float:
    """Return total sponsor revenue across all records."""
    result = await db.execute(
        select(func.coalesce(func.sum(SponsorRevenue.revenue), 0.0))
    )
    return float(result.scalar_one())


async def get_sponsor_revenue_by_sponsor(
    db: AsyncSession,
) -> list[dict]:
    """Return per-sponsor revenue totals."""
    result = await db.execute(
        select(
            SponsorRevenue.sponsor_id,
            func.sum(SponsorRevenue.revenue).label("total_revenue"),
            func.sum(SponsorRevenue.impressions).label("total_impressions"),
            func.sum(SponsorRevenue.clicks).label("total_clicks"),
        ).group_by(SponsorRevenue.sponsor_id)
    )
    return [
        {
            "sponsor_id": str(row.sponsor_id),
            "total_revenue": float(row.total_revenue or 0),
            "total_impressions": int(row.total_impressions or 0),
            "total_clicks": int(row.total_clicks or 0),
        }
        for row in result.all()
    ]
