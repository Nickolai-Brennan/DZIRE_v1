# Search — DZIRE_v1 Step 9

The search system provides full-text keyword search, advanced filters, autocomplete suggestions, trending queries, and admin analytics.

---

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/search` | Basic keyword search |
| POST | `/api/search/advanced` | Advanced search with date range + extra filters |
| GET | `/api/search/suggestions` | Autocomplete suggestions |
| GET | `/api/search/trending` | Trending search queries |
| GET | `/api/search/tags` | Searchable tag list |
| GET | `/api/search/categories` | Searchable category list |
| GET | `/api/admin/search-analytics` | Admin search analytics (admin auth) |

---

## Basic Search

```
GET /api/search?q=wellness&sort_by=newest&limit=20
```

**Query Parameters**

| Param | Type | Description |
|-------|------|-------------|
| `q` | string (required) | Search query |
| `content_type` | string | Filter by content type (post, page, etc.) |
| `category` | string | Filter by category name |
| `sort_by` | string | `relevance` (default), `newest`, `oldest`, `most_viewed`, `most_clicked` |
| `is_vip_only` | boolean | Filter to VIP-only content |
| `skip` | integer | Pagination offset (default 0) |
| `limit` | integer | Page size 1–100 (default 20) |

**Response**

```json
{
  "query": "wellness",
  "total": 42,
  "items": [
    {
      "id": "uuid",
      "content_id": "uuid",
      "content_type": "post",
      "title": "...",
      "slug": "...",
      "excerpt": "...",
      "category": "Health",
      "tags": ["wellness", "lifestyle"],
      "author": "Jane Doe",
      "is_vip_only": false,
      "published_at": "2025-01-01T00:00:00Z",
      "ranking_score": 5.23
    }
  ],
  "skip": 0,
  "limit": 20
}
```

---

## Advanced Search

```
POST /api/search/advanced
Content-Type: application/json

{
  "query": "fitness",
  "category": "Health",
  "date_from": "2025-01-01T00:00:00Z",
  "date_to": "2025-12-31T00:00:00Z",
  "sort_by": "relevance",
  "limit": 20,
  "skip": 0
}
```

---

## Search Index

The `search_index` table is populated by the indexing service (`backend/app/search/indexing.py`).

- Call `rebuild_index(db)` to reindex all published posts.
- Call `index_post(db, post)` to index/update a single post.

Hook this into your CMS post publish webhook or background task runner.

---

## Ranking Logic

```
ranking_score =
    title_match * 3.0
    + tag_match * 2.0
    + category_match * 1.5
    + recency (0–1, decays over 365 days)
    + popularity (0–1, log-normalised view+click)
    + seo_score (0–1)
    + personalization_score (0–2)
```

See `backend/app/search/ranking.py` for implementation.

---

## Admin Analytics

```
GET /api/admin/search-analytics
```

Returns:
- Top 10 search queries (last 30 days)
- Zero-result queries (last 30 days)
- Total searches in last 7 and 30 days

---

## Database Schema

See `database/schemas/search.sql`.

Key tables:
- `search_index` — Denormalized content index
- `search_query_logs` — Every search query for analytics and suggestions

---

## Running Locally

1. Apply schema: `psql $DATABASE_URL < database/schemas/search.sql`
2. Rebuild index via API or directly:
   ```python
   from backend.app.search.indexing import rebuild_index
   await rebuild_index(db)
   ```
3. Search: `GET /api/search?q=your-query`
