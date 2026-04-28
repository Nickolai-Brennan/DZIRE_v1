# Recommendations — DZIRE_v1 Step 9

The recommendation engine delivers related posts, trending content, personalized recommendations, and saved post management.

---

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/recommendations/related/{content_id}` | Related posts for a content item |
| GET | `/api/recommendations/trending` | Trending posts by engagement |
| GET | `/api/recommendations/for-you/{user_id}` | Personalized feed for a user |
| GET | `/api/saved-posts` | List saved posts (query: `user_id`, `collection_name`) |
| POST | `/api/saved-posts/add` | Save a post to a collection |
| POST | `/api/saved-posts/remove` | Remove a saved post |
| GET | `/api/saved-posts/collections` | List collection names for a user |

---

## Recommendation Types

| Type | Description |
|------|-------------|
| `related` | Posts with overlapping tags/category |
| `trending` | High-engagement posts in the past N days |
| `recommended_for_you` | Personalized using user preferences and behavior |
| `continue_reading` | Posts started but not finished (client-side tracking) |
| `popular_in_category` | Top posts in the same category |
| `more_from_author` | Other posts from the same author |

---

## Scoring Formula

```
recommendation_score =
    tag_overlap (capped at 3) * 0.5
    + category_match * 1.0
    + keyword_similarity (0–1)
    + popularity (0–1, log-normalised)
    + recency (0–1, decay over 180 days)
    + user_interest (0–2)
```

See `backend/app/recommendations/scoring.py`.

---

## Saved Posts

Users can save posts to named collections:

```json
POST /api/saved-posts/add
{
  "user_id": "uuid",
  "post_id": "uuid",
  "collection_name": "favorites"
}
```

```json
POST /api/saved-posts/remove
{
  "user_id": "uuid",
  "post_id": "uuid",
  "collection_name": "favorites"
}
```

```
GET /api/saved-posts?user_id=uuid&collection_name=favorites
GET /api/saved-posts/collections?user_id=uuid
```

---

## Database Schema

See `database/schemas/recommendations.sql`.

Key tables:
- `recommendations` — Stored recommendation records with click/dismiss tracking
- `saved_posts` — User-saved posts with collection grouping

---

## Frontend Components

| Component | Location |
|-----------|----------|
| `RelatedPosts` | `frontend/src/components/recommendations/RelatedPosts.tsx` |
| `TrendingNow` | `frontend/src/components/recommendations/TrendingNow.tsx` |
| `RecommendedPosts` | `frontend/src/components/recommendations/RecommendedPosts.tsx` |
| `PersonalizedFeed` | `frontend/src/components/recommendations/PersonalizedFeed.tsx` |
| `ContinueReading` | `frontend/src/components/recommendations/ContinueReading.tsx` |
