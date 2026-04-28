"""backend/app/social_integrations/providers/facebook.py — Facebook provider skeleton."""

from __future__ import annotations

import logging
from typing import Any

from .base import BaseProvider

logger = logging.getLogger(__name__)


class FacebookProvider(BaseProvider):
    """Provider for Facebook Graph API. Replace stubs with real API calls using
    the Meta Graph API once page/user credentials are configured.
    """

    platform = "facebook"

    async def connect_account(self, credentials: dict) -> dict:
        # TODO: Exchange OAuth code for page access token via GET /oauth/access_token
        logger.info("[Facebook] connect_account — mock")
        return {"status": "connected", "platform": self.platform}

    async def validate_credentials(self, credentials: dict) -> bool:
        # TODO: Call GET /me?fields=id,name with the page access token
        logger.info("[Facebook] validate_credentials — mock")
        return True

    async def schedule_post(self, post: Any, scheduled_at: Any) -> dict:
        # TODO: POST /{page-id}/feed with published=false and scheduled_publish_time (Unix ts)
        logger.info("[Facebook] schedule_post post_id=%s — mock", getattr(post, "id", None))
        return {"status": "scheduled", "platform": self.platform}

    async def publish_post(self, post: Any) -> dict:
        # TODO: POST /{page-id}/feed with message=post.caption and link/photos
        logger.info("[Facebook] publish_post post_id=%s — mock", getattr(post, "id", None))
        return {"status": "published", "platform": self.platform}

    async def fetch_metrics(self, post: Any) -> dict:
        # TODO: GET /{post-id}/insights?metric=post_impressions,post_clicks,post_reactions_by_type_total
        logger.info("[Facebook] fetch_metrics post_id=%s — mock", getattr(post, "id", None))
        return {"impressions": 0, "clicks": 0, "likes": 0, "comments": 0, "shares": 0}

    async def handle_webhook(self, payload: dict) -> dict:
        # TODO: Verify hub.verify_token and process page subscription events
        logger.info("[Facebook] handle_webhook event=%s — mock", payload.get("event_type"))
        return {"received": True, "platform": self.platform}
