# Revenue — DZIRE_v1

## Overview

The revenue module aggregates events from subscriptions, affiliates, and sponsors to provide MRR/ARR metrics and analytics.

## Revenue Event Model

| Field | Description |
|-------|-------------|
| type | subscription / affiliate / sponsor |
| source_id | Provider ID (Stripe invoice ID, etc.) |
| user_id | Associated user |
| amount | Revenue amount |
| currency | ISO 4217 |
| status | completed / pending / failed |

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/revenue/summary` | analyst/admin | Total revenue + MRR/ARR |
| GET | `/api/revenue/analytics` | analyst/admin | Recent events + summary |

## Summary Response

```json
{
  "total_revenue": 1500.00,
  "subscription_revenue": 1200.00,
  "affiliate_revenue": 200.00,
  "sponsor_revenue": 100.00,
  "mrr": 1200.00,
  "arr": 14400.00,
  "currency": "usd"
}
```

## MRR / ARR Calculation

Current implementation sums all completed subscription revenue events as MRR (simplified). For accurate MRR, filter by the current billing month. ARR = MRR × 12.

## Revenue Events are Created By

- `invoice.payment_succeeded` webhook → subscription revenue
- Affiliate conversion endpoint → affiliate revenue
- Sponsor revenue records (admin input) → sponsor revenue
