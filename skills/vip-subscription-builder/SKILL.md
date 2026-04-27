---
name: vip-subscription-builder
description: Build and manage VIP subscription plans, user subscriptions, and payment records. Use when creating VIP tiers, managing subscribers, or integrating payment providers.
category: monetization
version: v1.0
inputs:
  - user request
  - existing subscription data in backend/app/subscriptions/
  - database/schemas/subscriptions.sql
outputs:
  - VIP plan records
  - Subscription records
  - Payment records
---

# VIP Subscription Builder Skill

## Purpose

Build and manage DZIRE VIP subscription tiers, user subscriptions, and payment integration.

## When To Use

Use this skill when the user asks to:
- Create or edit VIP subscription plans
- Manage VIP subscribers
- Integrate a payment provider (Stripe, etc.)
- Build VIP-only content gating
- Add VIP subscription analytics

## Stack

- Backend: `backend/app/subscriptions/`
- Database: `vip_plans`, `vip_subscriptions`, `vip_payments` tables
- Admin view: `/admin/vip`
- Public API: `GET /api/vip/plans`, `POST /api/vip/subscribe`
- Frontend: `frontend/src/pages/VIPSubscribePage.tsx`

## Key Files

- `backend/app/subscriptions/models.py`
- `backend/app/subscriptions/schemas.py`
- `backend/app/subscriptions/routes.py`
- `backend/app/subscriptions/services.py`
- `database/schemas/subscriptions.sql`
- `frontend/src/admin/VIPSubscriptionManager.tsx`
- `frontend/src/pages/VIPSubscribePage.tsx`
- `api/contracts/monetization.json`

## VIP Plan Fields

| Field | Description |
|-------|-------------|
| `name` | Plan display name |
| `price` | Price in USD |
| `billing_interval` | monthly / quarterly / annual |
| `description` | Plan description |
| `features` | Array of feature strings |
| `status` | active / inactive |

## VIP Content Gating

Posts with `is_vip_only = true` and `visibility = 'vip'` should only be accessible to active VIP subscribers. The `CmsPost.is_vip_only` field controls this behavior.

## Workflow

1. Admin creates plan via `POST /api/vip/plans` (admin role required)
2. Plans listed publicly via `GET /api/vip/plans`
3. User subscribes via `POST /api/vip/subscribe`
4. Subscription record created in `vip_subscriptions`
5. Payment recorded in `vip_payments` when integrated with payment provider
