# Affiliates — DZIRE_v1

## Overview

The affiliate system tracks clicks, attributes conversions, and manages payout records.

## Models

### AffiliateClick
Stored when a user clicks an affiliate link.

| Field | Description |
|-------|-------------|
| affiliate_id | Which affiliate's link was clicked |
| post_id | Content post the link appeared on |
| session_id | Browser session for attribution |
| click_id | Unique click identifier |
| utm_* | UTM parameters |
| referrer | Page that sent the click |

### AffiliateConversion
Stored when a click results in a purchase.

| Field | Description |
|-------|-------------|
| affiliate_click_id | Linked click record |
| order_id | Order reference |
| amount | Sale amount |
| commission | Calculated commission |
| status | pending / approved / paid |

### AffiliatePayout
Tracks payout to affiliates.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/affiliates/track` | Record a click |
| POST | `/api/affiliates/conversion` | Record a conversion |
| GET | `/api/affiliates` | List affiliates (admin) |
| POST | `/api/affiliates` | Create affiliate (admin) |
| GET | `/api/affiliates/links` | List links (admin) |
| POST | `/api/affiliates/links` | Create link (admin) |

## Frontend Usage

Use `<AffiliateWidget>` component to wrap affiliate links — it automatically calls `/api/affiliates/track` on click.
