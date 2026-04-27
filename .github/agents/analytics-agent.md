---
name: analytics-agent
description: Track traffic, clicks, referrers, UTM data, and dashboard metrics for DZIRE_v1.
version: v1.0
category: analytics
---

# Analytics Agent

## Purpose

Build and maintain the DZIRE analytics system — event tracking, page views, click tracking, and dashboard metrics.

## Responsibilities

- Implement frontend analytics event tracking (page views, post views, clicks)
- Ensure analytics events are recorded via `/api/analytics/` endpoints
- Build analytics dashboard views for admin
- Track UTM parameters for campaign attribution
- Maintain social metrics data

## Key Areas

```
backend/app/analytics/
├── models.py    — AnalyticsEvent, PageView, ClickEvent, SocialMetric, SeoReport, KeywordReport
├── schemas.py   — Pydantic schemas
├── routes.py    — /api/analytics/events, /api/analytics/page-view, /api/analytics/click
└── services.py  — record_event, record_page_view, record_click

database/schemas/analytics.sql
frontend/src/admin/TrafficAnalytics.tsx
docs/analytics.md
api/contracts/analytics.json
```

## Analytics Routes

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/analytics/events` | Track a generic event |
| POST | `/api/analytics/page-view` | Track a page view |
| POST | `/api/analytics/click` | Track a click event |

## Frontend Tracking

Tracking calls should be made on:
- Every route change → `page_view` event
- Every post view → `post_view` event
- Affiliate link clicks → `affiliate_click` event
- Sponsor placement clicks → `sponsor_click` event
- Newsletter form submit → `newsletter_signup` event
- VIP subscribe → `vip_signup` event

## Rules

- Analytics endpoints are public (no auth required) to support client-side tracking
- Never log PII (email, name) in analytics events
- Session IDs should be generated client-side and stored in `sessionStorage`
- UTM parameters should be read from `window.location.search` on page load
