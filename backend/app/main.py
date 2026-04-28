"""DZIRE_v1 — FastAPI application entry point."""

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .admin.routes import router as admin_router
from .affiliates.routes import router as affiliates_router
from .analytics.routes import router as analytics_router
from .api.routes.admin_auth import router as admin_auth_router
# Step 7 routers
from .auth.routes import router as auth_v2_router
from .billing.routes import router as billing_router
# Step 5 routers
from .cms.routes import router as cms_router
from .core.config import get_settings
from .core.database import AsyncSessionLocal
from .newsletter.routes import router as newsletter_router
# Step 8 routers
from .payments.routes import router as payments_router
from .payments.webhooks import router as payments_webhook_router
from .recommendations.routes import router as recommendations_router
from .recommendations.routes import saved_router as saved_posts_router
from .revenue.routes import router as revenue_router
from .routes.auth import router as auth_router
# Step 9 routers
from .search.routes import admin_router as search_admin_router
from .search.routes import router as search_router
from .seed.dev_admin import seed_dev_admin
from .sponsors.routes import router as sponsors_router
from .subscriptions.routes import router as subscriptions_router
from .subscriptions.routes import sub_router as subscriptions_sub_router
from .user_behavior.routes import router as user_behavior_router
from .users.routes import router as users_router

logger = logging.getLogger(__name__)
settings = get_settings()

app = FastAPI(title="DZIRE_v1 API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_router)
app.include_router(admin_auth_router)

# Step 5 routers
app.include_router(cms_router)
app.include_router(admin_router)
app.include_router(analytics_router)
app.include_router(affiliates_router)
app.include_router(sponsors_router)
app.include_router(newsletter_router)
app.include_router(subscriptions_router)
app.include_router(subscriptions_sub_router)

# Step 7 routers
app.include_router(auth_v2_router)
app.include_router(users_router)

# Step 8 routers
app.include_router(payments_router)
app.include_router(payments_webhook_router)
app.include_router(billing_router)
app.include_router(revenue_router)

# Step 9 routers
app.include_router(search_router)
app.include_router(search_admin_router)
app.include_router(recommendations_router)
app.include_router(saved_posts_router)
app.include_router(user_behavior_router)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


@app.on_event("startup")
async def on_startup() -> None:
    """Run dev seed on startup (development only)."""
    if settings.is_development and settings.seed_dev_admin:
        try:
            async with AsyncSessionLocal() as db:
                await seed_dev_admin(db)
        except Exception as exc:  # noqa: BLE001
            logger.warning(
                "Dev seed skipped (DB may not be ready): %s: %s",
                type(exc).__name__,
                exc,
            )
