"""backend/app/social_integrations/scheduler.py — APScheduler-based post publisher."""

from __future__ import annotations

import logging
from collections.abc import Callable
from contextlib import AbstractAsyncContextManager
from datetime import datetime, timezone

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

logger = logging.getLogger(__name__)

_scheduler: AsyncIOScheduler | None = None


async def publish_due_posts(
    db_factory: Callable[[], AbstractAsyncContextManager[AsyncSession]],
) -> None:
    """Query social_posts due for publishing and dispatch each to its provider."""
    from .models import SocialPost
    from .providers import get_provider

    now = datetime.now(tz=timezone.utc)

    async with db_factory() as db:
        result = await db.execute(
            select(SocialPost).where(
                SocialPost.status.in_(["scheduled", "ready"]),
                SocialPost.scheduled_at <= now,
            )
        )
        due_posts = result.scalars().all()

        for post in due_posts:
            try:
                provider = get_provider(post.platform)
                await provider.publish_post(post)
                post.status = "published"
                post.published_at = now
                logger.info("Published post %s on %s", post.id, post.platform)
            except Exception as exc:  # noqa: BLE001
                logger.error(
                    "Failed to publish post %s on %s: %s", post.id, post.platform, exc
                )

        await db.commit()


def start_scheduler(
    db_factory: Callable[[], AbstractAsyncContextManager[AsyncSession]] | None = None,
) -> None:
    """Start the APScheduler background scheduler."""
    global _scheduler  # noqa: PLW0603

    if _scheduler is not None and _scheduler.running:
        logger.warning("Scheduler already running — skipping start.")
        return

    from ..core.database import AsyncSessionLocal

    factory = db_factory or AsyncSessionLocal
    if factory is None:
        logger.warning("No DB factory available — scheduler will not start.")
        return

    _scheduler = AsyncIOScheduler(timezone="UTC")
    _scheduler.add_job(
        publish_due_posts,
        trigger="interval",
        minutes=1,
        id="publish_due_posts",
        kwargs={"db_factory": factory},
        replace_existing=True,
    )
    _scheduler.start()
    logger.info("Social post scheduler started.")


def stop_scheduler() -> None:
    """Gracefully shut down the scheduler."""
    global _scheduler  # noqa: PLW0603
    if _scheduler and _scheduler.running:
        _scheduler.shutdown(wait=False)
        logger.info("Social post scheduler stopped.")
    _scheduler = None
