"""backend/app/newsletter/routes.py — Newsletter API routes."""
from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.database import get_db
from ..admin.permissions import require_role_marketing
from . import services
from .schemas import SubscribeRequest, SubscriberRead, CampaignCreate, CampaignRead

router = APIRouter(prefix="/api/newsletter", tags=["newsletter"])


@router.post("/subscribe", response_model=SubscriberRead, status_code=201)
async def subscribe(
    body: SubscribeRequest,
    db: AsyncSession = Depends(get_db),
) -> SubscriberRead:
    sub = await services.subscribe(db, body)
    return SubscriberRead.model_validate(sub)


@router.get("/subscribers", response_model=list[SubscriberRead])
async def list_subscribers(
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_role_marketing),
) -> list[SubscriberRead]:
    subs = await services.list_subscribers(db)
    return [SubscriberRead.model_validate(s) for s in subs]


@router.get("/campaigns", response_model=list[CampaignRead])
async def list_campaigns(
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_role_marketing),
) -> list[CampaignRead]:
    campaigns = await services.list_campaigns(db)
    return [CampaignRead.model_validate(c) for c in campaigns]


@router.post("/campaigns", response_model=CampaignRead, status_code=201)
async def create_campaign(
    body: CampaignCreate,
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_role_marketing),
) -> CampaignRead:
    campaign = await services.create_campaign(db, body)
    return CampaignRead.model_validate(campaign)
