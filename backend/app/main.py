"""DZIRE_v1 — FastAPI application entry point."""
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.routes.admin_auth import router as admin_auth_router
from .core.config import get_settings
from .core.database import AsyncSessionLocal
from .routes.auth import router as auth_router
from .seed.dev_admin import seed_dev_admin

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
            logger.warning("Dev seed skipped (DB may not be ready): %s", exc)
