"""backend/app/affiliates/models.py — SQLAlchemy ORM models for affiliates."""
from datetime import datetime
from typing import Optional
import uuid

from sqlalchemy import DateTime, Integer, Numeric, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..core.database import Base


class Affiliate(Base):
    __tablename__ = "affiliates"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    website: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    contact_email: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    network: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    commission_rate: Mapped[Optional[float]] = mapped_column(Numeric(5, 4), nullable=True)
    status: Mapped[str] = mapped_column(String(16), nullable=False, default="active")
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    links: Mapped[list["AffiliateLink"]] = relationship("AffiliateLink", back_populates="affiliate", lazy="select")


class AffiliateLink(Base):
    __tablename__ = "affiliate_links"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    affiliate_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    post_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), nullable=True)
    product_name: Mapped[str] = mapped_column(Text, nullable=False)
    destination_url: Mapped[str] = mapped_column(Text, nullable=False)
    tracking_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    coupon_code: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    click_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    conversion_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    estimated_revenue: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False, default=0)
    status: Mapped[str] = mapped_column(String(16), nullable=False, default="active")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    affiliate: Mapped["Affiliate"] = relationship("Affiliate", back_populates="links", lazy="joined")
