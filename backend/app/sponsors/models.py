"""backend/app/sponsors/models.py — SQLAlchemy ORM models for sponsors."""

import uuid
from datetime import date, datetime
from typing import Optional

from sqlalchemy import Date, DateTime, Integer, Numeric, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..core.database import Base


class Sponsor(Base):
    __tablename__ = "sponsors"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(Text, nullable=False)
    website: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    contact_name: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    contact_email: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    logo_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(16), nullable=False, default="active")
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    campaigns: Mapped[list["SponsorCampaign"]] = relationship(
        "SponsorCampaign", back_populates="sponsor", lazy="select"
    )


class SponsorCampaign(Base):
    __tablename__ = "sponsor_campaigns"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    sponsor_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    campaign_name: Mapped[str] = mapped_column(Text, nullable=False)
    placement_type: Mapped[str] = mapped_column(String(64), nullable=False)
    start_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    end_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    budget: Mapped[Optional[float]] = mapped_column(Numeric(12, 2), nullable=True)
    impressions: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    clicks: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    ctr: Mapped[Optional[float]] = mapped_column(Numeric(5, 4), nullable=True)
    status: Mapped[str] = mapped_column(String(16), nullable=False, default="draft")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    sponsor: Mapped["Sponsor"] = relationship(
        "Sponsor", back_populates="campaigns", lazy="joined"
    )
