"""backend/app/users/services.py — User management business logic."""

from __future__ import annotations

import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.user import User


async def get_user_by_id(db: AsyncSession, user_id: str | uuid.UUID) -> User | None:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


async def list_users(db: AsyncSession, offset: int = 0, limit: int = 50) -> list[User]:
    result = await db.execute(select(User).offset(offset).limit(limit))
    return list(result.scalars().all())


async def update_user(
    db: AsyncSession,
    user: User,
    *,
    first_name: str | None = None,
    last_name: str | None = None,
    avatar_url: str | None = None,
    username: str | None = None,
) -> User:
    if first_name is not None:
        user.first_name = first_name
    if last_name is not None:
        user.last_name = last_name
    if avatar_url is not None:
        user.avatar_url = avatar_url
    if username is not None:
        user.username = username
    await db.commit()
    await db.refresh(user)
    return user


async def admin_update_user(
    db: AsyncSession,
    user: User,
    *,
    role: str | None = None,
    status: str | None = None,
    is_vip: bool | None = None,
    vip_plan_id: str | None = None,
) -> User:
    if role is not None:
        user.role = role
    if status is not None:
        user.status = status
        user.is_active = status == "active"
    if is_vip is not None:
        user.is_vip = is_vip
    if vip_plan_id is not None:
        user.vip_plan_id = vip_plan_id
    await db.commit()
    await db.refresh(user)
    return user


async def delete_user(db: AsyncSession, user: User) -> None:
    await db.delete(user)
    await db.commit()
