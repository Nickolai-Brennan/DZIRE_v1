"""backend/app/recommendations/personalization.py — Personalized feed and scoring."""

from __future__ import annotations

import uuid
from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession

from ..user_behavior.services import get_recent_events, get_user_preferences
from .scoring import compute_recommendation_score


async def build_personalization_score(
    db: AsyncSession,
    user_id: uuid.UUID,
    content_tags: Optional[list[str]] = None,
    content_category: Optional[str] = None,
) -> float:
    """Compute a personalization score [0–2] for a piece of content."""
    prefs = await get_user_preferences(db, user_id)
    if prefs is None or not prefs.personalization_enabled:
        return 0.0

    score = 0.0
    tags = content_tags or []
    fav_tags = prefs.favorite_tags or []
    fav_cats = prefs.favorite_categories or []

    # Tag interest overlap
    tag_hits = sum(1 for t in tags if t in fav_tags)
    score += min(1.0, tag_hits * 0.25)

    # Category interest
    if content_category and content_category in fav_cats:
        score += 0.5

    # Recent behavior signals
    events = await get_recent_events(db, user_id, days=14, limit=50)
    for ev in events:
        if ev.event_type in ("post_view", "tag_click", "save_post"):
            ev_tags = ev.tags or []
            if any(t in fav_tags for t in ev_tags):
                score += 0.05
            if ev.category and ev.category == content_category:
                score += 0.05

    return min(2.0, round(score, 4))
