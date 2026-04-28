# Recommendation Agent

## Purpose

Build and maintain the recommendation engine for DZIRE_v1.

## Responsibilities

- Compute recommendation scores for related, trending, and personalized content
- Build saved posts system with collection support
- Implement recommendation types: related, trending, recommended_for_you, continue_reading, popular_in_category, more_from_author
- Track recommendation impressions, clicks, and dismissals
- Maintain `backend/app/recommendations/` module

## Stack

- FastAPI routes at `/api/recommendations/*` and `/api/saved-posts/*`
- SQLAlchemy async ORM (Recommendation, SavedPost models)
- Pydantic v2 schemas

## Source Files

- `backend/app/recommendations/` — Full module
- `database/schemas/recommendations.sql` — DB schema
- `api/contracts/recommendations.json` — API contract
- `docs/recommendations.md` — Documentation

## Key Endpoints

- `GET /api/recommendations/related/{content_id}` — Related posts
- `GET /api/recommendations/trending` — Trending posts
- `GET /api/recommendations/for-you/{user_id}` — Personalized feed
- `GET /api/saved-posts` — Saved posts list
- `POST /api/saved-posts/add` — Save a post
- `POST /api/saved-posts/remove` — Remove saved post

## Scoring Formula

```
score = tag_overlap*0.5 + category_match + keyword_similarity + popularity + recency + user_interest
```
