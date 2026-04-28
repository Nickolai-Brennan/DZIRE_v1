"""backend/app/social_integrations/providers/instagram.py — Instagram provider skeleton."""

from __future__ import annotations

import logging
from typing import Any

from .base import BaseProvider

logger = logging.getLogger(__name__)


class InstagramProvider(BaseProvider):
    """Provider for Instagram Graph API. Replace stubs with real API calls using
    the Meta Graph API (graph.facebook.com/v{version}) once credentials are configured.
    """

    platform = "instagram"

    async def connect_account(self, credentials: dict) -> dict:
        # TODO: Exchange short-lived token for long-lived token via GET /oauth/access_token
        logger.info("[Instagram] connect_account — mock")
        return {"status": "connected", "platform": self.platform}

    async def validate_credentials(self, credentials: dict) -> bool:
        # TODO: Call GET /me?fields=id,name with the access token
        logger.info("[Instagram] validate_credentials — mock")
        return True

    async def schedule_post(self, post: Any, scheduled_at: Any) -> dict:
        # TODO: Create a media container then schedule via POST /{ig-user-id}/media
        logger.info("[Instagram] schedule_post post_id=%s — mock", getattr(post, "id", None))
        return {"status": "scheduled", "platform": self.platform}

    async def publish_post(self, post: Any) -> dict:
        # TODO: POST /{ig-user-id}/media (create container) then POST /{ig-user-id}/media_publish
        logger.info("[Instagram] publish_post post_id=%s — mock", getattr(post, "id", None))
        return {"status": "published", "platform": self.platform}

    async def fetch_metrics(self, post: Any) -> dict:
        # TODO: GET /{ig-media-id}/insights?metric=impressions,reach,likes,comments,shares
        logger.info("[Instagram] fetch_metrics post_id=%s — mock", getattr(post, "id", None))
        return {"impressions": 0, "clicks": 0, "likes": 0, "comments": 0, "shares": 0}

    async def handle_webhook(self, payload: dict) -> dict:
        # TODO: Verify hub.challenge and process Instagram webhook change events
        logger.info("[Instagram] handle_webhook event=%s — mock", payload.get("event_type"))
        return {"received": True, "platform": self.platform}
