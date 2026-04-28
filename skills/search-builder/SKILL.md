---
name: search-builder
description: Build and extend the search system. Use when adding search routes, indexing, ranking, filters, or search analytics.
category: build
step: 9
version: v1.0
inputs:
  - user request
  - existing backend/app/search/ structure
  - database/schemas/search.sql
  - api/contracts/search.json
outputs:
  - Search routes (backend/app/search/routes.py)
  - Search services (backend/app/search/services.py)
  - Search indexing (backend/app/search/indexing.py)
  - Search ranking (backend/app/search/ranking.py)
  - Frontend search components
---

# Search Builder Skill

## Purpose
Build and extend the search and discovery system for DZIRE_v1.

## When To Use
- Add new search filters or sort options
- Update search ranking weights
- Rebuild or update the search index
- Add search analytics or admin insights
- Build search UI components (SearchBar, SearchResults, SearchFilters)

## Source Structure

```
backend/app/search/
├── models.py      — SearchIndex, SearchQueryLog ORM models
├── schemas.py     — Pydantic request/response schemas
├── routes.py      — FastAPI route handlers
├── services.py    — Business logic
├── indexing.py    — Index population and refresh
└── ranking.py     — Weighted ranking score computation
```

## Ranking Formula

```
score = title_match*3 + tag_match*2 + category_match*1.5 + recency + popularity + seo_score + personalization
```

## Conventions
- Follow existing FastAPI + SQLAlchemy async patterns
- Use Pydantic v2 `model_validate()` for ORM → schema conversion
- Register router in `backend/app/main.py` under `# Step 9 routers`
- See `docs/search.md` for full documentation
