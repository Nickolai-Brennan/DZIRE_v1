# Personalization — DZIRE_v1 Step 9

The personalization system tracks user behavior, builds preference profiles, and delivers personalized content feeds.

---

## How It Works

```
User Behavior Events
      ↓
User Preferences (aggregated)
      ↓
Personalization Score (per content item)
      ↓
Recommendation Engine (ranked feed)
```

---

## Behavior Event Types

| Event | Trigger |
|-------|---------|
| `post_view` | User views a post |
| `post_click` | User clicks a post link |
| `tag_click` | User clicks a tag |
| `category_click` | User clicks a category |
| `search` | User submits a search |
| `save_post` | User saves a post |
| `share_post` | User shares a post |
| `newsletter_click` | User clicks a newsletter link |
| `affiliate_click` | User clicks an affiliate link |
| `vip_click` | User clicks VIP content |
| `time_on_page` | Dwell time recorded |
| `scroll_depth` | Scroll percentage recorded |

Track events via:
```
POST /api/behavior/events
```

---

## User Preferences

Preferences are aggregated per user and stored in `user_preferences`:

| Field | Description |
|-------|-------------|
| `favorite_categories` | Categories the user engages with most |
| `favorite_tags` | Tags the user clicks most |
| `preferred_content_types` | e.g. `blog_article`, `review` |
| `blocked_tags` | Tags the user wants excluded |
| `vip_interest_score` | Score for VIP content interest |
| `personalization_enabled` | Privacy toggle |

Manage preferences via:
```
GET  /api/behavior/preferences/{user_id}
PUT  /api/behavior/preferences/{user_id}
```

---

## Personalization Score

The `personalization_score` [0–2] is computed per content item for a specific user:

1. Tag interest overlap with `favorite_tags`
2. Category match against `favorite_categories`
3. Recent behavior signal boost (last 14 days)

See `backend/app/recommendations/personalization.py`.

---

## Privacy Controls

| Action | Endpoint |
|--------|----------|
| Disable personalization | `PUT /api/behavior/preferences/{user_id}` with `personalization_enabled: false` |
| Clear behavior history | `DELETE /api/behavior/history/{user_id}` |
| View saved posts | `GET /api/saved-posts?user_id=uuid` |
| Remove saved post | `POST /api/saved-posts/remove` |

---

## Database Schema

See `database/schemas/user_behavior.sql`.

Key tables:
- `user_behavior_events` — Raw event stream per user/session
- `user_preferences` — Aggregated preference profile per user

---

## Data Retention

| Data | Policy |
|------|--------|
| Search query logs | Retained indefinitely (admin configurable) |
| Behavior events | Aggregated; user can clear via privacy control |
| User preferences | User-controlled |
| Anonymous events | Session-scoped, no user_id |
