"""backend/app/cms/schemas.py — Pydantic v2 schemas for CMS."""
from __future__ import annotations
from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


# ── Category ────────────────────────────────────────────────────────────────

class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    parent_id: Optional[UUID] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryRead(CategoryBase):
    id: UUID
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Tag ─────────────────────────────────────────────────────────────────────

class TagBase(BaseModel):
    name: str
    slug: str


class TagCreate(TagBase):
    pass


class TagRead(TagBase):
    id: UUID
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Author ──────────────────────────────────────────────────────────────────

class AuthorBase(BaseModel):
    name: str
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    social_links: Optional[dict] = None


class AuthorCreate(AuthorBase):
    user_id: Optional[UUID] = None


class AuthorRead(AuthorBase):
    id: UUID
    user_id: Optional[UUID] = None
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Post ─────────────────────────────────────────────────────────────────────

class PostBase(BaseModel):
    title: str
    slug: str
    subtitle: Optional[str] = None
    excerpt: Optional[str] = None
    body_content: Optional[str] = None
    content_type: str = "blog_article"
    status: str = "draft"
    visibility: str = "public"
    author_id: Optional[UUID] = None
    category_id: Optional[UUID] = None
    featured_image: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    keywords: Optional[list[str]] = None
    affiliate_links: Optional[dict] = None
    sponsor_id: Optional[UUID] = None
    is_vip_only: bool = False
    published_at: Optional[datetime] = None


class PostCreate(PostBase):
    pass


class PostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    subtitle: Optional[str] = None
    excerpt: Optional[str] = None
    body_content: Optional[str] = None
    content_type: Optional[str] = None
    status: Optional[str] = None
    visibility: Optional[str] = None
    author_id: Optional[UUID] = None
    category_id: Optional[UUID] = None
    featured_image: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    keywords: Optional[list[str]] = None
    affiliate_links: Optional[dict] = None
    sponsor_id: Optional[UUID] = None
    is_vip_only: Optional[bool] = None
    published_at: Optional[datetime] = None


class PostRead(PostBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    author: Optional[AuthorRead] = None
    category: Optional[CategoryRead] = None

    model_config = {"from_attributes": True}


# ── Media ────────────────────────────────────────────────────────────────────

class MediaRead(BaseModel):
    id: UUID
    filename: str
    url: str
    mime_type: Optional[str] = None
    size_bytes: Optional[int] = None
    alt_text: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Social Embed ─────────────────────────────────────────────────────────────

class SocialEmbedBase(BaseModel):
    platform: str
    embed_url: str
    embed_code: Optional[str] = None
    caption: Optional[str] = None
    related_post_id: Optional[UUID] = None
    display_location: Optional[str] = None
    status: str = "active"


class SocialEmbedCreate(SocialEmbedBase):
    pass


class SocialEmbedRead(SocialEmbedBase):
    id: UUID
    click_count: int
    created_at: datetime

    model_config = {"from_attributes": True}
