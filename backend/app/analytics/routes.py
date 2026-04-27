"""backend/app/analytics/routes.py — Analytics tracking API routes."""
from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.database import get_db
from . import services
from .schemas import (
    AnalyticsEventCreate, AnalyticsEventRead,
    PageViewCreate, PageViewRead,
    ClickEventCreate,
)

router = APIRouter(prefix="/api/analytics", tags=["analytics"])


@router.post("/events", response_model=AnalyticsEventRead, status_code=201)
async def track_event(
    body: AnalyticsEventCreate,
    db: AsyncSession = Depends(get_db),
) -> AnalyticsEventRead:
    event = await services.record_event(db, body)
    return AnalyticsEventRead.model_validate(event)


@router.post("/page-view", response_model=PageViewRead, status_code=201)
async def track_page_view(
    body: PageViewCreate,
    db: AsyncSession = Depends(get_db),
) -> PageViewRead:
    pv = await services.record_page_view(db, body)
    return PageViewRead.model_validate(pv)


@router.post("/click", status_code=201)
async def track_click(
    body: ClickEventCreate,
    db: AsyncSession = Depends(get_db),
) -> dict:
    await services.record_click(db, body)
    return {"status": "recorded"}
