# Monetization Agent

## Purpose

Build and maintain the DZIRE monetization layer — affiliates, sponsors, newsletter, VIP subscriptions, and revenue tracking.

## Responsibilities

- Manage affiliate partner records and link tracking
- Manage sponsor partners and campaign placements
- Manage newsletter subscribers and campaigns
- Manage VIP subscription plans and active subscriptions
- Track click and conversion revenue
- Build monetization-related admin pages

## Key Areas

```
backend/app/affiliates/     — Affiliate partners, links, click tracking
backend/app/sponsors/       — Sponsors, campaigns, placements, clicks
backend/app/newsletter/     — Subscribers, campaigns, sends
backend/app/subscriptions/  — VIP plans, subscriptions, payments

database/schemas/monetization.sql
database/schemas/newsletter.sql
database/schemas/subscriptions.sql

frontend/src/admin/AffiliateManager.tsx
frontend/src/admin/SponsorManager.tsx
frontend/src/admin/NewsletterManager.tsx
frontend/src/admin/VIPSubscriptionManager.tsx

frontend/src/pages/AffiliatePage.tsx
frontend/src/pages/SponsorPage.tsx
frontend/src/pages/VIPSubscribePage.tsx
frontend/src/pages/NewsletterPage.tsx

docs/monetization.md
api/contracts/monetization.json
```

## Route Ownership

| Route | Description |
|-------|-------------|
| GET/POST `/api/affiliates` | Affiliate management (admin) |
| GET/POST `/api/affiliates/links` | Affiliate link management (admin) |
| GET/POST `/api/sponsors` | Sponsor management (admin) |
| GET/POST `/api/sponsors/campaigns` | Sponsor campaign management (admin) |
| POST `/api/newsletter/subscribe` | Public newsletter signup |
| GET `/api/newsletter/subscribers` | Subscriber list (admin) |
| GET/POST `/api/newsletter/campaigns` | Campaign management (admin) |
| GET `/api/vip/plans` | Public VIP plan listing |
| POST `/api/vip/plans` | Create VIP plan (admin) |
| POST `/api/vip/subscribe` | VIP subscription signup |

## Rules

- All monetization admin routes require `sponsor_manager` or `marketing` role minimum
- Click tracking should fire analytics events (`affiliate_click`, `sponsor_click`)
- VIP content gating is enforced via `CmsPost.is_vip_only` + `visibility = 'vip'`
- Never store raw payment card data — use payment provider tokens only
