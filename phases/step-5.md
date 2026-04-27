# STEP 5 — CMS + MONETIZATION + ADMIN DASHBOARD SYSTEM

Step 5 adds the content, revenue, and analytics layer.

This step defines:
- Content management system
- Blog/article engine
- Social media embeds
- Affiliate system
- Sponsor system
- Newsletter system
- VIP subscriptions
- Backend admin dashboard
- Marketing/advertising dashboards
- SEO/keyword/tag reports
- Traffic and click analytics

---

## STEP 5 OBJECTIVE

Build the publishing and business operations layer.

```text
Starter Repo
→ CMS
→ Monetization
→ Analytics
→ Admin Dashboard


---

STEP 5 FILE STRUCTURE ADDITIONS

frontend/src/admin/
frontend/src/cms/
frontend/src/components/cms/
frontend/src/components/admin/
frontend/src/components/analytics/
frontend/src/components/monetization/

backend/app/cms/
backend/app/admin/
backend/app/analytics/
backend/app/affiliates/
backend/app/sponsors/
backend/app/newsletter/
backend/app/subscriptions/

database/schemas/cms.sql
database/schemas/analytics.sql
database/schemas/monetization.sql
database/schemas/newsletter.sql
database/schemas/subscriptions.sql

api/contracts/cms.json
api/contracts/admin.json
api/contracts/analytics.json
api/contracts/monetization.json

docs/cms.md
docs/admin-dashboard.md
docs/analytics.md
docs/seo-system.md
docs/monetization.md

skills/cms-builder/
skills/admin-dashboard-builder/
skills/seo-auditor/
skills/affiliate-manager/
skills/newsletter-manager/
skills/vip-subscription-builder/

.github/agents/cms-agent.md
.github/agents/admin-dashboard-agent.md
.github/agents/seo-agent.md
.github/agents/analytics-agent.md
.github/agents/monetization-agent.md


---

1. CMS CONTENT TYPES

Blog Article
Editorial
Review
Guide
News Post
Sponsor Post
Affiliate Product Post
VIP-Only Post
Social Embed Post
Newsletter Feature
Landing Page


---

2. CMS POST MODEL

id
title
slug
subtitle
excerpt
body_content
content_type
status
visibility
author_id
category_id
featured_image
seo_title
seo_description
keywords
tags
affiliate_links
sponsor_id
is_vip_only
published_at
created_at
updated_at


---

3. CONTENT STATUS + VISIBILITY

Status

draft
scheduled
published
archived

Visibility

public
members
vip
private


---

4. DATABASE TABLE MAP

cms_posts
cms_categories
cms_tags
cms_post_tags
cms_authors
cms_media
cms_social_embeds

affiliates
affiliate_links
affiliate_clicks

sponsors
sponsor_campaigns
sponsor_placements
sponsor_clicks

newsletter_subscribers
newsletter_campaigns
newsletter_sends

vip_plans
vip_subscriptions
vip_payments

analytics_events
page_views
click_events
social_metrics
seo_reports
keyword_reports


---

5. BACKEND MODULE STRUCTURE

backend/app/
├── cms/
│   ├── models.py
│   ├── schemas.py
│   ├── routes.py
│   ├── services.py
│   └── seo.py
│
├── admin/
│   ├── routes.py
│   ├── services.py
│   └── permissions.py
│
├── analytics/
│   ├── models.py
│   ├── routes.py
│   └── services.py
│
├── affiliates/
│   ├── models.py
│   ├── routes.py
│   └── services.py
│
├── sponsors/
│   ├── models.py
│   ├── routes.py
│   └── services.py
│
├── newsletter/
│   ├── models.py
│   ├── routes.py
│   └── services.py
│
└── subscriptions/
    ├── models.py
    ├── routes.py
    └── services.py


---

6. FRONTEND PUBLIC PAGES

frontend/src/pages/
├── HomePage.tsx
├── BlogIndexPage.tsx
├── BlogPostPage.tsx
├── CategoryPage.tsx
├── SponsorPage.tsx
├── AffiliatePage.tsx
├── NewsletterPage.tsx
└── VIPSubscribePage.tsx


---

7. FRONTEND ADMIN PAGES

frontend/src/admin/
├── AdminDashboard.tsx
├── ContentManager.tsx
├── PostEditor.tsx
├── SEOReports.tsx
├── KeywordTagReports.tsx
├── MarketingDashboard.tsx
├── AdvertisingDashboard.tsx
├── TrafficAnalytics.tsx
├── SocialMediaStats.tsx
├── AffiliateManager.tsx
├── SponsorManager.tsx
├── NewsletterManager.tsx
└── VIPSubscriptionManager.tsx


---

8. ADMIN DASHBOARD NAVIGATION

Admin Dashboard
├── Site Stats
├── Content Manager
├── Post Editor
├── SEO Reports
├── Keyword + Tag Reports
├── Marketing Dashboard
├── Advertising Dashboard
├── Social Media Stats
├── Affiliates
├── Sponsors
├── Newsletter Users
├── VIP Subscriptions
├── Geographic Stats
├── Age Range Stats
└── Settings


---

9. ADMIN DASHBOARD KPI CARDS

Site

Total Visitors
Page Views
Unique Visitors
Average Session Time
Bounce Rate
Top Referrer

Content

Published Posts
Draft Posts
Scheduled Posts
Top Post
Most Clicked Tag
Best SEO Score

Revenue

Affiliate Clicks
Sponsor Clicks
Estimated Revenue
VIP Subscribers
Monthly Recurring Revenue
Newsletter Conversions

Social

Social Referrals
Embedded Post Clicks
Top Platform
Total Engagement
Follower Counts


---

10. ADMIN ROLES

admin
editor
marketing
sponsor_manager
analyst
viewer

Permissions

admin            → all access
editor           → content only
marketing        → marketing + SEO + newsletter
sponsor_manager  → sponsors + affiliates
analyst          → dashboards only
viewer           → read-only


---

11. POST EDITOR REQUIREMENTS

WYSIWYG editor
Markdown support
Featured image upload
SEO title
SEO description
Keywords
Tags
Categories
Affiliate link picker
Sponsor placement picker
VIP-only toggle
Schedule publish date
Social embed block
Preview mode


---

12. CONTENT TEMPLATES

General Blog Article
Longform Essay
Product Review
Affiliate Product Spotlight
Sponsor Spotlight
News Post
VIP Exclusive
Newsletter Feature
Social Embed Roundup


---

13. SOCIAL MEDIA EMBED SYSTEM

Supported Platforms

X / Twitter
Instagram
TikTok
YouTube
Reddit
Bluesky
Facebook
Threads

Social Embed Fields

id
platform
embed_url
embed_code
caption
related_post_id
click_count
display_location
status
created_at


---

14. AFFILIATE SYSTEM

Affiliate Partner Fields

id
name
website
contact_email
network
commission_rate
status
notes
created_at

Affiliate Link Fields

id
affiliate_id
post_id
product_name
destination_url
tracking_url
coupon_code
click_count
conversion_count
estimated_revenue
status


---

15. SPONSOR SYSTEM

Sponsor Fields

id
name
website
contact_name
contact_email
logo_url
status
notes

Sponsor Campaign Fields

id
sponsor_id
campaign_name
placement_type
start_date
end_date
budget
impressions
clicks
ctr
status

Placement Types

Homepage Banner
Sidebar Card
Article Inline
Newsletter Sponsor
VIP Area Sponsor
Footer Sponsor
Social Mention


---

16. NEWSLETTER SYSTEM

Subscriber Fields

id
email
first_name
source
status
tags
is_vip
created_at
unsubscribed_at

Campaign Fields

id
subject
preview_text
body_content
status
scheduled_at
sent_at
open_rate
click_rate


---

17. VIP SUBSCRIPTION SYSTEM

VIP Plan Fields

id
name
price
billing_interval
description
features
status

VIP Subscription Fields

id
user_id
plan_id
status
started_at
renews_at
canceled_at
payment_provider
provider_subscription_id


---

18. ANALYTICS EVENT SYSTEM

Core Event Types

page_view
post_view
affiliate_click
sponsor_click
newsletter_signup
vip_signup
social_embed_click
search_query
tag_click
category_click

Event Fields

id
event_type
user_id
session_id
post_id
source
referrer
utm_source
utm_medium
utm_campaign
device_type
country
region
city
created_at


---

19. SEO REPORTING SYSTEM

SEO Report Fields

id
post_id
seo_score
word_count
title_length
meta_description_length
keyword_count
tag_count
internal_links
external_links
missing_image_alt_count
recommendations
created_at

SEO Score Rules

90–100 = Excellent
75–89 = Good
60–74 = Needs Work
0–59 = Poor


---

20. BACKEND API ROUTES

/api/posts
/api/posts/{slug}
/api/categories
/api/tags
/api/media

/api/admin/dashboard
/api/admin/content
/api/admin/seo
/api/admin/marketing
/api/admin/advertising
/api/admin/social
/api/admin/affiliates
/api/admin/sponsors
/api/admin/newsletter
/api/admin/vip

/api/analytics/events
/api/analytics/page-view
/api/analytics/click

/api/newsletter/subscribe
/api/vip/plans
/api/vip/subscribe


---

21. NEW AGENTS FOR STEP 5

cms-agent

Purpose:

Build CMS models, routes, editor workflows, and content templates.


admin-dashboard-agent

Purpose:

Build admin pages, dashboards, tables, KPI cards, and control panels.


seo-agent

Purpose:

Audit posts, keywords, tags, metadata, visibility, and content quality.


analytics-agent

Purpose:

Track traffic, clicks, referrers, UTM data, and dashboard metrics.


monetization-agent

Purpose:

Manage affiliates, sponsors, ads, VIP subscriptions, and revenue tracking.



---

22. NEW SKILLS FOR STEP 5

skills/cms-builder/
skills/admin-dashboard-builder/
skills/seo-auditor/
skills/affiliate-manager/
skills/newsletter-manager/
skills/vip-subscription-builder/


---

23. STEP 5 BUILD ORDER

1. Create CMS database schema
2. Create analytics event schema
3. Create affiliate/sponsor schema
4. Create newsletter schema
5. Create VIP subscription schema
6. Build backend CMS models/routes/services
7. Build backend admin routes
8. Build analytics tracking endpoints
9. Build public blog pages
10. Build admin dashboard layout
11. Build content editor
12. Build SEO dashboard
13. Build marketing dashboard
14. Build advertising dashboard
15. Build affiliate/sponsor managers
16. Build newsletter manager
17. Build VIP subscription manager
18. Add docs and evals


---

24. STEP 5 TASK LIST

T-046 Create CMS schema
T-047 Create post/category/tag tables
T-048 Create media table
T-049 Create social embeds table
T-050 Create affiliate tables
T-051 Create sponsor tables
T-052 Create newsletter tables
T-053 Create VIP subscription tables
T-054 Create analytics event tables
T-055 Create SEO report tables
T-056 Create CMS backend models
T-057 Create CMS backend schemas
T-058 Create CMS backend routes
T-059 Create admin dashboard routes
T-060 Create analytics tracking endpoints
T-061 Create public blog index page
T-062 Create article detail page
T-063 Create content templates
T-064 Create WYSIWYG post editor
T-065 Create admin dashboard layout
T-066 Create marketing dashboard
T-067 Create advertising dashboard
T-068 Create SEO dashboard
T-069 Create keyword/tag reports
T-070 Create affiliate manager
T-071 Create sponsor manager
T-072 Create newsletter manager
T-073 Create VIP subscription manager
T-074 Add CMS docs
T-075 Run Step 5 review


---

25. STEP 5 COMPLETION CHECKLIST

[ ] Blog posts supported
[ ] Multiple article types supported
[ ] Social media embeds supported
[ ] Affiliate links supported
[ ] Sponsor campaigns supported
[ ] Newsletter signup supported
[ ] VIP subscription plans supported
[ ] Admin dashboard available
[ ] Marketing dashboard available
[ ] Advertising dashboard available
[ ] SEO dashboard available
[ ] Keyword/tag reports available
[ ] Traffic analytics available
[ ] Click tracking available
[ ] Social media stats available
[ ] Role-based admin access defined
[ ] CMS agents added
[ ] CMS skills added
[ ] Docs added


---

STEP 5 COMPLETION STANDARD

Step 5 is complete when the system can:

Publish content
Manage posts
Embed social media
Track traffic
Track clicks
Manage affiliates
Manage sponsors
Collect newsletter signups
Offer VIP subscriptions
Review SEO
Track keywords and tags
Operate from an admin dashboard


---

NEXT STEP

Step 6 should create the design system, brand guidelines, UI tokens, page layouts, admin dashboard styling, social media graphics rules, and reusable component standards.
