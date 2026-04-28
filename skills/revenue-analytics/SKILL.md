---
name: revenue-analytics
description: Revenue analytics and MRR/ARR reporting skill for DZIRE_v1. Aggregates subscription, affiliate, and sponsor revenue into summary metrics.
category: monetization
version: v1.0
inputs:
  - revenue_events table
  - affiliate_conversions table
  - sponsor_revenue table
outputs:
  - RevenueSummary (total, MRR, ARR)
  - RevenueAnalytics (event list + summary)
---

# Revenue Analytics Skill

## Purpose

Aggregate all revenue streams into actionable metrics for the admin dashboard.

## Metrics

| Metric | Calculation |
|--------|-------------|
| total_revenue | Sum of all completed revenue_events |
| subscription_revenue | Sum of type=subscription events |
| affiliate_revenue | Sum of type=affiliate events |
| sponsor_revenue | Sum of type=sponsor events |
| MRR | subscription_revenue (simplified) |
| ARR | MRR × 12 |

## Endpoints

- `GET /api/revenue/summary` — quick totals (analyst/admin)
- `GET /api/revenue/analytics` — event list + summary (analyst/admin)

## Key Files

- `backend/app/revenue/` — models, services, routes
- `backend/app/sponsors/reporting.py` — sponsor aggregations

## References

- [docs/revenue.md](../../docs/revenue.md)
