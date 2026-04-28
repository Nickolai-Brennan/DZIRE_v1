"""backend/app/social_integrations/providers/reddit.py — Reddit provider skeleton."""

from __future__ import annotations

import logging
from typing import Any

from .base import BaseProvider

logger = logging.getLogger(__name__)


class RedditProvider(BaseProvider):
    """Provider for Reddit API. Replace stubs with real API calls using
    the PRAW library or Reddit OAuth2 API once credentials are configured.
    """

    platform = "reddit"

    async def connect_account(self, credentials: dict) -> dict:
        # TODO: Exchange code grant for access token via POST https://www.reddit.com/api/v1/access_token
        logger.info("[Reddit] connect_account — mock")
        return {"status": "connected", "platform": self.platform}

    async def validate_credentials(self, credentials: dict) -> bool:
        # TODO: Call GET /api/v1/me with the bearer token
        logger.info("[Reddit] validate_credentials — mock")
        return True

    async def schedule_post(self, post: Any, scheduled_at: Any) -> dict:
        # TODO: Reddit doesn't natively schedule; use internal queue and publish at scheduled_at
        logger.info(
            "[Reddit] schedule_post post_id=%s — mock", getattr(post, "id", None)
        )
        return {"status": "scheduled", "platform": self.platform}

    async def publish_post(self, post: Any) -> dict:
        # TODO: POST /api/submit with kind="self"|"link", sr=subreddit, title, text/url
        logger.info(
            "[Reddit] publish_post post_id=%s — mock", getattr(post, "id", None)
        )
        return {"status": "published", "platform": self.platform}

    async def fetch_metrics(self, post: Any) -> dict:
        # TODO: GET /by_id/t3_{post_id}.json and extract score, num_comments
        logger.info(
            "[Reddit] fetch_metrics post_id=%s — mock", getattr(post, "id", None)
        )
        return {"impressions": 0, "clicks": 0, "likes": 0, "comments": 0, "shares": 0}

    async def handle_webhook(self, payload: dict) -> dict:
        # TODO: Process Reddit modmail/new-post push events if using Reddit webhooks via mods
        logger.info(
            "[Reddit] handle_webhook event=%s — mock", payload.get("event_type")
        )
        return {"received": True, "platform": self.platform}
