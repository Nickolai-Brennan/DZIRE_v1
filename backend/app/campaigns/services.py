"""backend/app/campaigns/services.py — Async CRUD + helpers for Campaigns."""

from __future__ import annotations

from typing import Optional
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import Campaign
from .schemas import CampaignCreate, CampaignUpdate


async def list_campaigns(
    db: AsyncSession, skip: int = 0, limit: int = 50
) -> list[Campaign]:
    result = await db.execute(
        select(Campaign).order_by(Campaign.created_at.desc()).offset(skip).limit(limit)
    )
    return list(result.scalars().all())


async def get_campaign(db: AsyncSession, campaign_id: UUID) -> Optional[Campaign]:
    result = await db.execute(select(Campaign).where(Campaign.id == campaign_id))
    return result.scalar_one_or_none()


async def create_campaign(db: AsyncSession, data: CampaignCreate) -> Campaign:
    campaign = Campaign(**data.model_dump())
    db.add(campaign)
    await db.commit()
    await db.refresh(campaign)
    return campaign


async def update_campaign(
    db: AsyncSession, campaign_id: UUID, data: CampaignUpdate
) -> Optional[Campaign]:
    campaign = await get_campaign(db, campaign_id)
    if not campaign:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(campaign, field, value)
    await db.commit()
    await db.refresh(campaign)
    return campaign


async def delete_campaign(db: AsyncSession, campaign_id: UUID) -> bool:
    campaign = await get_campaign(db, campaign_id)
    if not campaign:
        return False
    await db.delete(campaign)
    await db.commit()
    return True
