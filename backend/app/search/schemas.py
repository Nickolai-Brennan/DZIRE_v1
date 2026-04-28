"""backend/app/search/schemas.py — Pydantic v2 schemas for search."""

from __future__ import annotations

from datetime import datetime
from typing import Any, Optional
from uuid import UUID

from pydantic import BaseModel

# ── Search Request ───────────────────────────────────────────────────────────


class SearchRequest(BaseModel):
    query: str
    content_type: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[list[str]] = None
    author: Optional[str] = None
    is_vip_only: Optional[bool] = None
    visibility: Optional[str] = None
    sort_by: str = "relevance"
    skip: int = 0
    limit: int = 20


class AdvancedSearchRequest(SearchRequest):
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None
    min_seo_score: Optional[float] = None
    sponsored: Optional[bool] = None
    affiliate: Optional[bool] = None


# ── Search Result ────────────────────────────────────────────────────────────


class SearchResultItem(BaseModel):
    id: UUID
    content_id: UUID
    content_type: str
    title: str
    slug: str
    excerpt: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[list[str]] = None
    author: Optional[str] = None
    is_vip_only: bool = False
    published_at: Optional[datetime] = None
    ranking_score: Optional[float] = None

    model_config = {"from_attributes": True}


class SearchResponse(BaseModel):
    query: str
    total: int
    items: list[SearchResultItem]
    skip: int
    limit: int


# ── Suggestions & Trending ───────────────────────────────────────────────────


class SearchSuggestion(BaseModel):
    query: str
    count: int


class TrendingQuery(BaseModel):
    query: str
    count: int
    period: str = "7d"


# ── Query Log ────────────────────────────────────────────────────────────────


class SearchQueryLogCreate(BaseModel):
    user_id: Optional[UUID] = None
    session_id: Optional[str] = None
    query: str
    filters: Optional[dict[str, Any]] = None
    result_count: int = 0
    clicked_result_id: Optional[UUID] = None


class SearchQueryLogRead(SearchQueryLogCreate):
    id: UUID
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Admin Analytics ──────────────────────────────────────────────────────────


class SearchAnalytics(BaseModel):
    top_queries: list[dict[str, Any]]
    zero_result_queries: list[dict[str, Any]]
    most_clicked_results: list[dict[str, Any]]
    popular_tags: list[dict[str, Any]]
    popular_categories: list[dict[str, Any]]
    total_searches_7d: int
    total_searches_30d: int
