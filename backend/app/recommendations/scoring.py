"""backend/app/recommendations/scoring.py — Recommendation scoring logic."""

from __future__ import annotations

import math
from datetime import datetime, timezone
from typing import Optional


def compute_recommendation_score(
    *,
    tag_overlap: int = 0,
    category_match: bool = False,
    keyword_similarity: float = 0.0,
    view_count: int = 0,
    click_count: int = 0,
    published_at: Optional[datetime] = None,
    user_interest: float = 0.0,
) -> float:
    """Compute a recommendation score.

    recommendation_score =
        tag_overlap (capped at 3) * 0.5
        + category_match * 1.0
        + keyword_similarity (0–1)
        + popularity (0–1, log-normalised)
        + recency (0–1, decay over 180 days)
        + user_interest (0–2)
    """
    score = min(tag_overlap, 3) * 0.5
    if category_match:
        score += 1.0
    score += min(1.0, max(0.0, keyword_similarity))

    interactions = view_count + click_count * 2
    if interactions > 0:
        score += min(1.0, math.log1p(interactions) / 8.0)

    if published_at is not None:
        now = datetime.now(timezone.utc)
        age_days = max((now - published_at).days, 0)
        recency = max(0.0, 1.0 - age_days / 180.0)
        score += recency

    score += min(2.0, max(0.0, user_interest))
    return round(score, 4)
