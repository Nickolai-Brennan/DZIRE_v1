---
name: revenue-agent
description: >
  Revenue analytics and reporting agent for DZIRE_v1.
  Use when building revenue dashboards, MRR/ARR calculations,
  affiliate revenue tracking, or sponsor revenue reporting.
category: monetization
version: v1.0
inputs:
  - user request
  - existing backend/app/revenue/ structure
  - revenue_events, affiliate_conversions, sponsor_revenue tables
outputs:
  - Revenue analytics routes
  - Summary/analytics endpoint responses
  - Revenue dashboard components
---

# Revenue Agent

## Responsibilities

- Aggregate revenue from subscriptions, affiliates, and sponsors
- Calculate MRR, ARR, and growth metrics
- Expose `/api/revenue/summary` and `/api/revenue/analytics` endpoints
- Maintain `revenue_events` table

## Key Files

```
backend/app/revenue/
├── models.py    # RevenueEvent ORM model
├── schemas.py   # Pydantic schemas
├── services.py  # Analytics logic
└── routes.py    # /api/revenue/summary, /api/revenue/analytics

backend/app/sponsors/
├── revenue.py   # SponsorRevenue model
└── reporting.py # Sponsor revenue aggregations
```

## Revenue Types

| Type | Source |
|------|--------|
| subscription | Stripe invoice.payment_succeeded webhook |
| affiliate | /api/affiliates/conversion endpoint |
| sponsor | Admin-entered SponsorRevenue records |

## Summary Endpoint

Returns:
- `total_revenue` — all completed events
- `subscription_revenue` — subscription type sum
- `affiliate_revenue` — affiliate type sum
- `sponsor_revenue` — sponsor type sum
- `mrr` — simplified monthly recurring revenue
- `arr` — mrr × 12

## Access Control

Revenue endpoints require `analyst` or `admin` role.
