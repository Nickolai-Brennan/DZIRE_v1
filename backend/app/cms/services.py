"""backend/app/cms/services.py — Business logic for CMS."""

from __future__ import annotations

from typing import Optional
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import CmsCategory, CmsMedia, CmsPost, CmsSocialEmbed, CmsTag
from .schemas import (CategoryCreate, PostCreate, PostUpdate,
                      SocialEmbedCreate, TagCreate)

# ── Posts ────────────────────────────────────────────────────────────────────


async def list_published_posts(
    db: AsyncSession, skip: int = 0, limit: int = 20
) -> list[CmsPost]:
    result = await db.execute(
        select(CmsPost)
        .where(CmsPost.status == "published", CmsPost.visibility == "public")
        .order_by(CmsPost.published_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return list(result.scalars().all())


async def get_post_by_slug(db: AsyncSession, slug: str) -> Optional[CmsPost]:
    result = await db.execute(select(CmsPost).where(CmsPost.slug == slug))
    return result.scalar_one_or_none()


async def list_all_posts(
    db: AsyncSession, skip: int = 0, limit: int = 50
) -> list[CmsPost]:
    result = await db.execute(
        select(CmsPost).order_by(CmsPost.created_at.desc()).offset(skip).limit(limit)
    )
    return list(result.scalars().all())


async def create_post(db: AsyncSession, data: PostCreate) -> CmsPost:
    post = CmsPost(**data.model_dump())
    db.add(post)
    await db.commit()
    await db.refresh(post)
    return post


async def update_post(
    db: AsyncSession, post_id: UUID, data: PostUpdate
) -> Optional[CmsPost]:
    result = await db.execute(select(CmsPost).where(CmsPost.id == post_id))
    post = result.scalar_one_or_none()
    if not post:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(post, field, value)
    await db.commit()
    await db.refresh(post)
    return post


async def delete_post(db: AsyncSession, post_id: UUID) -> bool:
    result = await db.execute(select(CmsPost).where(CmsPost.id == post_id))
    post = result.scalar_one_or_none()
    if not post:
        return False
    await db.delete(post)
    await db.commit()
    return True


# ── Categories ───────────────────────────────────────────────────────────────


async def list_categories(db: AsyncSession) -> list[CmsCategory]:
    result = await db.execute(select(CmsCategory).order_by(CmsCategory.name))
    return list(result.scalars().all())


async def create_category(db: AsyncSession, data: CategoryCreate) -> CmsCategory:
    cat = CmsCategory(**data.model_dump())
    db.add(cat)
    await db.commit()
    await db.refresh(cat)
    return cat


# ── Tags ─────────────────────────────────────────────────────────────────────


async def list_tags(db: AsyncSession) -> list[CmsTag]:
    result = await db.execute(select(CmsTag).order_by(CmsTag.name))
    return list(result.scalars().all())


async def create_tag(db: AsyncSession, data: TagCreate) -> CmsTag:
    tag = CmsTag(**data.model_dump())
    db.add(tag)
    await db.commit()
    await db.refresh(tag)
    return tag


# ── Media ─────────────────────────────────────────────────────────────────────


async def list_media(
    db: AsyncSession, skip: int = 0, limit: int = 50
) -> list[CmsMedia]:
    result = await db.execute(
        select(CmsMedia).order_by(CmsMedia.created_at.desc()).offset(skip).limit(limit)
    )
    return list(result.scalars().all())


# ── Social Embeds ─────────────────────────────────────────────────────────────


async def list_social_embeds(db: AsyncSession) -> list[CmsSocialEmbed]:
    result = await db.execute(
        select(CmsSocialEmbed).order_by(CmsSocialEmbed.created_at.desc())
    )
    return list(result.scalars().all())


async def create_social_embed(
    db: AsyncSession, data: SocialEmbedCreate
) -> CmsSocialEmbed:
    embed = CmsSocialEmbed(**data.model_dump())
    db.add(embed)
    await db.commit()
    await db.refresh(embed)
    return embed
