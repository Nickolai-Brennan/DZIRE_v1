"""backend/app/social_integrations/providers/discord.py — Discord provider skeleton."""

from __future__ import annotations

import logging
from typing import Any

from .base import BaseProvider

logger = logging.getLogger(__name__)


class DiscordProvider(BaseProvider):
    """Provider for Discord. Replace stubs with real API calls using
    the `discord.py` library or Discord REST API once bot token / webhook URL is configured.
    """

    platform = "discord"

    async def connect_account(self, credentials: dict) -> dict:
        # TODO: Exchange OAuth2 code for bot/user token via POST /oauth2/token
        logger.info("[Discord] connect_account — mock")
        return {"status": "connected", "platform": self.platform}

    async def validate_credentials(self, credentials: dict) -> bool:
        # TODO: Call GET /users/@me with the bearer token
        logger.info("[Discord] validate_credentials — mock")
        return True

    async def schedule_post(self, post: Any, scheduled_at: Any) -> dict:
        # TODO: Discord has no native scheduling; use internal queue and POST at scheduled_at
        logger.info("[Discord] schedule_post post_id=%s — mock", getattr(post, "id", None))
        return {"status": "scheduled", "platform": self.platform}

    async def publish_post(self, post: Any) -> dict:
        # TODO: POST /channels/{channel.id}/messages or execute a webhook URL
        logger.info("[Discord] publish_post post_id=%s — mock", getattr(post, "id", None))
        return {"status": "published", "platform": self.platform}

    async def fetch_metrics(self, post: Any) -> dict:
        # TODO: GET /channels/{channel.id}/messages/{message.id} and read reaction counts
        logger.info("[Discord] fetch_metrics post_id=%s — mock", getattr(post, "id", None))
        return {"impressions": 0, "clicks": 0, "likes": 0, "comments": 0, "shares": 0}

    async def handle_webhook(self, payload: dict) -> dict:
        # TODO: Verify Ed25519 signature and process Discord interaction/webhook events
        logger.info("[Discord] handle_webhook event=%s — mock", payload.get("event_type"))
        return {"received": True, "platform": self.platform}
