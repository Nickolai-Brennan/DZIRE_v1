"""backend/app/user_behavior/services.py — User behavior business logic."""

from __future__ import annotations

import uuid
from datetime import datetime, timedelta, timezone
from typing import Any, Optional

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import UserBehaviorEvent, UserPreference


async def record_event(
    db: AsyncSession,
    user_id: Optional[uuid.UUID],
    session_id: Optional[str],
    event_type: str,
    content_id: Optional[uuid.UUID] = None,
    content_type: Optional[str] = None,
    category: Optional[str] = None,
    tags: Optional[list[str]] = None,
    duration_seconds: Optional[int] = None,
    scroll_depth: Optional[float] = None,
    source: Optional[str] = None,
    metadata: Optional[dict[str, Any]] = None,
) -> UserBehaviorEvent:
    event = UserBehaviorEvent(
        user_id=user_id,
        session_id=session_id,
        event_type=event_type,
        content_id=content_id,
        content_type=content_type,
        category=category,
        tags=tags,
        duration_seconds=duration_seconds,
        scroll_depth=scroll_depth,
        source=source,
        event_metadata=metadata,
    )
    db.add(event)
    await db.commit()
    await db.refresh(event)
    return event


async def get_user_preferences(
    db: AsyncSession, user_id: uuid.UUID
) -> UserPreference | None:
    result = await db.execute(
        select(UserPreference).where(UserPreference.user_id == user_id)
    )
    return result.scalar_one_or_none()


async def upsert_user_preferences(
    db: AsyncSession,
    user_id: uuid.UUID,
    favorite_categories: Optional[list[str]] = None,
    favorite_tags: Optional[list[str]] = None,
    preferred_content_types: Optional[list[str]] = None,
    blocked_tags: Optional[list[str]] = None,
    personalization_enabled: Optional[bool] = None,
) -> UserPreference:
    prefs = await get_user_preferences(db, user_id)
    if prefs is None:
        prefs = UserPreference(user_id=user_id)
        db.add(prefs)

    if favorite_categories is not None:
        prefs.favorite_categories = favorite_categories
    if favorite_tags is not None:
        prefs.favorite_tags = favorite_tags
    if preferred_content_types is not None:
        prefs.preferred_content_types = preferred_content_types
    if blocked_tags is not None:
        prefs.blocked_tags = blocked_tags
    if personalization_enabled is not None:
        prefs.personalization_enabled = personalization_enabled

    await db.commit()
    await db.refresh(prefs)
    return prefs


async def clear_behavior_history(db: AsyncSession, user_id: uuid.UUID) -> int:
    """Delete all behavior events for a user. Returns count deleted."""
    result = await db.execute(
        select(UserBehaviorEvent).where(UserBehaviorEvent.user_id == user_id)
    )
    events = result.scalars().all()
    count = len(events)
    await db.execute(
        delete(UserBehaviorEvent).where(UserBehaviorEvent.user_id == user_id)
    )
    await db.commit()
    return count


async def get_recent_events(
    db: AsyncSession, user_id: uuid.UUID, days: int = 30, limit: int = 100
) -> list[UserBehaviorEvent]:
    since = datetime.now(timezone.utc) - timedelta(days=days)
    result = await db.execute(
        select(UserBehaviorEvent)
        .where(
            UserBehaviorEvent.user_id == user_id,
            UserBehaviorEvent.created_at >= since,
        )
        .order_by(UserBehaviorEvent.created_at.desc())
        .limit(limit)
    )
    return list(result.scalars().all())
