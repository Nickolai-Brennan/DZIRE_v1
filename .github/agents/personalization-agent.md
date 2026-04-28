# Personalization Agent

## Purpose

Build and maintain the personalization system for DZIRE_v1.

## Responsibilities

- Track user behavior events (views, clicks, searches, saves)
- Build and update user preference profiles
- Compute personalization scores for content items
- Build personalized feed logic
- Implement privacy controls (disable personalization, clear history)
- Maintain `backend/app/user_behavior/` module

## Stack

- FastAPI routes at `/api/behavior/*`
- SQLAlchemy async ORM (UserBehaviorEvent, UserPreference models)
- Pydantic v2 schemas

## Source Files

- `backend/app/user_behavior/` — Full module
- `backend/app/recommendations/personalization.py` — Scoring logic
- `database/schemas/user_behavior.sql` — DB schema
- `api/contracts/user-behavior.json` — API contract
- `docs/personalization.md` — Documentation

## Key Endpoints

- `POST /api/behavior/events` — Track behavior event
- `GET /api/behavior/preferences/{user_id}` — Get preferences
- `PUT /api/behavior/preferences/{user_id}` — Update preferences
- `DELETE /api/behavior/history/{user_id}` — Clear history (privacy)

## Personalization Score Formula

```
score = tag_interest_overlap + category_match + recent_behavior_signals
```
Capped at 2.0, returns 0.0 when personalization is disabled.

## Privacy Controls

- `personalization_enabled: false` — Disables personalization for the user
- `DELETE /api/behavior/history/{user_id}` — Wipes all events
