"""backend/app/social_integrations/routes.py — FastAPI routes for Social Integrations."""

from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.database import get_db
from . import services
from .schemas import (PublishPostPayload, SchedulePostPayload,
                      SocialAccountCreate, SocialAccountRead,
                      SocialAccountUpdate, SocialPostCreate, SocialPostRead,
                      SocialPostUpdate, SocialSizeChartCreate,
                      SocialSizeChartRead, WebhookPayload)

router = APIRouter(prefix="/api/social", tags=["social"])
size_chart_router = APIRouter(
    prefix="/api/social-size-chart", tags=["social-size-chart"]
)


# ── Accounts ──────────────────────────────────────────────────────────────────


@router.get("/accounts", response_model=list[SocialAccountRead])
async def list_accounts(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
) -> list[SocialAccountRead]:
    accounts = await services.list_accounts(db, skip=skip, limit=limit)
    return [SocialAccountRead.model_validate(a) for a in accounts]


@router.post(
    "/accounts", response_model=SocialAccountRead, status_code=status.HTTP_201_CREATED
)
async def create_account(
    payload: SocialAccountCreate, db: AsyncSession = Depends(get_db)
) -> SocialAccountRead:
    account = await services.create_account(db, payload)
    return SocialAccountRead.model_validate(account)


@router.get("/accounts/{account_id}", response_model=SocialAccountRead)
async def get_account(
    account_id: UUID, db: AsyncSession = Depends(get_db)
) -> SocialAccountRead:
    account = await services.get_account(db, account_id)
    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Account not found"
        )
    return SocialAccountRead.model_validate(account)


@router.put("/accounts/{account_id}", response_model=SocialAccountRead)
async def update_account(
    account_id: UUID, payload: SocialAccountUpdate, db: AsyncSession = Depends(get_db)
) -> SocialAccountRead:
    account = await services.update_account(db, account_id, payload)
    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Account not found"
        )
    return SocialAccountRead.model_validate(account)


@router.delete("/accounts/{account_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_account(account_id: UUID, db: AsyncSession = Depends(get_db)) -> None:
    deleted = await services.delete_account(db, account_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Account not found"
        )


# ── Posts ─────────────────────────────────────────────────────────────────────


@router.get("/posts", response_model=list[SocialPostRead])
async def list_posts(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
) -> list[SocialPostRead]:
    posts = await services.list_posts(db, skip=skip, limit=limit)
    return [SocialPostRead.model_validate(p) for p in posts]


@router.post(
    "/posts", response_model=SocialPostRead, status_code=status.HTTP_201_CREATED
)
async def create_post(
    payload: SocialPostCreate, db: AsyncSession = Depends(get_db)
) -> SocialPostRead:
    post = await services.create_post(db, payload)
    return SocialPostRead.model_validate(post)


@router.get("/posts/{post_id}", response_model=SocialPostRead)
async def get_post(post_id: UUID, db: AsyncSession = Depends(get_db)) -> SocialPostRead:
    post = await services.get_post(db, post_id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found"
        )
    return SocialPostRead.model_validate(post)


@router.put("/posts/{post_id}", response_model=SocialPostRead)
async def update_post(
    post_id: UUID, payload: SocialPostUpdate, db: AsyncSession = Depends(get_db)
) -> SocialPostRead:
    post = await services.update_post(db, post_id, payload)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found"
        )
    return SocialPostRead.model_validate(post)


@router.delete("/posts/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(post_id: UUID, db: AsyncSession = Depends(get_db)) -> None:
    deleted = await services.delete_post(db, post_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found"
        )


@router.post("/posts/schedule", response_model=SocialPostRead)
async def schedule_post(
    payload: SchedulePostPayload, db: AsyncSession = Depends(get_db)
) -> SocialPostRead:
    post = await services.schedule_post(db, payload.post_id, payload.scheduled_at)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found"
        )
    return SocialPostRead.model_validate(post)


@router.post("/posts/publish", response_model=SocialPostRead)
async def publish_post(
    payload: PublishPostPayload, db: AsyncSession = Depends(get_db)
) -> SocialPostRead:
    post = await services.publish_post(db, payload.post_id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found"
        )
    return SocialPostRead.model_validate(post)


@router.get("/metrics")
async def get_aggregate_metrics(db: AsyncSession = Depends(get_db)) -> dict:
    """Return platform-level aggregated metrics across all posts."""
    from sqlalchemy import func, select

    from .models import SocialPost

    result = await db.execute(
        select(
            SocialPost.platform,
            func.sum(SocialPost.impressions),
            func.sum(SocialPost.clicks),
            func.sum(SocialPost.likes),
            func.sum(SocialPost.comments),
            func.sum(SocialPost.shares),
        ).group_by(SocialPost.platform)
    )
    rows = result.all()
    return {
        "platforms": [
            {
                "platform": row[0],
                "impressions": row[1] or 0,
                "clicks": row[2] or 0,
                "likes": row[3] or 0,
                "comments": row[4] or 0,
                "shares": row[5] or 0,
            }
            for row in rows
        ]
    }


@router.post("/webhooks", status_code=status.HTTP_200_OK)
async def handle_webhook(payload: WebhookPayload) -> dict:
    """Receive incoming webhook events from social platforms."""
    return {"received": True, "platform": payload.platform, "event": payload.event_type}


# ── Size Chart ────────────────────────────────────────────────────────────────


@size_chart_router.get("", response_model=list[SocialSizeChartRead])
async def list_size_charts(
    skip: int = Query(0, ge=0),
    limit: int = Query(200, ge=1, le=500),
    db: AsyncSession = Depends(get_db),
) -> list[SocialSizeChartRead]:
    entries = await services.list_size_charts(db, skip=skip, limit=limit)
    return [SocialSizeChartRead.model_validate(e) for e in entries]


@size_chart_router.post(
    "", response_model=SocialSizeChartRead, status_code=status.HTTP_201_CREATED
)
async def create_size_chart(
    payload: SocialSizeChartCreate, db: AsyncSession = Depends(get_db)
) -> SocialSizeChartRead:
    entry = await services.create_size_chart(db, payload)
    return SocialSizeChartRead.model_validate(entry)


@size_chart_router.get("/platforms")
async def list_platforms(db: AsyncSession = Depends(get_db)) -> list[str]:
    return await services.list_platforms(db)


@size_chart_router.get("/assets")
async def list_asset_types(db: AsyncSession = Depends(get_db)) -> list[str]:
    return await services.list_asset_types(db)
