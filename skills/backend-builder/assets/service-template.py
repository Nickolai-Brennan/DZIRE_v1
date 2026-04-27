"""
Service layer template for DZIRE_v1 backend.

Replace [Domain] with the actual domain name (e.g., User, Position, Review).
Replace [domain] with the snake_case version (e.g., user, position, review).
"""
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException

from app.models.[domain] import [Domain]
from app.schemas.[domain] import [Domain]Create, [Domain]Update, [Domain]Response


async def get_all(db: AsyncSession) -> list[[Domain]Response]:
    result = await db.execute(select([Domain]))
    rows = result.scalars().all()
    return [[Domain]Response.model_validate(r) for r in rows]


async def get_by_id(db: AsyncSession, item_id: UUID) -> [Domain]Response:
    result = await db.execute(select([Domain]).where([Domain].id == item_id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail=f"[Domain] {item_id} not found")
    return [Domain]Response.model_validate(item)


async def create(db: AsyncSession, payload: [Domain]Create) -> [Domain]Response:
    item = [Domain](**payload.model_dump())
    db.add(item)
    await db.commit()
    await db.refresh(item)
    return [Domain]Response.model_validate(item)


async def update(db: AsyncSession, item_id: UUID, payload: [Domain]Update) -> [Domain]Response:
    result = await db.execute(select([Domain]).where([Domain].id == item_id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail=f"[Domain] {item_id} not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    await db.commit()
    await db.refresh(item)
    return [Domain]Response.model_validate(item)


async def delete(db: AsyncSession, item_id: UUID) -> None:
    result = await db.execute(select([Domain]).where([Domain].id == item_id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail=f"[Domain] {item_id} not found")
    await db.delete(item)
    await db.commit()
