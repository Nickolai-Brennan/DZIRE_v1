"""backend/app/search/ranking.py — Search ranking and scoring logic."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Optional


def compute_ranking_score(
    *,
    title_match: bool = False,
    tag_match: bool = False,
    category_match: bool = False,
    published_at: Optional[datetime] = None,
    view_count: int = 0,
    click_count: int = 0,
    seo_score: Optional[float] = None,
    personalization_score: float = 0.0,
) -> float:
    """Compute a weighted ranking score for a search result.

    Signals:
        title_match        +3.0   — keyword found in title
        tag_match          +2.0   — keyword matches a tag
        category_match     +1.5   — keyword matches the category
        recency_score      0–1.0  — exponential decay over 365 days
        popularity_score   0–1.0  — log-normalised view+click count
        seo_score          0–1.0  — passed through as-is
        personalization    0–2.0  — caller-supplied user interest score
    """
    score = 0.0

    if title_match:
        score += 3.0
    if tag_match:
        score += 2.0
    if category_match:
        score += 1.5

    # Recency: decay to 0 over ~365 days
    if published_at is not None:
        now = datetime.now(timezone.utc)
        age_days = max((now - published_at).days, 0)
        recency = max(0.0, 1.0 - age_days / 365.0)
        score += recency

    # Popularity: log-normalised combined interactions
    interactions = view_count + click_count * 3
    if interactions > 0:
        import math

        popularity = min(1.0, math.log1p(interactions) / 10.0)
        score += popularity

    if seo_score is not None:
        score += min(1.0, max(0.0, seo_score))

    score += min(2.0, max(0.0, personalization_score))

    return round(score, 4)
