"""backend/app/billing/routes.py — Billing API routes."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from ..auth.dependencies import get_current_user
from ..core.config import get_settings
from ..core.database import get_db
from ..models.user import User
from . import services
from .invoices import Invoice

router = APIRouter(prefix="/api/billing", tags=["billing"])
settings = get_settings()


# ---------------------------------------------------------------------------
# Schemas (inline — minimal)
# ---------------------------------------------------------------------------


class InvoiceRead(BaseModel):
    id: str
    user_id: str
    provider_invoice_id: str | None = None
    amount_due: float
    amount_paid: float
    currency: str
    status: str
    invoice_url: str | None = None
    pdf_url: str | None = None

    model_config = {"from_attributes": True}


class PortalResponse(BaseModel):
    url: str


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------


@router.get("/invoices", response_model=list[InvoiceRead])
async def list_invoices(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[InvoiceRead]:
    invoices = await services.list_invoices(db, current_user.id)
    return [InvoiceRead.model_validate(inv) for inv in invoices]


@router.post("/portal", response_model=PortalResponse)
async def get_portal_url(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PortalResponse:
    return_url = f"{settings.frontend_url}/billing"
    url = await services.create_portal_session(db, current_user.id, return_url)
    if not url:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No Stripe customer found for this user.",
        )
    return PortalResponse(url=url)
