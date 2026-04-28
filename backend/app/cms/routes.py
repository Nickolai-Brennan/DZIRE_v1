"""backend/app/cms/routes.py — Public CMS API routes."""

from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.database import get_db
from . import services
from .schemas import (CategoryCreate, CategoryRead, MediaRead, PostRead,
                      SocialEmbedCreate, SocialEmbedRead, TagCreate, TagRead)

router = APIRouter(prefix="/api", tags=["cms"])


@router.get("/posts", response_model=list[PostRead])
async def list_posts(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
) -> list[PostRead]:
    posts = await services.list_published_posts(db, skip=skip, limit=limit)
    return [PostRead.model_validate(p) for p in posts]


@router.get("/posts/{slug}", response_model=PostRead)
async def get_post(slug: str, db: AsyncSession = Depends(get_db)) -> PostRead:
    post = await services.get_post_by_slug(db, slug)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found"
        )
    return PostRead.model_validate(post)


@router.get("/categories", response_model=list[CategoryRead])
async def list_categories(db: AsyncSession = Depends(get_db)) -> list[CategoryRead]:
    cats = await services.list_categories(db)
    return [CategoryRead.model_validate(c) for c in cats]


@router.get("/tags", response_model=list[TagRead])
async def list_tags(db: AsyncSession = Depends(get_db)) -> list[TagRead]:
    tags = await services.list_tags(db)
    return [TagRead.model_validate(t) for t in tags]


@router.get("/media", response_model=list[MediaRead])
async def list_media(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
) -> list[MediaRead]:
    media = await services.list_media(db, skip=skip, limit=limit)
    return [MediaRead.model_validate(m) for m in media]
