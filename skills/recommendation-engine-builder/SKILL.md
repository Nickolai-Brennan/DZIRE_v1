---
name: recommendation-engine-builder
description: Build and extend the recommendation engine. Use when adding related posts, trending, personalized feeds, or saved posts.
category: build
step: 9
version: v1.0
inputs:
  - user request
  - existing backend/app/recommendations/ structure
  - database/schemas/recommendations.sql
  - api/contracts/recommendations.json
outputs:
  - Recommendation routes and services
  - Scoring logic
  - Saved posts system
  - Frontend recommendation components
---

# Recommendation Engine Builder Skill

## Purpose
Build and extend the recommendation engine for DZIRE_v1 — related posts, trending, personalized feeds, and saved post collections.

## When To Use
- Add new recommendation types (popular_in_category, more_from_author, etc.)
- Update recommendation scoring weights
- Build saved post collections
- Build frontend recommendation components
- Add admin recommendation analytics

## Source Structure

```
backend/app/recommendations/
├── models.py         — Recommendation, SavedPost ORM models
├── schemas.py        — Pydantic schemas
├── routes.py         — FastAPI route handlers
├── services.py       — Business logic (related, trending, for-you, saved posts)
├── scoring.py        — Recommendation score computation
└── personalization.py — User-specific personalization score
```

## Scoring Formula

```
score = tag_overlap*0.5 + category_match + keyword_similarity + popularity + recency + user_interest
```

## Conventions
- Register routers in `backend/app/main.py` under `# Step 9 routers`
- See `docs/recommendations.md` for full documentation
