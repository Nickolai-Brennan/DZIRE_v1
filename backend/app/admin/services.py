"""backend/app/admin/services.py — Admin dashboard aggregation services."""

from __future__ import annotations

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from ..analytics.models import AnalyticsEvent, PageView
from ..cms.models import CmsPost
from ..newsletter.models import NewsletterSubscriber
from ..subscriptions.models import VipSubscription


async def get_dashboard_stats(db: AsyncSession) -> dict:
    """Aggregate top-level KPI stats for the admin dashboard."""

    async def _count_records(model, *filters):
        result = await db.execute(
            select(func.count()).select_from(model).where(*filters)
        )
        return result.scalar_one() or 0

    total_posts = await _count_records(CmsPost)
    published_posts = await _count_records(CmsPost, CmsPost.status == "published")
    draft_posts = await _count_records(CmsPost, CmsPost.status == "draft")
    total_events = await _count_records(AnalyticsEvent)
    total_page_views = await _count_records(PageView)
    newsletter_subs = await _count_records(
        NewsletterSubscriber, NewsletterSubscriber.status == "active"
    )
    vip_subs = await _count_records(VipSubscription, VipSubscription.status == "active")

    return {
        "content": {
            "total_posts": total_posts,
            "published_posts": published_posts,
            "draft_posts": draft_posts,
        },
        "analytics": {
            "total_events": total_events,
            "total_page_views": total_page_views,
        },
        "revenue": {
            "newsletter_subscribers": newsletter_subs,
            "vip_subscriptions": vip_subs,
        },
    }
