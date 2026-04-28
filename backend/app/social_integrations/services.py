"""backend/app/social_integrations/services.py — Async CRUD + helpers for Social Integrations."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Optional
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import SocialAccount, SocialPost, SocialSizeChart
from .schemas import (
    SocialAccountCreate,
    SocialAccountUpdate,
    SocialPostCreate,
    SocialPostUpdate,
    SocialSizeChartCreate,
)


# ── SocialAccount ─────────────────────────────────────────────────────────────


async def list_accounts(
    db: AsyncSession, skip: int = 0, limit: int = 50
) -> list[SocialAccount]:
    result = await db.execute(
        select(SocialAccount)
        .order_by(SocialAccount.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return list(result.scalars().all())


async def get_account(db: AsyncSession, account_id: UUID) -> Optional[SocialAccount]:
    result = await db.execute(
        select(SocialAccount).where(SocialAccount.id == account_id)
    )
    return result.scalar_one_or_none()


async def create_account(db: AsyncSession, data: SocialAccountCreate) -> SocialAccount:
    account = SocialAccount(**data.model_dump())
    db.add(account)
    await db.commit()
    await db.refresh(account)
    return account


async def update_account(
    db: AsyncSession, account_id: UUID, data: SocialAccountUpdate
) -> Optional[SocialAccount]:
    account = await get_account(db, account_id)
    if not account:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(account, field, value)
    await db.commit()
    await db.refresh(account)
    return account


async def delete_account(db: AsyncSession, account_id: UUID) -> bool:
    account = await get_account(db, account_id)
    if not account:
        return False
    await db.delete(account)
    await db.commit()
    return True


# ── SocialPost ────────────────────────────────────────────────────────────────


async def list_posts(
    db: AsyncSession, skip: int = 0, limit: int = 50
) -> list[SocialPost]:
    result = await db.execute(
        select(SocialPost)
        .order_by(SocialPost.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return list(result.scalars().all())


async def get_post(db: AsyncSession, post_id: UUID) -> Optional[SocialPost]:
    result = await db.execute(
        select(SocialPost).where(SocialPost.id == post_id)
    )
    return result.scalar_one_or_none()


async def create_post(db: AsyncSession, data: SocialPostCreate) -> SocialPost:
    post = SocialPost(**data.model_dump())
    db.add(post)
    await db.commit()
    await db.refresh(post)
    return post


async def update_post(
    db: AsyncSession, post_id: UUID, data: SocialPostUpdate
) -> Optional[SocialPost]:
    post = await get_post(db, post_id)
    if not post:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(post, field, value)
    await db.commit()
    await db.refresh(post)
    return post


async def delete_post(db: AsyncSession, post_id: UUID) -> bool:
    post = await get_post(db, post_id)
    if not post:
        return False
    await db.delete(post)
    await db.commit()
    return True


async def schedule_post(
    db: AsyncSession, post_id: UUID, scheduled_at: datetime
) -> Optional[SocialPost]:
    post = await get_post(db, post_id)
    if not post:
        return None
    post.scheduled_at = scheduled_at
    post.status = "scheduled"
    await db.commit()
    await db.refresh(post)
    return post


async def publish_post(db: AsyncSession, post_id: UUID) -> Optional[SocialPost]:
    post = await get_post(db, post_id)
    if not post:
        return None
    post.status = "published"
    post.published_at = datetime.now(tz=timezone.utc)
    await db.commit()
    await db.refresh(post)
    return post


async def get_metrics(db: AsyncSession, post_id: UUID) -> Optional[dict]:
    post = await get_post(db, post_id)
    if not post:
        return None
    return {
        "post_id": str(post.id),
        "platform": post.platform,
        "impressions": post.impressions,
        "clicks": post.clicks,
        "likes": post.likes,
        "comments": post.comments,
        "shares": post.shares,
    }


# ── SocialSizeChart ───────────────────────────────────────────────────────────


async def list_size_charts(
    db: AsyncSession, skip: int = 0, limit: int = 200
) -> list[SocialSizeChart]:
    result = await db.execute(
        select(SocialSizeChart)
        .order_by(SocialSizeChart.platform, SocialSizeChart.asset_type)
        .offset(skip)
        .limit(limit)
    )
    return list(result.scalars().all())


async def list_platforms(db: AsyncSession) -> list[str]:
    result = await db.execute(
        select(SocialSizeChart.platform).distinct().order_by(SocialSizeChart.platform)
    )
    return list(result.scalars().all())


async def list_asset_types(db: AsyncSession) -> list[str]:
    result = await db.execute(
        select(SocialSizeChart.asset_type)
        .distinct()
        .order_by(SocialSizeChart.asset_type)
    )
    return list(result.scalars().all())


async def create_size_chart(
    db: AsyncSession, data: SocialSizeChartCreate
) -> SocialSizeChart:
    entry = SocialSizeChart(**data.model_dump())
    db.add(entry)
    await db.commit()
    await db.refresh(entry)
    return entry
