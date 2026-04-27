"""backend/app/sponsors/services.py — Sponsor business logic."""
from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import Sponsor, SponsorCampaign
from .schemas import SponsorCreate, SponsorCampaignCreate


async def list_sponsors(db: AsyncSession) -> list[Sponsor]:
    result = await db.execute(select(Sponsor).order_by(Sponsor.name))
    return list(result.scalars().all())


async def create_sponsor(db: AsyncSession, data: SponsorCreate) -> Sponsor:
    sponsor = Sponsor(**data.model_dump())
    db.add(sponsor)
    await db.commit()
    await db.refresh(sponsor)
    return sponsor


async def list_campaigns(db: AsyncSession) -> list[SponsorCampaign]:
    result = await db.execute(select(SponsorCampaign).order_by(SponsorCampaign.created_at.desc()))
    return list(result.scalars().all())


async def create_campaign(db: AsyncSession, data: SponsorCampaignCreate) -> SponsorCampaign:
    campaign = SponsorCampaign(**data.model_dump())
    db.add(campaign)
    await db.commit()
    await db.refresh(campaign)
    return campaign
