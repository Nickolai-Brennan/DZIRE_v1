"""backend/app/social_integrations/models.py — SQLAlchemy ORM models for Social Integrations."""

from __future__ import annotations

import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..core.database import Base


class SocialAccount(Base):
    __tablename__ = "social_accounts"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    platform: Mapped[str] = mapped_column(String(80), nullable=False)
    account_name: Mapped[str] = mapped_column(String(255), nullable=False)
    account_handle: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    external_account_id: Mapped[Optional[str]] = mapped_column(
        String(255), nullable=True
    )
    auth_type: Mapped[Optional[str]] = mapped_column(String(80), nullable=True)
    access_token_encrypted: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    refresh_token_encrypted: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    webhook_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(40), nullable=False, default="active")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    posts: Mapped[list["SocialPost"]] = relationship(
        "SocialPost", back_populates="account", lazy="select"
    )


class SocialPost(Base):
    __tablename__ = "social_posts"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    platform: Mapped[str] = mapped_column(String(80), nullable=False)
    account_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("social_accounts.id", ondelete="CASCADE"),
        nullable=False,
    )
    related_content_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), nullable=True
    )
    campaign_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), nullable=True
    )
    caption: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    media_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    post_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    hashtags: Mapped[Optional[list]] = mapped_column(ARRAY(Text), nullable=True)
    status: Mapped[str] = mapped_column(String(40), nullable=False, default="draft")
    scheduled_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    published_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    external_post_id: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    platform_specific_data: Mapped[dict] = mapped_column(
        JSONB, nullable=False, default=dict
    )
    impressions: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    clicks: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    likes: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    comments: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    shares: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    account: Mapped["SocialAccount"] = relationship(
        "SocialAccount", back_populates="posts", lazy="joined"
    )


class SocialSizeChart(Base):
    __tablename__ = "social_size_chart"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    platform: Mapped[str] = mapped_column(String(80), nullable=False)
    asset_type: Mapped[str] = mapped_column(String(120), nullable=False)
    recommended_width: Mapped[int] = mapped_column(Integer, nullable=False)
    recommended_height: Mapped[int] = mapped_column(Integer, nullable=False)
    aspect_ratio: Mapped[Optional[str]] = mapped_column(String(40), nullable=True)
    text_limit: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    caption_limit: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    hashtag_limit: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    safe_zone_notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    file_type: Mapped[Optional[str]] = mapped_column(String(120), nullable=True)
    max_file_size: Mapped[Optional[str]] = mapped_column(String(80), nullable=True)
    template_path: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    last_verified_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    status: Mapped[str] = mapped_column(String(40), nullable=False, default="active")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
