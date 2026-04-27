"""backend/app/affiliates/services.py — Affiliate business logic."""
from __future__ import annotations
from typing import Optional
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import Affiliate, AffiliateLink
from .schemas import AffiliateCreate, AffiliateLinkCreate


async def list_affiliates(db: AsyncSession) -> list[Affiliate]:
    result = await db.execute(select(Affiliate).order_by(Affiliate.name))
    return list(result.scalars().all())


async def create_affiliate(db: AsyncSession, data: AffiliateCreate) -> Affiliate:
    aff = Affiliate(**data.model_dump())
    db.add(aff)
    await db.commit()
    await db.refresh(aff)
    return aff


async def list_links(db: AsyncSession, affiliate_id: Optional[UUID] = None) -> list[AffiliateLink]:
    query = select(AffiliateLink)
    if affiliate_id:
        query = query.where(AffiliateLink.affiliate_id == affiliate_id)
    result = await db.execute(query.order_by(AffiliateLink.created_at.desc()))
    return list(result.scalars().all())


async def create_link(db: AsyncSession, data: AffiliateLinkCreate) -> AffiliateLink:
    link = AffiliateLink(**data.model_dump())
    db.add(link)
    await db.commit()
    await db.refresh(link)
    return link
