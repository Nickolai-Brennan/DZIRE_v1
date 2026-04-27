"""backend/app/affiliates/routes.py — Affiliate API routes (admin-protected)."""

from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..admin.permissions import require_role_sponsor
from ..core.database import get_db
from . import services
from .schemas import (AffiliateCreate, AffiliateLinkCreate, AffiliateLinkRead,
                      AffiliateRead)

router = APIRouter(prefix="/api/affiliates", tags=["affiliates"])


@router.get("", response_model=list[AffiliateRead])
async def list_affiliates(
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_role_sponsor),
) -> list[AffiliateRead]:
    affs = await services.list_affiliates(db)
    return [AffiliateRead.model_validate(a) for a in affs]


@router.post("", response_model=AffiliateRead, status_code=201)
async def create_affiliate(
    body: AffiliateCreate,
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_role_sponsor),
) -> AffiliateRead:
    aff = await services.create_affiliate(db, body)
    return AffiliateRead.model_validate(aff)


@router.get("/links", response_model=list[AffiliateLinkRead])
async def list_links(
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_role_sponsor),
) -> list[AffiliateLinkRead]:
    links = await services.list_links(db)
    return [AffiliateLinkRead.model_validate(lnk) for lnk in links]


@router.post("/links", response_model=AffiliateLinkRead, status_code=201)
async def create_link(
    body: AffiliateLinkCreate,
    db: AsyncSession = Depends(get_db),
    _: object = Depends(require_role_sponsor),
) -> AffiliateLinkRead:
    link = await services.create_link(db, body)
    return AffiliateLinkRead.model_validate(link)
