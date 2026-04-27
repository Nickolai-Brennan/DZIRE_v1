# Analytics Documentation

## Overview

The DZIRE analytics system tracks user behavior including page views, post views, clicks, affiliate interactions, sponsor impressions, social embed interactions, newsletter signups, and VIP signups.

## Event Types

| Event | Description |
|-------|-------------|
| `page_view` | Any page load |
| `post_view` | CMS post viewed |
| `affiliate_click` | Affiliate link clicked |
| `sponsor_click` | Sponsor placement clicked |
| `newsletter_signup` | Newsletter subscription |
| `vip_signup` | VIP subscription created |
| `social_embed_click` | Social embed interaction |
| `search_query` | Site search performed |
| `tag_click` | Tag filter clicked |
| `category_click` | Category filter clicked |

## Database Tables

- `analytics_events` — Generic event tracking with UTM and geo data
- `page_views` — Page-level view tracking
- `click_events` — Element-level click tracking
- `social_metrics` — Platform-level social metric snapshots
- `seo_reports` — Per-post SEO audit reports
- `keyword_reports` — Keyword impressions and click data

## API Endpoints

All endpoints are public (no auth required) to support client-side tracking.

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/analytics/events` | Track a generic event |
| POST | `/api/analytics/page-view` | Track a page view |
| POST | `/api/analytics/click` | Track a click |

## Event Fields

```json
{
  "event_type": "page_view",
  "session_id": "abc123",
  "post_id": null,
  "source": "organic",
  "referrer": "https://google.com",
  "utm_source": "google",
  "utm_medium": "organic",
  "utm_campaign": null,
  "device_type": "desktop",
  "country": "US",
  "region": "CA",
  "city": "Los Angeles"
}
```

## UTM Parameter Tracking

All analytics events support UTM parameters:
- `utm_source` — Traffic source (google, newsletter, twitter)
- `utm_medium` — Traffic medium (organic, email, social)
- `utm_campaign` — Campaign name
