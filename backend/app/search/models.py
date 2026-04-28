"""backend/app/search/models.py — SQLAlchemy ORM models for search."""

import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import Boolean, DateTime, Float, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from ..core.database import Base


class SearchIndex(Base):
    """Full-text search index for all searchable content."""

    __tablename__ = "search_index"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    content_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    content_type: Mapped[str] = mapped_column(String(64), nullable=False)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    slug: Mapped[str] = mapped_column(Text, nullable=False)
    excerpt: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    body_text: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    category: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    tags: Mapped[Optional[list]] = mapped_column(ARRAY(Text), nullable=True)
    author: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    visibility: Mapped[str] = mapped_column(
        String(32), nullable=False, default="public"
    )
    is_vip_only: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    seo_keywords: Mapped[Optional[list]] = mapped_column(ARRAY(Text), nullable=True)
    view_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    click_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    seo_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    published_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


class SearchQueryLog(Base):
    """Log of user search queries for analytics and suggestions."""

    __tablename__ = "search_query_logs"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), nullable=True
    )
    session_id: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    query: Mapped[str] = mapped_column(Text, nullable=False)
    filters: Mapped[Optional[dict]] = mapped_column(JSONB, nullable=True)
    result_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    clicked_result_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
