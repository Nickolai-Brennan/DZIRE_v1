"""backend/app/billing/invoices.py — Invoice ORM model and DB helpers."""

from __future__ import annotations

import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, Numeric, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from ..core.database import Base


class Invoice(Base):
    __tablename__ = "invoices"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    provider_invoice_id: Mapped[Optional[str]] = mapped_column(Text, nullable=True, unique=True)
    amount_due: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False, default=0)
    amount_paid: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False, default=0)
    currency: Mapped[str] = mapped_column(String(8), nullable=False, default="usd")
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="open")
    invoice_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    pdf_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    period_start: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    period_end: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
