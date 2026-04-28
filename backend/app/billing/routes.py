"""backend/app/billing/routes.py — Billing API routes."""

from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.config import get_settings
from ..core.database import get_db
from . import services
from .invoices import Invoice

router = APIRouter(prefix="/api/billing", tags=["billing"])
settings = get_settings()


# ---------------------------------------------------------------------------
# Schemas (inline — minimal)
# ---------------------------------------------------------------------------


class InvoiceRead(BaseModel):
    id: UUID
    user_id: UUID
    provider_invoice_id: str | None = None
    amount_due: float
    amount_paid: float
    currency: str
    status: str
    invoice_url: str | None = None
    pdf_url: str | None = None

    model_config = {"from_attributes": True}


class PortalRequest(BaseModel):
    user_id: UUID
    return_url: str | None = None


class PortalResponse(BaseModel):
    url: str


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------


@router.get("/invoices", response_model=list[InvoiceRead])
async def list_invoices(
    user_id: UUID,
    db: AsyncSession = Depends(get_db),
) -> list[InvoiceRead]:
    invoices = await services.list_invoices(db, user_id)
    return [InvoiceRead.model_validate(inv) for inv in invoices]


@router.post("/portal", response_model=PortalResponse)
async def get_portal_url(
    body: PortalRequest,
    db: AsyncSession = Depends(get_db),
) -> PortalResponse:
    return_url = body.return_url or f"{settings.frontend_url}/billing"
    url = await services.create_portal_session(db, body.user_id, return_url)
    if not url:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No Stripe customer found for this user.",
        )
    return PortalResponse(url=url)
