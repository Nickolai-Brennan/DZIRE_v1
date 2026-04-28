"""backend/app/affiliates/routes.py — Affiliate API routes (admin-protected)."""

from __future__ import annotations

from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from ..admin.permissions import require_role_sponsor
from ..core.database import get_db
from . import services
from .attribution import attribute_conversion
from .schemas import (AffiliateClickCreate, AffiliateClickRead,
                      AffiliateConversionCreate, AffiliateConversionRead,
                      AffiliateCreate, AffiliateLinkCreate, AffiliateLinkRead,
                      AffiliateRead)
from .tracking import AffiliateClick

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


# ---------------------------------------------------------------------------
# Public tracking endpoints (no auth required — called on click/conversion)
# ---------------------------------------------------------------------------


@router.post("/track", response_model=AffiliateClickRead, status_code=201)
async def track_click(
    body: AffiliateClickCreate,
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> AffiliateClickRead:
    """Record an affiliate link click."""
    ip = request.client.host if request.client else None
    click = AffiliateClick(
        affiliate_id=body.affiliate_id,
        post_id=body.post_id,
        user_id=body.user_id,
        session_id=body.session_id,
        utm_source=body.utm_source,
        utm_medium=body.utm_medium,
        utm_campaign=body.utm_campaign,
        referrer=body.referrer,
        ip_address=ip,
    )
    db.add(click)
    await db.commit()
    await db.refresh(click)
    return AffiliateClickRead.model_validate(click)


@router.post("/conversion", response_model=AffiliateConversionRead, status_code=201)
async def record_conversion(
    body: AffiliateConversionCreate,
    db: AsyncSession = Depends(get_db),
) -> AffiliateConversionRead:
    """Record a conversion attributed to an affiliate click."""
    conversion = await attribute_conversion(
        db,
        session_id=body.session_id,
        click_id=body.click_id,
        order_id=body.order_id,
        amount=body.amount,
        commission_rate=body.commission_rate,
    )
    return AffiliateConversionRead.model_validate(conversion)
