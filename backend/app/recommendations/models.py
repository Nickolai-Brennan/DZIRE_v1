"""backend/app/recommendations/models.py — SQLAlchemy ORM models for recommendations."""

import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from ..core.database import Base


class Recommendation(Base):
    """Stores a recommendation entry for a user/content pair."""

    __tablename__ = "recommendations"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), nullable=True
    )
    content_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    content_type: Mapped[str] = mapped_column(
        String(64), nullable=False, default="post"
    )
    recommendation_type: Mapped[str] = mapped_column(
        String(64), nullable=False
    )  # related, trending, recommended_for_you, continue_reading, popular_in_category, more_from_author
    score: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    reason: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    shown_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    clicked_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    dismissed_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class SavedPost(Base):
    """Allows users to save/bookmark posts into named collections."""

    __tablename__ = "saved_posts"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    post_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("cms_posts.id", ondelete="CASCADE"),
        nullable=False,
    )
    collection_name: Mapped[str] = mapped_column(
        Text, nullable=False, default="default"
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
