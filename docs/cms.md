# CMS Documentation

## Overview

The DZIRE CMS (Content Management System) powers all published content including blog articles, guides, reviews, sponsor posts, affiliate product spotlights, VIP-only content, and social embed roundups.

## Content Types

| Type | Description |
|------|-------------|
| `blog_article` | Standard blog post |
| `editorial` | Long-form editorial piece |
| `review` | Product or service review |
| `guide` | How-to or instructional guide |
| `news_post` | Breaking news or announcement |
| `sponsor_post` | Sponsored content |
| `affiliate_post` | Affiliate product spotlight |
| `vip_post` | VIP-only exclusive content |
| `social_embed_post` | Curated social media embeds |
| `newsletter_feature` | Newsletter feature article |
| `landing_page` | Campaign landing page |

## Post Status

| Status | Description |
|--------|-------------|
| `draft` | Work in progress, not visible publicly |
| `scheduled` | Queued to publish at a future date |
| `published` | Live and publicly accessible |
| `archived` | Hidden from public but retained |

## Post Visibility

| Visibility | Description |
|------------|-------------|
| `public` | Visible to all visitors |
| `members` | Registered members only |
| `vip` | VIP subscribers only |
| `private` | Admin access only |

## Database Tables

- `cms_posts` — Core post content and metadata
- `cms_categories` — Post categories (hierarchical)
- `cms_tags` — Post tags
- `cms_post_tags` — Many-to-many post ↔ tag junction
- `cms_authors` — Author profiles
- `cms_media` — Uploaded media assets
- `cms_social_embeds` — Embedded social media posts

## Backend Modules

- `backend/app/cms/models.py` — SQLAlchemy ORM models
- `backend/app/cms/schemas.py` — Pydantic request/response schemas
- `backend/app/cms/routes.py` — Public API routes (`/api/posts`, `/api/categories`, `/api/tags`, `/api/media`)
- `backend/app/cms/services.py` — DB query functions
- `backend/app/cms/seo.py` — SEO scoring utilities

## Public API Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/posts` | List published posts |
| GET | `/api/posts/{slug}` | Get post by slug |
| GET | `/api/categories` | List categories |
| GET | `/api/tags` | List tags |
| GET | `/api/media` | List media |

## SEO Fields

Each post supports:
- `seo_title` — Custom page title for search engines
- `seo_description` — Meta description (160 chars recommended)
- `keywords` — Array of target keywords

## Social Embed System

Supported platforms: X/Twitter, Instagram, TikTok, YouTube, Reddit, Bluesky, Facebook, Threads.

Each embed tracks: platform, embed URL, embed code, caption, click count, display location, and status.
