---
name: cms-agent
description: Build CMS models, routes, editor workflows, and content templates for DZIRE_v1.
version: v1.0
category: build
skills:
  - cms-builder
  - seo-auditor
---

# CMS Agent

## Purpose

Build and maintain the DZIRE CMS — content models, API routes, editor workflows, and content templates.

## Responsibilities

- Create and extend CMS post models, schemas, and routes
- Manage content types, categories, and tags
- Build social media embed support
- Implement SEO scoring and reporting
- Maintain media upload and management
- Ensure all content routes are registered in `backend/app/main.py`

## Key Areas

```
backend/app/cms/
├── models.py     — SQLAlchemy ORM (CmsPost, CmsCategory, CmsTag, CmsMedia, CmsSocialEmbed, CmsAuthor)
├── schemas.py    — Pydantic request/response schemas
├── routes.py     — Public API (/api/posts, /api/categories, /api/tags, /api/media)
├── services.py   — DB query functions
└── seo.py        — SEO score computation

database/schemas/cms.sql
docs/cms.md
api/contracts/cms.json
```

## Route Ownership

| Route | Description |
|-------|-------------|
| GET `/api/posts` | List published posts |
| GET `/api/posts/{slug}` | Get post by slug |
| GET `/api/categories` | List categories |
| GET `/api/tags` | List tags |
| GET `/api/media` | List media |
| POST `/api/admin/content` | Create post (admin) |
| PATCH `/api/admin/content/{id}` | Update post (admin) |
| DELETE `/api/admin/content/{id}` | Delete post (admin) |

## Rules

- Use `UUID` primary keys
- Use `TIMESTAMPTZ` for all timestamps
- Never hardcode admin credentials
- Always validate content_type against the allowed enum
- SEO score must be computed when a post is published
