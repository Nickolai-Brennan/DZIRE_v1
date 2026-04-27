"""DZIRE_v1 — FastAPI application entry point (placeholder)."""
from fastapi import FastAPI

app = FastAPI(title="DZIRE_v1 API", version="0.1.0")


@app.get("/api/v1/health")
async def health():
    return {"status": "ok"}
