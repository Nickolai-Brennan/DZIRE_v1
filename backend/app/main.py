"""DZIRE_v1 — FastAPI application entry point."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import get_settings
from .routes.auth import router as auth_router

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


@app.get(f"{settings.api_prefix}/health")
async def health() -> dict:
    return {"status": "ok"}
