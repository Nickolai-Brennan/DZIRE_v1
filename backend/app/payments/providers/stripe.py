"""backend/app/payments/providers/stripe.py — Stripe SDK client wrapper."""

from __future__ import annotations

import stripe

from ...core.config import get_settings


def get_stripe_client() -> stripe.Stripe:
    """Return a configured Stripe client using the secret key from settings."""
    settings = get_settings()
    return stripe.Stripe(api_key=settings.stripe_secret_key)


def get_stripe_sync() -> stripe.Stripe:
    """Alias for get_stripe_client for clarity in synchronous contexts."""
    return get_stripe_client()
