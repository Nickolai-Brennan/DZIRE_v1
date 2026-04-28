---
name: subscription-manager
description: VIP subscription lifecycle management for DZIRE_v1. Handles plan display, Stripe Checkout redirect, webhook activation, and VIP access control.
category: monetization
version: v1.0
inputs:
  - user request
  - vip_plans and vip_subscriptions tables
  - Stripe Checkout session URL
outputs:
  - Subscription records
  - VIP access grants/revocations
  - Plan management
---

# Subscription Manager Skill

## Purpose

Manage the full subscription lifecycle from plan display through activation and cancellation.

## Flow

1. `GET /api/subscriptions/plans` → display plan cards
2. User clicks Subscribe → `POST /api/subscriptions/subscribe` → Checkout URL
3. User completes Stripe Checkout
4. `checkout.session.completed` webhook → `VipSubscription` created, `User.is_vip = True`
5. `customer.subscription.deleted` webhook → `User.is_vip = False`

## Subscription Statuses

`active` | `trialing` | `past_due` | `canceled` | `unpaid`

## Key Files

- `backend/app/subscriptions/` — models, routes, services
- `backend/app/payments/webhooks.py` — activation/revocation logic
- `frontend/src/payments/SubscriptionPage.tsx` — UI

## References

- [docs/subscriptions.md](../../docs/subscriptions.md)
