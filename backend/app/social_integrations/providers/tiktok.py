"""backend/app/social_integrations/providers/tiktok.py — TikTok provider skeleton."""

from __future__ import annotations

import logging
from typing import Any

from .base import BaseProvider

logger = logging.getLogger(__name__)


class TikTokProvider(BaseProvider):
    """Provider for TikTok Content Posting API. Replace stubs with real API calls
    using the TikTok for Developers API once credentials are configured.
    """

    platform = "tiktok"

    async def connect_account(self, credentials: dict) -> dict:
        # TODO: Exchange OAuth2 authorization code via POST /oauth/token/
        logger.info("[TikTok] connect_account — mock")
        return {"status": "connected", "platform": self.platform}

    async def validate_credentials(self, credentials: dict) -> bool:
        # TODO: Call GET /v2/user/info/ with the access_token
        logger.info("[TikTok] validate_credentials — mock")
        return True

    async def schedule_post(self, post: Any, scheduled_at: Any) -> dict:
        # TODO: POST /v2/post/publish/video/init/ with scheduled_publish_time
        logger.info(
            "[TikTok] schedule_post post_id=%s — mock", getattr(post, "id", None)
        )
        return {"status": "scheduled", "platform": self.platform}

    async def publish_post(self, post: Any) -> dict:
        # TODO: POST /v2/post/publish/video/init/ then confirm with /complete/
        logger.info(
            "[TikTok] publish_post post_id=%s — mock", getattr(post, "id", None)
        )
        return {"status": "published", "platform": self.platform}

    async def fetch_metrics(self, post: Any) -> dict:
        # TODO: GET /v2/video/query/?fields=view_count,like_count,comment_count,share_count
        logger.info(
            "[TikTok] fetch_metrics post_id=%s — mock", getattr(post, "id", None)
        )
        return {"impressions": 0, "clicks": 0, "likes": 0, "comments": 0, "shares": 0}

    async def handle_webhook(self, payload: dict) -> dict:
        # TODO: Verify webhook signature and process video/comment events
        logger.info(
            "[TikTok] handle_webhook event=%s — mock", payload.get("event_type")
        )
        return {"received": True, "platform": self.platform}
