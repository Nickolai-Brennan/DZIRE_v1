# Step 10 — API Reference

All routes are prefixed with `/api`.

---

## Content Calendar

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/content-calendar` | List all calendar items (skip/limit) |
| POST | `/api/content-calendar` | Create a new calendar item |
| GET | `/api/content-calendar/{id}` | Get a single item |
| PUT | `/api/content-calendar/{id}` | Update an item |
| DELETE | `/api/content-calendar/{id}` | Delete an item |
| POST | `/api/content-calendar/schedule` | Schedule an item (`{"item_id": "...", "scheduled_at": "..."}`) |
| POST | `/api/content-calendar/publish` | Mark an item as published |
| POST | `/api/content-calendar/status` | Update item status |

### Content Calendar Statuses
`idea` → `draft` → `scheduled` → `published` / `cancelled`

---

## Campaigns

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/campaigns` | List all campaigns |
| POST | `/api/campaigns` | Create a campaign |
| GET | `/api/campaigns/{id}` | Get a campaign |
| PUT | `/api/campaigns/{id}` | Update a campaign |
| DELETE | `/api/campaigns/{id}` | Delete a campaign |
| GET | `/api/campaigns/{id}/calendar` | Calendar items linked to campaign |
| GET | `/api/campaigns/{id}/metrics` | Aggregate metrics for campaign |

### Campaign Statuses
`draft` → `active` → `paused` → `completed` / `archived`

---

## Social Accounts

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/social/accounts` | List connected accounts |
| POST | `/api/social/accounts` | Connect a new account |
| GET | `/api/social/accounts/{id}` | Get account details |
| PUT | `/api/social/accounts/{id}` | Update account |
| DELETE | `/api/social/accounts/{id}` | Disconnect account |

---

## Social Posts

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/social/posts` | List posts |
| POST | `/api/social/posts` | Create a post |
| GET | `/api/social/posts/{id}` | Get a post |
| PUT | `/api/social/posts/{id}` | Update a post |
| DELETE | `/api/social/posts/{id}` | Delete a post |
| POST | `/api/social/posts/schedule` | Schedule a post for a future time |
| POST | `/api/social/posts/publish` | Immediately publish a post |
| GET | `/api/social/metrics` | Aggregate metrics across all posts |
| POST | `/api/social/webhooks` | Receive platform webhook events |

### Social Post Statuses
`draft` → `scheduled` → `ready` → `publishing` → `published` / `failed`

---

## Social Size Chart

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/social-size-chart` | List all size chart entries |
| POST | `/api/social-size-chart` | Add a new entry |
| GET | `/api/social-size-chart/platforms` | List distinct platforms |
| GET | `/api/social-size-chart/assets` | List distinct asset types |

---

## Common Query Parameters

Most list endpoints accept:
- `skip` — offset (default 0)
- `limit` — max results (default 20, max 100)
- `platform` — filter by platform string
- `status` — filter by status string
