# DZIRE Frontend

Premium dark-mode adult lifestyle web application built with:

- **React 18** + **TypeScript**
- **Vite 5** (build tool)
- **Tailwind CSS v4** (dark luxury theme)
- **TanStack Router** (type-safe routing)
- **TanStack Query** (server state ready)
- **TanStack Table** (data tables)
- **Recharts** (analytics charts)
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| Background | `#09090B` | Page background |
| Surface | `#15151C` | Cards |
| Surface Alt | `#1D1D26` | Modals, sidebar |
| Primary | `#E11D48` | CTAs, accents |
| Gold | `#F5C451` | Trophies, VIP |
| Text | `#F8FAFC` | Primary text |
| Muted | `#A1A1AA` | Secondary text |

## Pages

### Public
- `/` — Homepage
- `/positions` — Position archive
- `/positions/:slug` — Position detail
- `/reviews` — Reviews + Trophy Hall
- `/reviews/:slug` — Review detail
- `/dictionary` — Dictionary
- `/dictionary/:slug` — Term detail
- `/dzire-dolls` — Creator hub
- `/dzire-dolls/:slug` — Creator profile
- `/stories` — Fiction archive
- `/stories/:slug` — Story reader
- `/magazine` — Magazine issues
- `/newsletter` — Newsletter signup
- `/vip` — VIP membership
- `/contact` — Contact / Collaborate
- `/search` — Search results

### Admin
- `/admin/login` — Admin login (temp: admin/admin)
- `/admin/dashboard` — Business overview
- `/admin/site-stats` — Traffic analytics
- `/admin/analytics` — Event tracking & funnels
- `/admin/seo-reports` — SEO health table
- `/admin/keyword-tags` — Keyword clusters
- `/admin/newsletter-users` — Subscriber management
- `/admin/membership-stats` — VIP analytics
- `/admin/geographic-stats` — Country/region data
- `/admin/age-range-stats` — Self-reported age data
- `/admin/search-rankings` — Keyword ranking tracker
- `/admin/schedule` — Content calendar
- `/admin/post-content` — WYSIWYG editor
- `/admin/post-templates` — 7 post templates
- `/admin/monetization` — Affiliates, sponsors, ads
- `/admin/dzire-dolls` — Creator management
- `/admin/settings` — Site settings

## Admin Login

> ⚠️ **Temporary credentials — change before production**
> Username: `admin`
> Password: `admin`

## File Structure

```
src/
  app/
    router.tsx          # All routes
    routes/
      public/           # 16 public pages
      admin/            # 17 admin pages
  components/
    layout/             # AppShell, Header, Footer, AdminLayout
    cards/              # PositionCard, ReviewCard, DollCard, etc.
    forms/              # SearchBar, FilterChips, NewsletterForm
    modals/             # PositionQuickViewModal, AdminLoginModal
    ui/                 # ScorePill, StatCard
    admin/              # AdminSidebar, AdminTopbar, AdminFloatingButton
  data/
    mock*.ts            # All mock data files
  hooks/
    useAdminAuth.ts     # Session-based admin auth
    useFilters.ts       # Generic search/filter hook
    usePageTracking.ts  # Page view tracking
  lib/
    api.ts              # API-ready fetch wrapper
    tracking.ts         # Analytics event system
    formatters.ts       # Score formatting utilities
    constants.ts        # Colors, nav links, admin routes
  types/
    content.ts          # Position, Review, Doll, Story, etc.
    admin.ts            # AdminStat, SeoReport, etc.
    monetization.ts     # AffiliateLink, SponsorCampaign, etc.
  styles/
    globals.css         # Tailwind v4 theme + global styles
```

## Tracking Events

All events are logged to console (API-ready for `POST /api/track/event`):

- `page_view` — Page loads
- `cta_click` — CTA button clicks
- `newsletter_signup` — Newsletter form submissions
- `affiliate_click` — Affiliate link clicks
- `sponsor_click` — Sponsor ad clicks
- `doll_profile_view` — Creator profile views
- `doll_promo_click` — Promo button clicks
- `position_popup_open` — Quick view modal opens
- `position_full_guide_click` — Full guide CTA clicks
- `review_offer_click` — Review offer button clicks
- `search_query` — Search queries
- `filter_used` — Filter activation
- `vip_cta_click` — VIP CTA clicks
