---
name: newsletter-manager
description: Manage newsletter subscribers, campaigns, and send records. Use when adding subscribers, creating campaigns, or building newsletter analytics.
category: monetization
version: v1.0
inputs:
  - user request
  - existing newsletter data in backend/app/newsletter/
  - database/schemas/newsletter.sql
outputs:
  - Subscriber records
  - Campaign records
  - Send records
---

# Newsletter Manager Skill

## Purpose

Manage the DZIRE newsletter system including subscriber management, campaign creation, and send tracking.

## When To Use

Use this skill when the user asks to:
- Add or manage newsletter subscribers
- Create a newsletter campaign
- Track newsletter open/click rates
- Build newsletter admin views
- Integrate newsletter signup into frontend pages

## Stack

- Backend: `backend/app/newsletter/`
- Database: `newsletter_subscribers`, `newsletter_campaigns`, `newsletter_sends` tables
- Admin view: `/admin/newsletter`
- Public API: `POST /api/newsletter/subscribe`

## Key Files

- `backend/app/newsletter/models.py`
- `backend/app/newsletter/schemas.py`
- `backend/app/newsletter/routes.py`
- `backend/app/newsletter/services.py`
- `database/schemas/newsletter.sql`
- `frontend/src/admin/NewsletterManager.tsx`
- `frontend/src/pages/NewsletterPage.tsx`
- `api/contracts/monetization.json`

## Subscriber Fields

| Field | Description |
|-------|-------------|
| `email` | Subscriber email (unique) |
| `first_name` | Optional first name |
| `source` | Where they subscribed (e.g., homepage, blog) |
| `status` | active / unsubscribed |
| `tags` | Optional segmentation tags |
| `is_vip` | Whether subscriber is a VIP member |

## Workflow

1. Subscriber signs up via `POST /api/newsletter/subscribe`
2. Admin views subscribers at `/admin/newsletter`
3. Admin creates campaigns via `POST /api/newsletter/campaigns`
4. Send tracking recorded in `newsletter_sends`
