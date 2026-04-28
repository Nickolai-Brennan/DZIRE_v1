# Step 10 — How to Add a New Social Provider

## Overview

Providers live in `backend/app/social_integrations/providers/`. Each provider is a class that inherits from `BaseProvider` and implements 6 methods.

---

## Step 1 — Create the provider file

Create `backend/app/social_integrations/providers/my_platform.py`:

```python
"""Social provider for My Platform."""
from __future__ import annotations

import logging
from typing import Any

from .base import BaseProvider

logger = logging.getLogger(__name__)


class MyPlatformProvider(BaseProvider):
    """Provider for My Platform."""

    def connect_account(self, credentials: dict[str, Any]) -> dict[str, Any]:
        """Exchange OAuth code / API keys for tokens. Store encrypted tokens."""
        # TODO: implement OAuth flow
        logger.info("MyPlatform: connect_account called")
        return {"status": "connected", "platform": "my_platform"}

    def validate_credentials(self, account: dict[str, Any]) -> bool:
        """Return True if the stored credentials are still valid."""
        # TODO: hit /me or equivalent endpoint
        logger.info("MyPlatform: validate_credentials called")
        return True

    def schedule_post(self, post: dict[str, Any]) -> dict[str, Any]:
        """Store the post in the platform's scheduling queue."""
        # TODO: use platform scheduling API
        logger.info("MyPlatform: schedule_post called with %s", post)
        return {"status": "scheduled", "external_post_id": "mock-123"}

    def publish_post(self, post: dict[str, Any]) -> dict[str, Any]:
        """Immediately publish a post. Return external_post_id + post_url."""
        # TODO: call platform publish API
        logger.info("MyPlatform: publish_post called with %s", post)
        return {
            "status": "published",
            "external_post_id": "mock-123",
            "post_url": "https://myplatform.example/post/mock-123",
        }

    def fetch_metrics(self, post: dict[str, Any]) -> dict[str, Any]:
        """Return impressions, clicks, likes, comments, shares for a post."""
        # TODO: call platform analytics API
        logger.info("MyPlatform: fetch_metrics called for %s", post.get("external_post_id"))
        return {
            "impressions": 0,
            "clicks": 0,
            "likes": 0,
            "comments": 0,
            "shares": 0,
        }

    def handle_webhook(self, payload: dict[str, Any]) -> dict[str, Any]:
        """Handle incoming webhook events from the platform."""
        # TODO: parse and process webhook payload
        logger.info("MyPlatform: handle_webhook received payload")
        return {"received": True}
```

---

## Step 2 — Register the provider

Open `backend/app/social_integrations/providers/base.py` and add your provider to the `get_provider` function:

```python
from .my_platform import MyPlatformProvider

def get_provider(platform: str) -> BaseProvider:
    providers: dict[str, type[BaseProvider]] = {
        # ... existing providers ...
        "my_platform": MyPlatformProvider,
    }
    cls = providers.get(platform.lower())
    if cls is None:
        return MockProvider()
    return cls()
```

---

## Step 3 — Add env vars

In `backend/.env` (and document in `docs/step-10/setup.md`):

```bash
MY_PLATFORM_CLIENT_ID=
MY_PLATFORM_CLIENT_SECRET=
```

Load them inside your provider class using `os.environ.get(...)` or through `get_settings()`.

---

## Step 4 — Test the provider

```bash
cd backend
python -c "
from app.social_integrations.providers.base import get_provider
p = get_provider('my_platform')
print(p.publish_post({'caption': 'hello'}))
"
```

---

## Provider interface reference

| Method | Signature | Returns |
|--------|-----------|---------|
| `connect_account` | `(credentials: dict) -> dict` | `{"status": "connected", ...}` |
| `validate_credentials` | `(account: dict) -> bool` | `True` / `False` |
| `schedule_post` | `(post: dict) -> dict` | `{"status": "scheduled", "external_post_id": "..."}` |
| `publish_post` | `(post: dict) -> dict` | `{"status": "published", "external_post_id": "...", "post_url": "..."}` |
| `fetch_metrics` | `(post: dict) -> dict` | `{"impressions": N, "clicks": N, ...}` |
| `handle_webhook` | `(payload: dict) -> dict` | `{"received": True, ...}` |
