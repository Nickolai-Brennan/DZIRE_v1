"""backend/app/newsletter/services.py — Newsletter business logic."""

from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import NewsletterCampaign, NewsletterSubscriber
from .schemas import CampaignCreate, SubscribeRequest


async def subscribe(db: AsyncSession, data: SubscribeRequest) -> NewsletterSubscriber:
    # Upsert: reactivate if already exists
    result = await db.execute(
        select(NewsletterSubscriber).where(NewsletterSubscriber.email == data.email)
    )
    sub = result.scalar_one_or_none()
    if sub:
        sub.status = "active"
        sub.unsubscribed_at = None
        if data.first_name:
            sub.first_name = data.first_name
    else:
        sub = NewsletterSubscriber(**data.model_dump())
        db.add(sub)
    await db.commit()
    await db.refresh(sub)
    return sub


async def list_subscribers(db: AsyncSession) -> list[NewsletterSubscriber]:
    result = await db.execute(
        select(NewsletterSubscriber).order_by(NewsletterSubscriber.created_at.desc())
    )
    return list(result.scalars().all())


async def list_campaigns(db: AsyncSession) -> list[NewsletterCampaign]:
    result = await db.execute(
        select(NewsletterCampaign).order_by(NewsletterCampaign.created_at.desc())
    )
    return list(result.scalars().all())


async def create_campaign(db: AsyncSession, data: CampaignCreate) -> NewsletterCampaign:
    campaign = NewsletterCampaign(**data.model_dump())
    db.add(campaign)
    await db.commit()
    await db.refresh(campaign)
    return campaign
