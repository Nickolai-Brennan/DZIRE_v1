"""backend/app/admin/routes.py — Admin dashboard API routes."""

from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..cms import services as cms_services
from ..cms.schemas import PostCreate, PostRead, PostUpdate
from ..core.database import get_db
from ..models.admin_user import AdminUser
from . import services
from .permissions import (require_role_analyst, require_role_any_admin,
                          require_role_content, require_role_marketing,
                          require_role_sponsor)

router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.get("/dashboard")
async def dashboard(
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(require_role_any_admin),
) -> dict:
    stats = await services.get_dashboard_stats(db)
    return {"status": "ok", "admin": admin.username, "stats": stats}


@router.get("/content")
async def content_list(
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(require_role_content),
) -> dict:
    posts = await cms_services.list_all_posts(db)
    return {"posts": [PostRead.model_validate(p) for p in posts]}


@router.post("/content", response_model=PostRead)
async def content_create(
    body: PostCreate,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(require_role_content),
) -> PostRead:
    post = await cms_services.create_post(db, body)
    return PostRead.model_validate(post)


@router.patch("/content/{post_id}", response_model=PostRead)
async def content_update(
    post_id: UUID,
    body: PostUpdate,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(require_role_content),
) -> PostRead:
    post = await cms_services.update_post(db, post_id, body)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found"
        )
    return PostRead.model_validate(post)


@router.delete("/content/{post_id}", status_code=204)
async def content_delete(
    post_id: UUID,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(require_role_content),
) -> None:
    deleted = await cms_services.delete_post(db, post_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found"
        )


@router.get("/seo")
async def seo_dashboard(
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(require_role_analyst),
) -> dict:
    return {"message": "SEO dashboard data", "reports": []}


@router.get("/marketing")
async def marketing_dashboard(
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(require_role_marketing),
) -> dict:
    return {"message": "Marketing dashboard data"}


@router.get("/advertising")
async def advertising_dashboard(
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(require_role_sponsor),
) -> dict:
    return {"message": "Advertising dashboard data"}


@router.get("/social")
async def social_dashboard(
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(require_role_marketing),
) -> dict:
    return {"message": "Social media stats"}


@router.get("/affiliates")
async def affiliates_dashboard(
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(require_role_sponsor),
) -> dict:
    return {"message": "Affiliate management data"}


@router.get("/sponsors")
async def sponsors_dashboard(
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(require_role_sponsor),
) -> dict:
    return {"message": "Sponsor management data"}


@router.get("/newsletter")
async def newsletter_dashboard(
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(require_role_marketing),
) -> dict:
    return {"message": "Newsletter management data"}


@router.get("/vip")
async def vip_dashboard(
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(require_role_any_admin),
) -> dict:
    return {"message": "VIP subscription management data"}
