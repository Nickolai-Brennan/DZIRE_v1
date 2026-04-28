# Search Agent

## Purpose

Build and maintain the search system for DZIRE_v1.

## Responsibilities

- Build search index (populate/refresh `search_index` from CMS posts)
- Implement search ranking logic (`ranking.py`)
- Create search filters and sort options
- Build search autocomplete/suggestions
- Implement admin search analytics
- Maintain `backend/app/search/` module
- Coordinate with frontend on search UI components

## Stack

- FastAPI routes at `/api/search/*`
- SQLAlchemy async ORM (SearchIndex, SearchQueryLog models)
- Pydantic v2 schemas

## Source Files

- `backend/app/search/` — Full module
- `database/schemas/search.sql` — DB schema
- `api/contracts/search.json` — API contract
- `docs/search.md` — Documentation

## Key Endpoints

- `GET /api/search` — Basic search
- `POST /api/search/advanced` — Advanced search
- `GET /api/search/suggestions` — Autocomplete
- `GET /api/search/trending` — Trending queries
- `GET /api/admin/search-analytics` — Admin insights

## Ranking Formula

```
score = title_match*3 + tag_match*2 + category_match*1.5 + recency + popularity + personalization
```
