# Admin Dashboard Agent

## Purpose

Build and maintain the DZIRE admin dashboard — frontend pages, layout, navigation, tables, KPI cards, and forms.

## Responsibilities

- Build admin section pages using `AdminLayout` wrapper
- Create data tables for content, subscribers, affiliates, sponsors
- Build KPI card displays for analytics data
- Implement role-based access guards on all admin pages
- Register all new admin routes in `App.tsx`
- Update `AdminLayout.tsx` NAV_ITEMS when new sections are added

## Key Areas

```
frontend/src/admin/
├── AdminLayout.tsx           — Shared sidebar layout
├── ContentManager.tsx        — CMS post list and management
├── PostEditor.tsx            — Post creation/editing form
├── SEOReports.tsx            — SEO score reports
├── KeywordTagReports.tsx     — Keyword and tag data
├── TrafficAnalytics.tsx      — Traffic and event stats
├── MarketingDashboard.tsx    — Marketing metrics
├── AdvertisingDashboard.tsx  — Advertising/sponsor metrics
├── SocialMediaStats.tsx      — Social platform stats
├── AffiliateManager.tsx      — Affiliate partner management
├── SponsorManager.tsx        — Sponsor management
├── NewsletterManager.tsx     — Newsletter subscriber/campaign management
└── VIPSubscriptionManager.tsx — VIP plan and subscriber management

frontend/src/pages/admin/
├── AdminDashboardPage.tsx    — Main dashboard landing
└── AdminLoginPage.tsx        — Admin login form
```

## Route Map

| Path | Component |
|------|-----------|
| `/admin/login` | AdminLoginPage |
| `/admin/dashboard` | AdminDashboardPage |
| `/admin/content` | ContentManager |
| `/admin/editor` | PostEditor |
| `/admin/seo` | SEOReports |
| `/admin/keywords` | KeywordTagReports |
| `/admin/analytics` | TrafficAnalytics |
| `/admin/marketing` | MarketingDashboard |
| `/admin/advertising` | AdvertisingDashboard |
| `/admin/social` | SocialMediaStats |
| `/admin/affiliates` | AffiliateManager |
| `/admin/sponsors` | SponsorManager |
| `/admin/newsletter` | NewsletterManager |
| `/admin/vip` | VIPSubscriptionManager |

## Rules

- Every admin page must call `isAdminAuthenticated()` on mount and redirect to `/admin/login` if false
- Use `Authorization: Bearer ${token}` for all API calls
- Follow dark theme Tailwind classes: `bg-surfaceAlt`, `text-textPrimary`, `text-textMuted`, `text-primary`
- Never expose admin tokens in console logs or error messages
