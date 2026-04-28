---
name: affiliate-tracker
description: Affiliate click and conversion tracking skill for DZIRE_v1. Records clicks, attributes conversions via session/click ID, and manages payout records.
category: monetization
version: v1.0
inputs:
  - affiliate_clicks table
  - affiliate_conversions table
  - affiliate_payouts table
  - UTM parameters and session IDs
outputs:
  - Click records
  - Conversion records with commission calculations
  - Payout records
---

# Affiliate Tracker Skill

## Purpose

Track affiliate link clicks and attribute conversions to calculate commissions.

## Click Tracking

```typescript
// Frontend: AffiliateWidget component calls this automatically
POST /api/affiliates/track
{
  "affiliate_id": "uuid",
  "session_id": "browser-session-id",
  "utm_source": "newsletter",
  "utm_campaign": "summer-sale",
  "referrer": "https://dzire.com/blog/post"
}
```

## Conversion Recording

```typescript
POST /api/affiliates/conversion
{
  "session_id": "browser-session-id",
  "order_id": "order-123",
  "amount": 99.00,
  "commission_rate": 0.10
}
```

Attribution links the conversion to the most recent click for the session.
Commission = amount × commission_rate.

## Payout Model

`AffiliatePayout` tracks payments to affiliates.
Status: `pending` → `processing` → `paid` / `failed`.

## Key Files

- `backend/app/affiliates/tracking.py` — AffiliateClick, AffiliateConversion models
- `backend/app/affiliates/attribution.py` — attribution logic
- `backend/app/affiliates/payouts.py` — AffiliatePayout model
- `backend/app/affiliates/routes.py` — /track, /conversion endpoints
- `frontend/src/components/monetization/AffiliateWidget.tsx` — click tracking UI

## References

- [docs/affiliates.md](../../docs/affiliates.md)
