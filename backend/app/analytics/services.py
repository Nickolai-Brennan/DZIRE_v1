"""backend/app/analytics/services.py — Analytics business logic."""

from __future__ import annotations

from sqlalchemy.ext.asyncio import AsyncSession

from .models import AnalyticsEvent, ClickEvent, PageView
from .schemas import AnalyticsEventCreate, ClickEventCreate, PageViewCreate


async def record_event(db: AsyncSession, data: AnalyticsEventCreate) -> AnalyticsEvent:
    event = AnalyticsEvent(**data.model_dump())
    db.add(event)
    await db.commit()
    await db.refresh(event)
    return event


async def record_page_view(db: AsyncSession, data: PageViewCreate) -> PageView:
    pv = PageView(**data.model_dump())
    db.add(pv)
    await db.commit()
    await db.refresh(pv)
    return pv


async def record_click(db: AsyncSession, data: ClickEventCreate) -> ClickEvent:
    click = ClickEvent(**data.model_dump())
    db.add(click)
    await db.commit()
    await db.refresh(click)
    return click
