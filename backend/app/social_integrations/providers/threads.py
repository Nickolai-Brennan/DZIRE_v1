"""backend/app/social_integrations/providers/threads.py — Threads provider skeleton."""

from __future__ import annotations

import logging
from typing import Any

from .base import BaseProvider

logger = logging.getLogger(__name__)


class ThreadsProvider(BaseProvider):
    """Provider for Threads (Meta). Replace stubs with real API calls using
    the Threads API (graph.threads.net) once credentials are configured.
    """

    platform = "threads"

    async def connect_account(self, credentials: dict) -> dict:
        # TODO: Exchange OAuth2 code for access token via Meta OAuth endpoint for Threads
        logger.info("[Threads] connect_account — mock")
        return {"status": "connected", "platform": self.platform}

    async def validate_credentials(self, credentials: dict) -> bool:
        # TODO: Call GET /me?fields=id,name,username with the access token
        logger.info("[Threads] validate_credentials — mock")
        return True

    async def schedule_post(self, post: Any, scheduled_at: Any) -> dict:
        # TODO: Threads API does not natively schedule; use internal queue
        logger.info("[Threads] schedule_post post_id=%s — mock", getattr(post, "id", None))
        return {"status": "scheduled", "platform": self.platform}

    async def publish_post(self, post: Any) -> dict:
        # TODO: POST /{threads-user-id}/threads (create container) then POST /threads_publish
        logger.info("[Threads] publish_post post_id=%s — mock", getattr(post, "id", None))
        return {"status": "published", "platform": self.platform}

    async def fetch_metrics(self, post: Any) -> dict:
        # TODO: GET /{threads-media-id}/insights?metric=views,likes,replies,reposts
        logger.info("[Threads] fetch_metrics post_id=%s — mock", getattr(post, "id", None))
        return {"impressions": 0, "clicks": 0, "likes": 0, "comments": 0, "shares": 0}

    async def handle_webhook(self, payload: dict) -> dict:
        # TODO: Verify hub.verify_token and process Threads webhook subscription events
        logger.info("[Threads] handle_webhook event=%s — mock", payload.get("event_type"))
        return {"received": True, "platform": self.platform}
