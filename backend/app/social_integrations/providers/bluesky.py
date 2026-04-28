"""backend/app/social_integrations/providers/bluesky.py — Bluesky provider skeleton."""

from __future__ import annotations

import logging
from typing import Any

from .base import BaseProvider

logger = logging.getLogger(__name__)


class BlueskyProvider(BaseProvider):
    """Provider for Bluesky (AT Protocol). Replace stubs with real API calls using
    the `atproto` Python SDK once credentials (handle + app password) are configured.
    """

    platform = "bluesky"

    async def connect_account(self, credentials: dict) -> dict:
        # TODO: Call com.atproto.server.createSession with identifier + password
        logger.info("[Bluesky] connect_account — mock")
        return {"status": "connected", "platform": self.platform}

    async def validate_credentials(self, credentials: dict) -> bool:
        # TODO: Call com.atproto.server.getSession with the accessJwt
        logger.info("[Bluesky] validate_credentials — mock")
        return True

    async def schedule_post(self, post: Any, scheduled_at: Any) -> dict:
        # TODO: AT Protocol has no native scheduling; use internal queue + publish at scheduled_at
        logger.info(
            "[Bluesky] schedule_post post_id=%s — mock", getattr(post, "id", None)
        )
        return {"status": "scheduled", "platform": self.platform}

    async def publish_post(self, post: Any) -> dict:
        # TODO: Call com.atproto.repo.createRecord with $type=app.bsky.feed.post
        logger.info(
            "[Bluesky] publish_post post_id=%s — mock", getattr(post, "id", None)
        )
        return {"status": "published", "platform": self.platform}

    async def fetch_metrics(self, post: Any) -> dict:
        # TODO: Call app.bsky.feed.getPostThread and count replies/likes/reposts
        logger.info(
            "[Bluesky] fetch_metrics post_id=%s — mock", getattr(post, "id", None)
        )
        return {"impressions": 0, "clicks": 0, "likes": 0, "comments": 0, "shares": 0}

    async def handle_webhook(self, payload: dict) -> dict:
        # TODO: Subscribe to com.atproto.sync.subscribeRepos firehose for events
        logger.info(
            "[Bluesky] handle_webhook event=%s — mock", payload.get("event_type")
        )
        return {"received": True, "platform": self.platform}
