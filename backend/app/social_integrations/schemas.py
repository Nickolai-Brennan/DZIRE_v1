"""backend/app/social_integrations/schemas.py — Pydantic v2 schemas for Social Integrations."""

from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

# ── SocialAccount ─────────────────────────────────────────────────────────────


class SocialAccountBase(BaseModel):
    platform: str
    account_name: str
    account_handle: Optional[str] = None
    external_account_id: Optional[str] = None
    auth_type: Optional[str] = None
    webhook_url: Optional[str] = None
    status: str = "active"


class SocialAccountCreate(SocialAccountBase):
    access_token_encrypted: Optional[str] = None
    refresh_token_encrypted: Optional[str] = None


class SocialAccountUpdate(BaseModel):
    platform: Optional[str] = None
    account_name: Optional[str] = None
    account_handle: Optional[str] = None
    external_account_id: Optional[str] = None
    auth_type: Optional[str] = None
    access_token_encrypted: Optional[str] = None
    refresh_token_encrypted: Optional[str] = None
    webhook_url: Optional[str] = None
    status: Optional[str] = None


class SocialAccountRead(SocialAccountBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


# ── SocialPost ────────────────────────────────────────────────────────────────


class SocialPostBase(BaseModel):
    platform: str
    account_id: UUID
    related_content_id: Optional[UUID] = None
    campaign_id: Optional[UUID] = None
    caption: Optional[str] = None
    media_url: Optional[str] = None
    post_url: Optional[str] = None
    hashtags: Optional[list[str]] = None
    status: str = "draft"
    scheduled_at: Optional[datetime] = None
    published_at: Optional[datetime] = None
    external_post_id: Optional[str] = None
    platform_specific_data: dict = {}


class SocialPostCreate(SocialPostBase):
    pass


class SocialPostUpdate(BaseModel):
    platform: Optional[str] = None
    account_id: Optional[UUID] = None
    related_content_id: Optional[UUID] = None
    campaign_id: Optional[UUID] = None
    caption: Optional[str] = None
    media_url: Optional[str] = None
    post_url: Optional[str] = None
    hashtags: Optional[list[str]] = None
    status: Optional[str] = None
    scheduled_at: Optional[datetime] = None
    published_at: Optional[datetime] = None
    external_post_id: Optional[str] = None
    platform_specific_data: Optional[dict] = None
    impressions: Optional[int] = None
    clicks: Optional[int] = None
    likes: Optional[int] = None
    comments: Optional[int] = None
    shares: Optional[int] = None


class SocialPostRead(SocialPostBase):
    id: UUID
    impressions: int
    clicks: int
    likes: int
    comments: int
    shares: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


# ── SocialSizeChart ───────────────────────────────────────────────────────────


class SocialSizeChartBase(BaseModel):
    platform: str
    asset_type: str
    recommended_width: int
    recommended_height: int
    aspect_ratio: Optional[str] = None
    text_limit: Optional[int] = None
    caption_limit: Optional[int] = None
    hashtag_limit: Optional[int] = None
    safe_zone_notes: Optional[str] = None
    file_type: Optional[str] = None
    max_file_size: Optional[str] = None
    template_path: Optional[str] = None
    last_verified_at: Optional[datetime] = None
    status: str = "active"


class SocialSizeChartCreate(SocialSizeChartBase):
    pass


class SocialSizeChartRead(SocialSizeChartBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


# ── Action payload schemas ────────────────────────────────────────────────────


class SchedulePostPayload(BaseModel):
    post_id: UUID
    scheduled_at: datetime


class PublishPostPayload(BaseModel):
    post_id: UUID


class WebhookPayload(BaseModel):
    platform: str
    event_type: str
    data: dict = {}
