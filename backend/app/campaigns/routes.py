"""backend/app/campaigns/routes.py — FastAPI routes for Campaigns."""

from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.database import get_db
from . import services
from .schemas import CampaignCreate, CampaignRead, CampaignUpdate

router = APIRouter(prefix="/api/campaigns", tags=["campaigns"])


@router.get("", response_model=list[CampaignRead])
async def list_campaigns(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
) -> list[CampaignRead]:
    campaigns = await services.list_campaigns(db, skip=skip, limit=limit)
    return [CampaignRead.model_validate(c) for c in campaigns]


@router.post("", response_model=CampaignRead, status_code=status.HTTP_201_CREATED)
async def create_campaign(
    payload: CampaignCreate, db: AsyncSession = Depends(get_db)
) -> CampaignRead:
    campaign = await services.create_campaign(db, payload)
    return CampaignRead.model_validate(campaign)


@router.get("/{campaign_id}", response_model=CampaignRead)
async def get_campaign(
    campaign_id: UUID, db: AsyncSession = Depends(get_db)
) -> CampaignRead:
    campaign = await services.get_campaign(db, campaign_id)
    if not campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign not found")
    return CampaignRead.model_validate(campaign)


@router.put("/{campaign_id}", response_model=CampaignRead)
async def update_campaign(
    campaign_id: UUID, payload: CampaignUpdate, db: AsyncSession = Depends(get_db)
) -> CampaignRead:
    campaign = await services.update_campaign(db, campaign_id, payload)
    if not campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign not found")
    return CampaignRead.model_validate(campaign)


@router.delete("/{campaign_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_campaign(
    campaign_id: UUID, db: AsyncSession = Depends(get_db)
) -> None:
    deleted = await services.delete_campaign(db, campaign_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign not found")


@router.get("/{campaign_id}/calendar")
async def get_campaign_calendar(
    campaign_id: UUID, db: AsyncSession = Depends(get_db)
) -> dict:
    """Return all content calendar items linked to this campaign."""
    from sqlalchemy import select
    from ..content_calendar.models import ContentCalendarItem

    result = await db.execute(
        select(ContentCalendarItem)
        .where(ContentCalendarItem.campaign_id == campaign_id)
        .order_by(ContentCalendarItem.scheduled_at.asc())
    )
    items = result.scalars().all()
    return {"campaign_id": str(campaign_id), "items": [str(i.id) for i in items]}


@router.get("/{campaign_id}/metrics")
async def get_campaign_metrics(
    campaign_id: UUID, db: AsyncSession = Depends(get_db)
) -> dict:
    """Return aggregated social metrics for all posts in this campaign."""
    from sqlalchemy import func, select
    from ..social_integrations.models import SocialPost

    result = await db.execute(
        select(
            func.sum(SocialPost.impressions),
            func.sum(SocialPost.clicks),
            func.sum(SocialPost.likes),
            func.sum(SocialPost.comments),
            func.sum(SocialPost.shares),
        ).where(SocialPost.campaign_id == campaign_id)
    )
    row = result.one()
    return {
        "campaign_id": str(campaign_id),
        "impressions": row[0] or 0,
        "clicks": row[1] or 0,
        "likes": row[2] or 0,
        "comments": row[3] or 0,
        "shares": row[4] or 0,
    }
