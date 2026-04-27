# Monetization Documentation

## Overview

The DZIRE monetization system includes affiliate marketing, sponsor campaigns, newsletter subscriptions, and VIP membership tiers.

## Affiliate System

### Tables

- `affiliates` — Partner information
- `affiliate_links` — Tracked product links
- `affiliate_clicks` — Click-level tracking per link

### Affiliate Partner Fields

| Field | Description |
|-------|-------------|
| `name` | Partner/brand name |
| `website` | Partner website URL |
| `contact_email` | Partner contact email |
| `network` | Affiliate network (e.g., ShareASale, CJ) |
| `commission_rate` | Commission as decimal (e.g., 0.10 = 10%) |
| `status` | active / inactive / pending |

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/affiliates` | List affiliates (admin) |
| POST | `/api/affiliates` | Create affiliate (admin) |
| GET | `/api/affiliates/links` | List affiliate links (admin) |
| POST | `/api/affiliates/links` | Create affiliate link (admin) |

---

## Sponsor System

### Tables

- `sponsors` — Sponsor company information
- `sponsor_campaigns` — Campaign details per sponsor
- `sponsor_placements` — Placement of campaign in content
- `sponsor_clicks` — Click tracking per placement

### Placement Types

- Homepage Banner
- Sidebar Card
- Article Inline
- Newsletter Sponsor
- VIP Area Sponsor
- Footer Sponsor
- Social Mention

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/sponsors` | List sponsors (admin) |
| POST | `/api/sponsors` | Create sponsor (admin) |
| GET | `/api/sponsors/campaigns` | List campaigns (admin) |
| POST | `/api/sponsors/campaigns` | Create campaign (admin) |

---

## Newsletter System

### Tables

- `newsletter_subscribers` — Subscriber records
- `newsletter_campaigns` — Campaign content and metadata
- `newsletter_sends` — Send records per campaign

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/newsletter/subscribe` | Public subscribe endpoint |
| GET | `/api/newsletter/subscribers` | List subscribers (admin) |
| GET | `/api/newsletter/campaigns` | List campaigns (admin) |
| POST | `/api/newsletter/campaigns` | Create campaign (admin) |

---

## VIP Subscription System

### Tables

- `vip_plans` — Plan tiers with pricing
- `vip_subscriptions` — Active subscriptions
- `vip_payments` — Payment records

### Billing Intervals

- `monthly`
- `quarterly`
- `annual`

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/vip/plans` | List active VIP plans (public) |
| POST | `/api/vip/plans` | Create VIP plan (admin) |
| POST | `/api/vip/subscribe` | Subscribe to VIP plan |
