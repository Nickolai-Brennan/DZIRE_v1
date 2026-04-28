"""backend/app/content_calendar/services.py — Async CRUD + helpers for Content Calendar."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Optional
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import ContentCalendarItem
from .schemas import ContentCalendarCreate, ContentCalendarUpdate


async def list_items(
    db: AsyncSession, skip: int = 0, limit: int = 50
) -> list[ContentCalendarItem]:
    result = await db.execute(
        select(ContentCalendarItem)
        .order_by(ContentCalendarItem.scheduled_at.asc())
        .offset(skip)
        .limit(limit)
    )
    return list(result.scalars().all())


async def get_item(db: AsyncSession, item_id: UUID) -> Optional[ContentCalendarItem]:
    result = await db.execute(
        select(ContentCalendarItem).where(ContentCalendarItem.id == item_id)
    )
    return result.scalar_one_or_none()


async def create_item(
    db: AsyncSession, data: ContentCalendarCreate
) -> ContentCalendarItem:
    item = ContentCalendarItem(**data.model_dump())
    db.add(item)
    await db.commit()
    await db.refresh(item)
    return item


async def update_item(
    db: AsyncSession, item_id: UUID, data: ContentCalendarUpdate
) -> Optional[ContentCalendarItem]:
    item = await get_item(db, item_id)
    if not item:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    await db.commit()
    await db.refresh(item)
    return item


async def delete_item(db: AsyncSession, item_id: UUID) -> bool:
    item = await get_item(db, item_id)
    if not item:
        return False
    await db.delete(item)
    await db.commit()
    return True


async def schedule_item(
    db: AsyncSession, item_id: UUID, scheduled_at: datetime
) -> Optional[ContentCalendarItem]:
    item = await get_item(db, item_id)
    if not item:
        return None
    item.scheduled_at = scheduled_at
    item.status = "scheduled"
    await db.commit()
    await db.refresh(item)
    return item


async def publish_item(
    db: AsyncSession, item_id: UUID
) -> Optional[ContentCalendarItem]:
    item = await get_item(db, item_id)
    if not item:
        return None
    item.status = "published"
    item.published_at = datetime.now(tz=timezone.utc)
    await db.commit()
    await db.refresh(item)
    return item


async def set_status(
    db: AsyncSession, item_id: UUID, new_status: str
) -> Optional[ContentCalendarItem]:
    item = await get_item(db, item_id)
    if not item:
        return None
    item.status = new_status
    await db.commit()
    await db.refresh(item)
    return item
