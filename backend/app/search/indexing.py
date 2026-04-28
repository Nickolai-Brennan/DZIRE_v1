"""backend/app/search/indexing.py — SearchIndex population and refresh."""

from __future__ import annotations

import uuid
from typing import Any

from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession

from ..cms.models import CmsPost
from .models import SearchIndex


async def index_post(db: AsyncSession, post: CmsPost) -> SearchIndex:
    """Insert or update a SearchIndex entry for a CMS post."""
    result = await db.execute(
        select(SearchIndex).where(
            SearchIndex.content_id == post.id,
            SearchIndex.content_type == "post",
        )
    )
    entry: SearchIndex | None = result.scalar_one_or_none()

    # Build flat text for body
    body_text = (post.body_content or "")[:5000]

    # Collect tags via raw join to avoid lazy-load issues
    tags_result = await db.execute(
        text(
            "SELECT t.name FROM cms_tags t "
            "JOIN cms_post_tags pt ON pt.tag_id = t.id "
            "WHERE pt.post_id = :post_id"
        ),
        {"post_id": str(post.id)},
    )
    tags = [row[0] for row in tags_result.fetchall()]

    category_name: str | None = None
    if post.category:
        category_name = post.category.name  # type: ignore[attr-defined]

    author_name: str | None = None
    if post.author:
        author_name = post.author.name  # type: ignore[attr-defined]

    if entry is None:
        entry = SearchIndex(
            id=uuid.uuid4(),
            content_id=post.id,
            content_type="post",
        )
        db.add(entry)

    entry.title = post.title
    entry.slug = post.slug
    entry.excerpt = post.excerpt
    entry.body_text = body_text
    entry.category = category_name
    entry.tags = tags
    entry.author = author_name
    entry.visibility = post.visibility
    entry.is_vip_only = post.is_vip_only
    entry.seo_keywords = post.keywords or []
    entry.published_at = post.published_at

    await db.commit()
    await db.refresh(entry)
    return entry


async def rebuild_index(db: AsyncSession) -> int:
    """Rebuild the full search index from all published CMS posts."""
    result = await db.execute(
        select(CmsPost).where(CmsPost.status == "published")
    )
    posts = result.scalars().all()
    count = 0
    for post in posts:
        await index_post(db, post)
        count += 1
    return count
