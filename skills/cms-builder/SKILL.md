---
name: cms-builder
description: Build and extend the CMS — models, routes, schemas, services, and content templates. Use when adding new content types, post fields, categories, tags, media handling, or social embed support.
category: build
version: v1.0
inputs:
  - user request
  - existing CMS structure in backend/app/cms/
  - database/schemas/cms.sql
outputs:
  - SQLAlchemy models
  - Pydantic schemas
  - FastAPI routes
  - Service functions
  - SQL schema updates
---

# CMS Builder Skill

## Purpose

Build and extend the DZIRE CMS (Content Management System). Handles blog posts, articles, reviews, guides, and all other content types.

## When To Use

Use this skill when the user asks to:
- Add a new content type
- Add fields to the post model
- Create category or tag management endpoints
- Build social embed support
- Add media upload handling
- Extend CMS routes or services

## Stack

- Backend: FastAPI + SQLAlchemy (async) + PostgreSQL (MotherDuck)
- Schemas: Pydantic v2
- ORM: SQLAlchemy 2.x with `Mapped` annotations

## Workflow

1. Check existing models in `backend/app/cms/models.py`
2. Update SQL schema in `database/schemas/cms.sql`
3. Update or add SQLAlchemy models
4. Add Pydantic schemas in `backend/app/cms/schemas.py`
5. Add service functions in `backend/app/cms/services.py`
6. Add/update routes in `backend/app/cms/routes.py` or `backend/app/admin/routes.py`
7. Confirm router is included in `backend/app/main.py`

## Key Files

- `backend/app/cms/models.py`
- `backend/app/cms/schemas.py`
- `backend/app/cms/routes.py`
- `backend/app/cms/services.py`
- `backend/app/cms/seo.py`
- `database/schemas/cms.sql`

## Content Types

blog_article, editorial, review, guide, news_post, sponsor_post, affiliate_post, vip_post, social_embed_post, newsletter_feature, landing_page

## Rules

- Never duplicate existing models — check before adding
- Use `UUID` primary keys via `gen_random_uuid()` in SQL and `uuid.uuid4` in Python
- All timestamps use `TIMESTAMPTZ` (Postgres) / `DateTime(timezone=True)` (SQLAlchemy)
- Use `ARRAY(Text)` for keyword arrays, `JSONB` for flexible metadata
