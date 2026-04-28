"""backend/app/user_behavior/models.py — SQLAlchemy ORM models for user behavior."""

import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import Boolean, DateTime, Float, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from ..core.database import Base


class UserBehaviorEvent(Base):
    """Tracks individual user interactions for personalization."""

    __tablename__ = "user_behavior_events"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), nullable=True
    )
    session_id: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    event_type: Mapped[str] = mapped_column(
        String(64), nullable=False
    )  # post_view, tag_click, search, save_post, etc.
    content_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), nullable=True
    )
    content_type: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    category: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    tags: Mapped[Optional[list]] = mapped_column(ARRAY(Text), nullable=True)
    duration_seconds: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    scroll_depth: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    source: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    event_metadata: Mapped[Optional[dict]] = mapped_column(JSONB, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class UserPreference(Base):
    """Stores aggregated user preferences for personalization."""

    __tablename__ = "user_preferences"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), unique=True, nullable=False
    )
    favorite_categories: Mapped[Optional[list]] = mapped_column(
        ARRAY(Text), nullable=True
    )
    favorite_tags: Mapped[Optional[list]] = mapped_column(ARRAY(Text), nullable=True)
    preferred_content_types: Mapped[Optional[list]] = mapped_column(
        ARRAY(Text), nullable=True
    )
    blocked_tags: Mapped[Optional[list]] = mapped_column(ARRAY(Text), nullable=True)
    vip_interest_score: Mapped[float] = mapped_column(
        Float, nullable=False, default=0.0
    )
    personalization_enabled: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=True
    )
    last_updated: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
