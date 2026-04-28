"""backend/app/social_integrations/providers/mastodon.py — Mastodon provider skeleton."""

from __future__ import annotations

import logging
from typing import Any

from .base import BaseProvider

logger = logging.getLogger(__name__)


class MastodonProvider(BaseProvider):
    """Provider for Mastodon. Replace stubs with real API calls using
    the `Mastodon.py` library once server URL + access token are configured.
    """

    platform = "mastodon"

    async def connect_account(self, credentials: dict) -> dict:
        # TODO: POST /oauth/token on the user's chosen Mastodon instance
        logger.info("[Mastodon] connect_account — mock")
        return {"status": "connected", "platform": self.platform}

    async def validate_credentials(self, credentials: dict) -> bool:
        # TODO: Call GET /api/v1/accounts/verify_credentials with the access token
        logger.info("[Mastodon] validate_credentials — mock")
        return True

    async def schedule_post(self, post: Any, scheduled_at: Any) -> dict:
        # TODO: POST /api/v1/statuses with Idempotency-Key header and scheduled_at param
        logger.info(
            "[Mastodon] schedule_post post_id=%s — mock", getattr(post, "id", None)
        )
        return {"status": "scheduled", "platform": self.platform}

    async def publish_post(self, post: Any) -> dict:
        # TODO: POST /api/v1/statuses with status=post.caption and optional media_ids
        logger.info(
            "[Mastodon] publish_post post_id=%s — mock", getattr(post, "id", None)
        )
        return {"status": "published", "platform": self.platform}

    async def fetch_metrics(self, post: Any) -> dict:
        # TODO: GET /api/v1/statuses/{id} and read replies_count, reblogs_count, favourites_count
        logger.info(
            "[Mastodon] fetch_metrics post_id=%s — mock", getattr(post, "id", None)
        )
        return {"impressions": 0, "clicks": 0, "likes": 0, "comments": 0, "shares": 0}

    async def handle_webhook(self, payload: dict) -> dict:
        # TODO: Use streaming API (GET /api/v1/streaming) or push notifications
        logger.info(
            "[Mastodon] handle_webhook event=%s — mock", payload.get("event_type")
        )
        return {"received": True, "platform": self.platform}
