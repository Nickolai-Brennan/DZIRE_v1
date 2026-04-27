"""backend/app/cms/seo.py — SEO scoring logic for CMS posts."""
from __future__ import annotations
from typing import Optional


def compute_seo_score(
    title: Optional[str],
    seo_description: Optional[str],
    body_content: Optional[str],
    keywords: Optional[list[str]],
    featured_image: Optional[str],
) -> dict:
    """Compute a basic SEO score and recommendations for a post."""
    score = 0
    recommendations: list[str] = []
    word_count = len(body_content.split()) if body_content else 0
    title_length = len(title) if title else 0
    meta_length = len(seo_description) if seo_description else 0
    keyword_count = len(keywords) if keywords else 0

    # Title (20 pts)
    if 30 <= title_length <= 60:
        score += 20
    elif title_length > 0:
        score += 10
        recommendations.append("Optimize title length to 30–60 characters.")

    # Meta description (20 pts)
    if 120 <= meta_length <= 160:
        score += 20
    elif meta_length > 0:
        score += 10
        recommendations.append("Optimize meta description to 120–160 characters.")
    else:
        recommendations.append("Add a meta description.")

    # Word count (20 pts)
    if word_count >= 800:
        score += 20
    elif word_count >= 300:
        score += 10
        recommendations.append("Aim for 800+ words for better SEO.")
    else:
        recommendations.append("Content is too short. Add more detailed content.")

    # Keywords (20 pts)
    if keyword_count >= 3:
        score += 20
    elif keyword_count > 0:
        score += 10
        recommendations.append("Add at least 3 keywords.")
    else:
        recommendations.append("Add relevant keywords.")

    # Featured image (20 pts)
    if featured_image:
        score += 20
    else:
        recommendations.append("Add a featured image.")

    grade = (
        "Excellent" if score >= 90
        else "Good" if score >= 75
        else "Needs Work" if score >= 60
        else "Poor"
    )

    return {
        "seo_score": score,
        "grade": grade,
        "word_count": word_count,
        "title_length": title_length,
        "meta_description_length": meta_length,
        "keyword_count": keyword_count,
        "recommendations": recommendations,
    }
