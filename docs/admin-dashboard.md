# Admin Dashboard Documentation

## Overview

The DZIRE admin dashboard provides role-based access to content management, analytics, monetization, and system settings.

## Access

- URL: `/admin/dashboard`
- Login: `/admin/login`
- Authentication: JWT Bearer token (stored in `localStorage` as `admin_token`)

## Admin Roles

| Role | Access |
|------|--------|
| `admin` | Full access to all sections |
| `editor` | Content management only |
| `marketing` | Marketing, SEO, newsletter dashboards |
| `sponsor_manager` | Sponsors and affiliates |
| `analyst` | Read-only analytics dashboards |
| `viewer` | Read-only across all sections |

## Dashboard Sections

### Content Manager (`/admin/content`)
- View all posts (all statuses)
- Create, edit, delete posts
- Filter by status and content type

### Post Editor (`/admin/editor`)
- Rich form-based post editor
- Fields: title, slug, subtitle, excerpt, body content, content type, status, visibility
- SEO fields: seo_title, seo_description, keywords
- VIP-only toggle
- Auto-generates slug from title

### SEO Reports (`/admin/seo`)
- Per-post SEO score (0–100)
- Word count, title length, meta description length, keyword count
- Score tiers: 90–100 Excellent, 75–89 Good, 60–74 Needs Work, 0–59 Poor

### Keyword / Tag Reports (`/admin/keywords`)
- All defined tags
- Tag usage counts
- Keyword performance data

### Traffic Analytics (`/admin/analytics`)
- Page views, unique visitors, session data
- Event tracking summary

### Marketing Dashboard (`/admin/marketing`)
- Newsletter campaign performance
- SEO/organic traffic overview
- Social media referral data
- Conversion metrics

### Advertising Dashboard (`/admin/advertising`)
- Active sponsor campaigns
- Impression and click data
- CTR by campaign

### Social Media Stats (`/admin/social`)
- Per-platform follower counts and engagement
- Embedded post click tracking

### Affiliate Manager (`/admin/affiliates`)
- Affiliate partner list
- Affiliate link performance (clicks, conversions, estimated revenue)

### Sponsor Manager (`/admin/sponsors`)
- Sponsor list
- Campaign management

### Newsletter Manager (`/admin/newsletter`)
- Subscriber list with source/status/VIP flag
- Campaign management

### VIP Subscription Manager (`/admin/vip`)
- VIP plans and pricing
- Active subscriber count

## Backend API Routes

All admin routes require a valid Bearer token with appropriate role.

| Method | Path | Role |
|--------|------|------|
| GET | `/api/admin/dashboard` | any admin |
| GET/POST | `/api/admin/content` | editor+ |
| PATCH/DELETE | `/api/admin/content/{id}` | editor+ |
| GET | `/api/admin/seo` | analyst+ |
| GET | `/api/admin/marketing` | marketing+ |
| GET | `/api/admin/advertising` | sponsor_manager+ |
| GET | `/api/admin/social` | marketing+ |
| GET | `/api/admin/affiliates` | sponsor_manager+ |
| GET | `/api/admin/sponsors` | sponsor_manager+ |
| GET | `/api/admin/newsletter` | marketing+ |
| GET | `/api/admin/vip` | any admin |
