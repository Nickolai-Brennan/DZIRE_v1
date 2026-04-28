"""backend/app/social_integrations/providers/base.py — Abstract base provider."""

from __future__ import annotations

import logging
from abc import ABC, abstractmethod
from typing import Any

logger = logging.getLogger(__name__)


class BaseProvider(ABC):
    """Abstract base class every social platform provider must implement."""

    @abstractmethod
    async def connect_account(self, credentials: dict) -> dict:
        """Exchange credentials for an authenticated account object."""

    @abstractmethod
    async def validate_credentials(self, credentials: dict) -> bool:
        """Return True if the supplied credentials are valid."""

    @abstractmethod
    async def schedule_post(self, post: Any, scheduled_at: Any) -> dict:
        """Schedule a post for future publishing; return platform confirmation."""

    @abstractmethod
    async def publish_post(self, post: Any) -> dict:
        """Immediately publish a post; return platform response."""

    @abstractmethod
    async def fetch_metrics(self, post: Any) -> dict:
        """Fetch engagement metrics for an already-published post."""

    @abstractmethod
    async def handle_webhook(self, payload: dict) -> dict:
        """Process an inbound webhook event from the platform."""


class MockProvider(BaseProvider):
    """Concrete mock implementation used when no real credentials are configured."""

    platform = "mock"

    async def connect_account(self, credentials: dict) -> dict:
        logger.info("[MockProvider] connect_account called with keys: %s", list(credentials))
        return {"status": "connected", "platform": self.platform}

    async def validate_credentials(self, credentials: dict) -> bool:
        logger.info("[MockProvider] validate_credentials — always True")
        return True

    async def schedule_post(self, post: Any, scheduled_at: Any) -> dict:
        logger.info("[MockProvider] schedule_post post_id=%s", getattr(post, "id", None))
        return {"status": "scheduled", "platform": self.platform, "post_id": str(getattr(post, "id", ""))}

    async def publish_post(self, post: Any) -> dict:
        logger.info("[MockProvider] publish_post post_id=%s", getattr(post, "id", None))
        return {"status": "published", "platform": self.platform, "post_id": str(getattr(post, "id", ""))}

    async def fetch_metrics(self, post: Any) -> dict:
        logger.info("[MockProvider] fetch_metrics post_id=%s", getattr(post, "id", None))
        return {
            "platform": self.platform,
            "post_id": str(getattr(post, "id", "")),
            "impressions": 0,
            "clicks": 0,
            "likes": 0,
            "comments": 0,
            "shares": 0,
        }

    async def handle_webhook(self, payload: dict) -> dict:
        logger.info("[MockProvider] handle_webhook event=%s", payload.get("event_type"))
        return {"received": True, "platform": self.platform}


def get_provider(platform: str) -> BaseProvider:
    """Return the provider instance for the given *platform* name.

    Falls back to MockProvider if the platform is unknown or has no real
    credentials configured.
    """
    from . import (  # noqa: PLC0415
        bluesky,
        discord,
        facebook,
        instagram,
        mastodon,
        reddit,
        threads,
        tiktok,
        x_twitter,
        youtube,
    )

    _registry: dict[str, BaseProvider] = {
        "x": x_twitter.XTwitterProvider(),
        "twitter": x_twitter.XTwitterProvider(),
        "instagram": instagram.InstagramProvider(),
        "facebook": facebook.FacebookProvider(),
        "tiktok": tiktok.TikTokProvider(),
        "youtube": youtube.YouTubeProvider(),
        "reddit": reddit.RedditProvider(),
        "bluesky": bluesky.BlueskyProvider(),
        "threads": threads.ThreadsProvider(),
        "mastodon": mastodon.MastodonProvider(),
        "discord": discord.DiscordProvider(),
    }
    return _registry.get(platform.lower(), MockProvider())
