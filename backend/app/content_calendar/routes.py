"""backend/app/content_calendar/routes.py — FastAPI routes for Content Calendar."""

from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.database import get_db
from . import services
from .schemas import (
    ContentCalendarCreate,
    ContentCalendarRead,
    ContentCalendarUpdate,
    PublishPayload,
    SchedulePayload,
    StatusPayload,
)

router = APIRouter(prefix="/api/content-calendar", tags=["content-calendar"])


@router.get("", response_model=list[ContentCalendarRead])
async def list_items(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
) -> list[ContentCalendarRead]:
    items = await services.list_items(db, skip=skip, limit=limit)
    return [ContentCalendarRead.model_validate(i) for i in items]


@router.post("", response_model=ContentCalendarRead, status_code=status.HTTP_201_CREATED)
async def create_item(
    payload: ContentCalendarCreate, db: AsyncSession = Depends(get_db)
) -> ContentCalendarRead:
    item = await services.create_item(db, payload)
    return ContentCalendarRead.model_validate(item)


@router.get("/{item_id}", response_model=ContentCalendarRead)
async def get_item(item_id: UUID, db: AsyncSession = Depends(get_db)) -> ContentCalendarRead:
    item = await services.get_item(db, item_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return ContentCalendarRead.model_validate(item)


@router.put("/{item_id}", response_model=ContentCalendarRead)
async def update_item(
    item_id: UUID, payload: ContentCalendarUpdate, db: AsyncSession = Depends(get_db)
) -> ContentCalendarRead:
    item = await services.update_item(db, item_id, payload)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return ContentCalendarRead.model_validate(item)


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: UUID, db: AsyncSession = Depends(get_db)) -> None:
    deleted = await services.delete_item(db, item_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")


@router.post("/schedule", response_model=ContentCalendarRead)
async def schedule_item(
    payload: SchedulePayload, db: AsyncSession = Depends(get_db)
) -> ContentCalendarRead:
    item = await services.schedule_item(db, payload.item_id, payload.scheduled_at)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return ContentCalendarRead.model_validate(item)


@router.post("/publish", response_model=ContentCalendarRead)
async def publish_item(
    payload: PublishPayload, db: AsyncSession = Depends(get_db)
) -> ContentCalendarRead:
    item = await services.publish_item(db, payload.item_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return ContentCalendarRead.model_validate(item)


@router.post("/status", response_model=ContentCalendarRead)
async def set_status(
    payload: StatusPayload, db: AsyncSession = Depends(get_db)
) -> ContentCalendarRead:
    item = await services.set_status(db, payload.item_id, payload.status)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return ContentCalendarRead.model_validate(item)
