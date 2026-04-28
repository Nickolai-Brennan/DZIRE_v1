# Subscriptions — DZIRE_v1

## Overview

Subscriptions control VIP access. Plans are stored in `vip_plans`; active subscriptions in `vip_subscriptions`. Stripe Checkout is used for purchase.

## Flow

```
User selects plan → POST /api/subscriptions/subscribe
→ Returns Stripe Checkout URL → Redirect to Stripe
→ checkout.session.completed webhook
→ VipSubscription created (status=active)
→ User.is_vip = True
```

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/subscriptions/plans` | Public | List active plans |
| POST | `/api/subscriptions/subscribe` | User | Start Checkout |
| POST | `/api/subscriptions/cancel` | User | Cancel subscription |
| POST | `/api/subscriptions/upgrade` | User | Upgrade plan |
| POST | `/api/subscriptions/downgrade` | User | Downgrade plan |

## Status Values

| Status | Description |
|--------|-------------|
| active | Subscription is live |
| trialing | Free trial period |
| past_due | Payment failed |
| canceled | Subscription ended |
| unpaid | Invoice unpaid |

## VIP Access

`User.is_vip` is set to `True` when a subscription becomes active and `False` when it is canceled or deleted. This is handled automatically by the webhook handlers in `backend/app/payments/webhooks.py`.

## Plans

Create plans in Stripe Dashboard or via CLI:
```bash
stripe prices create --unit-amount 999 --currency usd --recurring[interval]=month --product-data[name]="VIP Monthly"
```

Set the returned price ID as `STRIPE_PRICE_ID_VIP_MONTHLY`.
