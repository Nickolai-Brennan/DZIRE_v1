"""backend/app/revenue/routes.py — Revenue analytics API routes."""

from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..admin.permissions import require_role_analyst
from ..core.database import get_db
from . import services
from .schemas import RevenueAnalytics, RevenueSummary

router = APIRouter(prefix="/api/revenue", tags=["revenue"])


@router.get("/summary", response_model=RevenueSummary)
async def revenue_summary(
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_role_analyst),
) -> RevenueSummary:
    return await services.get_summary(db)


@router.get("/analytics", response_model=RevenueAnalytics)
async def revenue_analytics(
    limit: int = 100,
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_role_analyst),
) -> RevenueAnalytics:
    return await services.get_analytics(db, limit=limit)
