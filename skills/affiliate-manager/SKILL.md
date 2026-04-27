---
name: affiliate-manager
description: Manage affiliate partners, links, and click tracking. Use when adding affiliate partners, creating tracked links, or building affiliate performance reports.
category: monetization
version: v1.0
inputs:
  - user request
  - existing affiliate data in backend/app/affiliates/
  - database/schemas/monetization.sql
outputs:
  - Affiliate partner records
  - Affiliate link records
  - Click tracking data
---

# Affiliate Manager Skill

## Purpose

Create and manage affiliate partners, product links, and click tracking for DZIRE monetization.

## When To Use

Use this skill when the user asks to:
- Add a new affiliate partner
- Create a tracked affiliate link
- Review affiliate performance (clicks, conversions, revenue)
- Build affiliate reports in the admin dashboard
- Integrate affiliate links into CMS posts

## Stack

- Backend: `backend/app/affiliates/`
- Database: `affiliates`, `affiliate_links`, `affiliate_clicks` tables
- Admin view: `/admin/affiliates`
- API: `/api/affiliates`, `/api/affiliates/links`

## Key Files

- `backend/app/affiliates/models.py`
- `backend/app/affiliates/schemas.py`
- `backend/app/affiliates/routes.py`
- `backend/app/affiliates/services.py`
- `database/schemas/monetization.sql`
- `frontend/src/admin/AffiliateManager.tsx`
- `api/contracts/monetization.json`

## Workflow

1. Check existing affiliates via `GET /api/affiliates` (requires sponsor_manager role)
2. Create partner via `POST /api/affiliates`
3. Create links via `POST /api/affiliates/links`
4. Track clicks via analytics events (`affiliate_click` event type)
5. View performance in admin dashboard

## Commission Tracking

- `commission_rate` stored as decimal (e.g., 0.10 = 10%)
- `estimated_revenue = click_count * avg_order_value * commission_rate`
- Conversion tracking via `affiliate_clicks` table
