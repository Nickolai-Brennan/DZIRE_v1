---
name: personalization-builder
description: Build and extend the personalization system. Use when adding behavior tracking, user preferences, personalized feeds, or privacy controls.
category: build
step: 9
version: v1.0
inputs:
  - user request
  - existing backend/app/user_behavior/ structure
  - database/schemas/user_behavior.sql
  - api/contracts/user-behavior.json
outputs:
  - Behavior tracking routes and services
  - User preference management
  - Personalization scoring
  - Privacy controls
---

# Personalization Builder Skill

## Purpose
Build and extend the personalization and behavior tracking system for DZIRE_v1.

## When To Use
- Add new behavior event types
- Update preference aggregation logic
- Build personalization score improvements
- Add privacy controls (disable personalization, clear history)
- Build personalized feed UI components

## Source Structure

```
backend/app/user_behavior/
├── models.py    — UserBehaviorEvent, UserPreference ORM models
├── routes.py    — FastAPI route handlers
└── services.py  — Business logic

backend/app/recommendations/
└── personalization.py  — Personalization score computation
```

## Behavior Event Types

```
post_view, post_click, tag_click, category_click, search,
save_post, share_post, newsletter_click, affiliate_click,
vip_click, time_on_page, scroll_depth
```

## Privacy

- `PUT /api/behavior/preferences/{user_id}` with `personalization_enabled: false` disables personalization
- `DELETE /api/behavior/history/{user_id}` wipes all events

## Conventions
- Register router in `backend/app/main.py` under `# Step 9 routers`
- See `docs/personalization.md` for full documentation
