"""backend/app/sponsors/routes.py — Sponsor API routes (admin-protected)."""
from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.database import get_db
from ..admin.permissions import require_role_sponsor
from . import services
from .schemas import SponsorCreate, SponsorRead, SponsorCampaignCreate, SponsorCampaignRead

router = APIRouter(prefix="/api/sponsors", tags=["sponsors"])


@router.get("", response_model=list[SponsorRead])
async def list_sponsors(
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_role_sponsor),
) -> list[SponsorRead]:
    sponsors = await services.list_sponsors(db)
    return [SponsorRead.model_validate(s) for s in sponsors]


@router.post("", response_model=SponsorRead, status_code=201)
async def create_sponsor(
    body: SponsorCreate,
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_role_sponsor),
) -> SponsorRead:
    sponsor = await services.create_sponsor(db, body)
    return SponsorRead.model_validate(sponsor)


@router.get("/campaigns", response_model=list[SponsorCampaignRead])
async def list_campaigns(
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_role_sponsor),
) -> list[SponsorCampaignRead]:
    campaigns = await services.list_campaigns(db)
    return [SponsorCampaignRead.model_validate(c) for c in campaigns]


@router.post("/campaigns", response_model=SponsorCampaignRead, status_code=201)
async def create_campaign(
    body: SponsorCampaignCreate,
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_role_sponsor),
) -> SponsorCampaignRead:
    campaign = await services.create_campaign(db, body)
    return SponsorCampaignRead.model_validate(campaign)
