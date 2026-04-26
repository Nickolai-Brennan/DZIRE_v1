Create the backend architecture, admin panel system, and database-ready feature plan for the DZIRE web app.

DZIRE is a premium adult lifestyle publication, creator discovery hub, product review engine, educational guide platform, and affiliate/sponsor monetization system.

Build this as a scalable solo-founder MVP backend with an internal admin system.

Important:
- Keep all public-facing adult content tasteful and non-explicit.
- Admin tools are private.
- Add a temporary admin login for local MVP testing:
  - username: admin
  - password: admin
- Mark this clearly as temporary and insecure.
- Add a TODO note: “Change admin credentials before production.”
- Passwords must be hashed in the real backend.
- Do not hardcode production credentials.

-----------------------------------
GLOBAL ADMIN ACCESS BUTTON
-----------------------------------

Add a small floating admin button on the bottom-right corner of every page.

Behavior:
- Visible only in development OR behind a hidden admin route in production.
- Position: bottom-right fixed
- Style: small dark circular button with lock/admin icon
- Label on hover: “Admin”
- Click opens admin login modal or routes to `/admin/login`

Admin Login:
- username field
- password field
- login button
- forgot password placeholder
- temporary credentials:
  - username: admin
  - password: admin
- display warning in dev:
  “Temporary admin credentials. Change before production.”

After login:
- redirect to `/admin/dashboard`

-----------------------------------
ADMIN PANEL LAYOUT
-----------------------------------

Create a private admin panel with:

Admin Sidebar Navigation:
1. Dashboard
2. Site Stats
3. Analytics
4. SEO Reports
5. Keyword & Tag Reports
6. Newsletter Users
7. Membership Stats
8. Geographic Stats
9. Age Range Stats
10. Search Engine Rankings
11. Content Schedule
12. Social Integrations
13. Post Web Content
14. Post Templates
15. Affiliates
16. Sponsors
17. Ads & Placements
18. DZIRE Dolls
19. Promo Tracking
20. Settings

Admin Top Bar:
- site name: DZIRE Admin
- search admin data
- quick create button
- notifications
- logged-in admin user
- logout button

Permissions:
- MVP role: super_admin
- Future roles:
  - editor
  - SEO manager
  - affiliate manager
  - model manager
  - support admin

-----------------------------------
PAGE 1 — ADMIN DASHBOARD
-----------------------------------

Route:
`/admin/dashboard`

Purpose:
Central overview of DZIRE business activity.

Widgets:
- total page views
- active users
- newsletter signups
- VIP members
- affiliate clicks
- sponsor clicks
- ad impressions
- review clicks
- DZIRE Doll profile views
- top performing content
- recent activity feed
- latest submissions
- pending reviews
- scheduled posts
- recent promo performance

Dashboard sections:
1. Traffic Snapshot
2. Revenue Snapshot
3. Content Snapshot
4. DZIRE Dolls Snapshot
5. Affiliate / Sponsor Snapshot
6. Alerts & Tasks

Cards:
- “Top Article Today”
- “Top Product Review”
- “Top DZIRE Doll”
- “Top Search Term”
- “Best Performing Promo”
- “Upcoming Scheduled Content”

-----------------------------------
PAGE 2 — SITE STATS
-----------------------------------

Route:
`/admin/site-stats`

Track:
- total visitors
- unique visitors
- page views
- sessions
- bounce rate
- average session duration
- top pages
- top referrers
- device type
- browser
- operating system
- traffic by date
- returning vs new users

Charts:
- line chart for daily traffic
- bar chart for top pages
- pie chart for device type
- table for referrers

Filters:
- today
- yesterday
- last 7 days
- last 30 days
- month to date
- custom date range

-----------------------------------
PAGE 3 — ANALYTICS
-----------------------------------

Route:
`/admin/analytics`

Track user behavior:
- content clicks
- CTA clicks
- newsletter conversions
- affiliate outbound clicks
- model profile clicks
- review button clicks
- search usage
- filter usage
- hover popup opens
- saved items
- shares

Analytics tables:
- event name
- page
- user/session id
- timestamp
- device
- referrer
- metadata JSON

Charts:
- conversion funnel
- clicks by content type
- top CTA buttons
- highest converting pages

Conversion funnels:
1. Homepage → Newsletter Signup
2. Reviews → Partner Offer Click
3. DZIRE Dolls → Creator Profile → External Link Click
4. Positions → Popup Open → Full Guide
5. Dictionary → Related Content → Newsletter Signup

-----------------------------------
PAGE 4 — SEO OPTIMIZATION REPORTS
-----------------------------------

Route:
`/admin/seo-reports`

Purpose:
Help optimize DZIRE content for search traffic.

For every content page, track:
- page title
- meta title
- meta description
- URL slug
- canonical URL
- H1 count
- word count
- internal links
- external links
- image alt text status
- schema markup status
- readability score placeholder
- SEO score placeholder
- keyword density
- missing metadata warnings
- duplicate title warning
- duplicate description warning

SEO report table:
Columns:
- page
- content type
- target keyword
- SEO score
- status
- missing fields
- last updated
- action button

Actions:
- edit metadata
- generate SEO suggestions
- view page
- run report
- export CSV

-----------------------------------
PAGE 5 — KEYWORD & TAG REPORTS
-----------------------------------

Route:
`/admin/keyword-tags`

Purpose:
Manage keywords, tags, content clusters, and internal linking.

Track:
- keyword
- tag
- category
- search volume placeholder
- difficulty placeholder
- assigned pages
- ranking URL
- content gap status
- internal link opportunities
- usage count
- click count
- conversion count

Tag categories:
- Positions
- Reviews
- Toys
- DZIRE Dolls
- Dictionary
- Stories
- Relationships
- Dating
- VIP
- Sponsors

Features:
- keyword clustering
- orphan tag detection
- unused tag report
- overused tag report
- suggested related tags
- internal link recommendations

-----------------------------------
PAGE 6 — NEWSLETTER USERS
-----------------------------------

Route:
`/admin/newsletter-users`

Purpose:
Manage email list and user interests.

Fields:
- id
- first name
- email
- signup source
- interests
- status
- confirmed email
- created date
- last opened
- last clicked
- tags
- consent timestamp

Interest tags:
- DZIRE Dolls
- Reviews
- Positions
- Stories
- VIP Exclusives
- Toy Discounts
- Product Reviews
- Publication Alerts

Admin actions:
- view subscriber
- edit tags
- export CSV
- mark unsubscribed
- send test email placeholder
- segment users

Segments:
- new subscribers
- review interested
- DZIRE Dolls interested
- VIP interested
- inactive subscribers
- high click users

-----------------------------------
PAGE 7 — MEMBERSHIP STATS
-----------------------------------

Route:
`/admin/membership-stats`

Track:
- total members
- free users
- VIP users
- canceled users
- trial users
- monthly recurring revenue placeholder
- churn rate placeholder
- conversion rate
- signup source
- upgrade source
- most viewed VIP content

Widgets:
- new members this week
- VIP conversions
- cancellations
- revenue placeholder
- locked content clicks
- VIP CTA clicks

Tables:
- member id
- email
- status
- plan
- signup date
- renewal date
- source
- last active

-----------------------------------
PAGE 8 — GEOGRAPHIC STATS
-----------------------------------

Route:
`/admin/geographic-stats`

Track geographic traffic:
- country
- region/state
- city placeholder
- sessions
- page views
- newsletter signups
- affiliate clicks
- VIP conversions
- top content by region

Charts:
- map visualization placeholder
- top countries table
- top states table
- conversion by region

Privacy:
- avoid storing exact address
- do not store precise geolocation unless user explicitly consents
- use approximate analytics only

-----------------------------------
PAGE 9 — AGE RANGE STATS
-----------------------------------

Route:
`/admin/age-range-stats`

Track only age ranges, not exact birthdates unless needed for legal age verification.

Age ranges:
- 18–24
- 25–34
- 35–44
- 45–54
- 55+

Track:
- content preference by age range
- newsletter interest by age range
- position guide engagement
- review engagement
- DZIRE Dolls engagement
- VIP conversion by age range

Privacy:
- keep demographic collection optional
- clearly label as self-reported
- do not expose individual demographic records in public views

-----------------------------------
PAGE 10 — SEARCH ENGINE RANKINGS
-----------------------------------

Route:
`/admin/search-rankings`

Purpose:
Track search engine visibility.

Fields:
- keyword
- target page
- current rank
- previous rank
- rank change
- search engine
- country
- device
- date checked
- clicks placeholder
- impressions placeholder
- CTR placeholder

Features:
- ranking movement table
- keyword winners
- keyword losers
- content needing update
- pages with ranking drops
- pages with no target keyword
- export report

Future integrations:
- Google Search Console
- Semrush
- Ahrefs
- DataForSEO

-----------------------------------
PAGE 11 — CONTENT SCHEDULE + SOCIAL INTEGRATIONS
-----------------------------------

Route:
`/admin/schedule`

Purpose:
List and manage all new content across DZIRE and connected social platforms.

Calendar Views:
- monthly
- weekly
- list
- kanban

Content types:
- article
- review
- position guide
- dictionary term
- DZIRE Doll spotlight
- story
- newsletter
- social post
- sponsor placement
- VIP drop

Schedule fields:
- title
- content type
- status
- publish date
- author/editor
- assigned tags
- target keyword
- related sponsor
- related DZIRE Doll
- social platforms
- newsletter inclusion
- VIP inclusion

Statuses:
- idea
- draft
- editing
- scheduled
- published
- archived

Social integrations:
- X/Twitter placeholder
- Bluesky placeholder
- Instagram placeholder
- Threads placeholder
- Reddit placeholder
- TikTok placeholder
- Pinterest placeholder
- Email newsletter placeholder

Social post fields:
- platform
- caption
- image asset
- link
- scheduled time
- status
- engagement stats placeholder

Admin actions:
- create scheduled content
- attach social post
- mark as published
- duplicate content plan
- export schedule
- view calendar

-----------------------------------
PAGE 12 — POST WEB CONTENT WITH WYSIWYG EDITOR
-----------------------------------

Route:
`/admin/post-content`

Purpose:
Create and edit all public content with a WYSIWYG editor.

Editor:
- WYSIWYG rich text editor
- title field
- subtitle field
- slug field
- excerpt field
- featured image
- category
- tags
- target keyword
- meta title
- meta description
- canonical URL
- content body
- sponsor placement selector
- affiliate link selector
- related DZIRE Doll selector
- related product selector
- related position selector
- related dictionary term selector
- publish status
- schedule date
- preview button
- save draft button
- publish button

Recommended editor:
- CKEditor 5
- TipTap
- TinyMCE
- Lexical

Required features:
- image upload placeholder
- embed video placeholder
- internal link picker
- affiliate CTA block
- sponsor ad block
- newsletter CTA block
- review score block
- position score block
- DZIRE Doll profile embed
- SEO checklist sidebar

-----------------------------------
PAGE 13 — POST TEMPLATES
-----------------------------------

Route:
`/admin/post-templates`

Set up 7 reusable content templates.

Template 1: Profile Spotlight
Use for DZIRE Dolls and creator features.
Fields:
- creator name
- profile image
- bio
- interview questions
- feature quote
- vibe tags
- social/platform links
- exclusive promo
- gallery teaser
- related stories
- CTA block

Template 2: Longform Essay / Cover Story
Use for major editorial pieces.
Fields:
- cover title
- subtitle
- author
- hero image
- opening scene
- main essay sections
- pull quotes
- related articles
- newsletter CTA
- sponsor placement

Template 3: General Article
Use for standard blog/editorial posts.
Fields:
- title
- excerpt
- category
- body sections
- key takeaways
- related content
- SEO metadata
- CTA block

Template 4: Toy / Product Review
Use for product reviews.
Fields:
- product name
- category
- product image
- quick verdict
- pros
- cons
- scoring breakdown
- affiliate CTA
- sponsor disclosure
- comparison table
- FAQ
- related products

Scoring:
- Ease of Use
- Build Quality
- Beginner Friendly
- Value Score
- Comfort / Experience
- Overall Score

Template 5: Position Guide
Use for educational position content.
Fields:
- position name
- image/illustration
- keywords
- short description
- comfort score
- difficulty score
- energy score
- intimacy score
- best for
- comfort tips
- related positions
- related products
- related dictionary terms
- popup preview content

Template 6: Sex Secrets / Tips
Use for short engaging advice content.
Fields:
- title
- secret/tip number
- short hook
- main explanation
- caution/consent note
- related guide
- related review
- newsletter CTA

Template 7: Dictionary Term
Use for sex lingo dictionary.
Fields:
- term
- pronunciation
- category
- simple definition
- expanded explanation
- related terms
- related articles
- related reviews
- related positions
- FAQ

Admin actions:
- create from template
- duplicate template
- edit template fields
- preview template
- assign template to content type

-----------------------------------
PAGE 14 — AFFILIATES / SPONSORS / ADS DASHBOARD
-----------------------------------

Route:
`/admin/monetization`

Purpose:
Manage affiliates, sponsors, ads, placements, and performance.

Sections:
1. Affiliates
2. Sponsors
3. Ads & Placements
4. Activity
5. Revenue Placeholder
6. Campaign Tracking

Affiliate Fields:
- affiliate name
- network
- contact name
- contact email
- tracking link
- commission type
- commission rate
- cookie duration
- status
- notes

Sponsor Fields:
- sponsor name
- company
- contact person
- contact email
- campaign name
- start date
- end date
- placement type
- agreed deliverables
- status
- notes

Ad Placement Fields:
- placement name
- page location
- content type
- image/banner
- destination URL
- impressions
- clicks
- CTR
- start date
- end date
- active status

Placement Types:
- homepage hero
- review page banner
- review detail CTA
- newsletter sponsor
- DZIRE Doll profile sponsor
- dictionary page sponsor
- position guide sponsor
- story page sponsor
- sidebar ad
- footer ad

Dashboard Metrics:
- total affiliate clicks
- total sponsor clicks
- total ad impressions
- top converting placement
- top sponsor
- top affiliate
- inactive campaigns
- expiring campaigns

-----------------------------------
PAGE 15 — DZIRE DOLLS MODEL ADMIN PAGE
-----------------------------------

Route:
`/admin/dzire-dolls`

Purpose:
Manage DZIRE Dolls creator profiles, stats, clicks, promos, and sponsor placements.

Creator Profile Fields:
- model id
- display name
- stage name
- bio
- profile image
- gallery teaser images
- tags
- category/vibe
- sponsored by DZIRE flag
- featured status
- homepage placement status
- newsletter feature status
- VIP preview status
- external platform links
- promo link
- discount code
- interview content
- publication appearances
- status

Stats:
- profile views
- gallery teaser views
- promo clicks
- external link clicks
- newsletter clicks
- homepage feature clicks
- VIP preview clicks
- conversion estimate placeholder
- top referrer
- top content connection

Promo Tracking:
- promo name
- promo code
- start date
- end date
- destination URL
- clicks
- CTR
- estimated conversions
- notes

Tables:
- all DZIRE Dolls
- featured this month
- most clicked
- best promo performance
- pending profiles
- inactive profiles

Actions:
- create model profile
- edit model profile
- feature on homepage
- add promo
- attach interview
- attach gallery teaser
- view stats
- export creator report

Important Positioning:
DZIRE Dolls are sponsored creator spotlights. DZIRE provides discovery, branding, editorial features, newsletter mentions, homepage placement, and tracked external links. DZIRE does not need to host full creator content libraries.

-----------------------------------
DATABASE TABLES TO CREATE
-----------------------------------

Create backend database tables for:

Auth:
- admin_users
- admin_roles
- admin_sessions
- admin_login_attempts

Content:
- content_posts
- content_templates
- content_categories
- content_tags
- content_tag_map
- media_assets
- seo_metadata

Positions:
- position_guides
- position_scores
- position_related_items
- position_popup_questions

Reviews:
- product_reviews
- review_scores
- review_awards
- review_affiliate_links
- product_categories

Dictionary:
- dictionary_terms
- dictionary_categories
- dictionary_related_terms

DZIRE Dolls:
- dzire_dolls
- dzire_doll_links
- dzire_doll_promos
- dzire_doll_stats
- dzire_doll_gallery_teasers
- dzire_doll_interviews

Newsletter:
- newsletter_users
- newsletter_segments
- newsletter_user_interests
- newsletter_campaigns

Membership:
- members
- membership_plans
- membership_events
- vip_content_access

Analytics:
- analytics_events
- page_views
- click_events
- search_events
- conversion_events
- geographic_stats
- demographic_stats

SEO:
- seo_reports
- keyword_reports
- search_rankings

Schedule:
- content_schedule
- social_posts
- social_integrations

Monetization:
- affiliates
- sponsors
- ad_placements
- campaigns
- campaign_performance

Settings:
- site_settings
- admin_audit_logs

-----------------------------------
API ROUTES TO CREATE
-----------------------------------

Auth:
POST /api/admin/login
POST /api/admin/logout
GET /api/admin/me

Dashboard:
GET /api/admin/dashboard/summary

Stats:
GET /api/admin/site-stats
GET /api/admin/analytics
GET /api/admin/geographic-stats
GET /api/admin/age-range-stats

SEO:
GET /api/admin/seo-reports
POST /api/admin/seo-reports/run
GET /api/admin/keyword-tags
GET /api/admin/search-rankings

Newsletter:
GET /api/admin/newsletter-users
POST /api/admin/newsletter-users
PATCH /api/admin/newsletter-users/:id
GET /api/admin/newsletter-segments

Membership:
GET /api/admin/membership-stats
GET /api/admin/members

Schedule:
GET /api/admin/schedule
POST /api/admin/schedule
PATCH /api/admin/schedule/:id
GET /api/admin/social-posts
POST /api/admin/social-posts

Content:
GET /api/admin/content
POST /api/admin/content
GET /api/admin/content/:id
PATCH /api/admin/content/:id
DELETE /api/admin/content/:id
POST /api/admin/content/:id/publish
POST /api/admin/content/:id/preview

Templates:
GET /api/admin/templates
POST /api/admin/templates
PATCH /api/admin/templates/:id

Monetization:
GET /api/admin/affiliates
POST /api/admin/affiliates
GET /api/admin/sponsors
POST /api/admin/sponsors
GET /api/admin/ad-placements
POST /api/admin/ad-placements
GET /api/admin/campaign-performance

DZIRE Dolls:
GET /api/admin/dzire-dolls
POST /api/admin/dzire-dolls
GET /api/admin/dzire-dolls/:id
PATCH /api/admin/dzire-dolls/:id
GET /api/admin/dzire-dolls/:id/stats
POST /api/admin/dzire-dolls/:id/promos
PATCH /api/admin/dzire-dolls/:id/promos/:promoId

Tracking:
POST /api/track/page-view
POST /api/track/click
POST /api/track/search
POST /api/track/conversion
POST /api/track/promo-click
POST /api/track/affiliate-click

-----------------------------------
SECURITY REQUIREMENTS
-----------------------------------

MVP:
- temporary admin login allowed for local testing only
- username: admin
- password: admin
- show warning to change credentials

Production:
- hash passwords with bcrypt or Argon2
- use secure session cookies or JWT with refresh token strategy
- rate-limit login attempts
- protect all `/admin` routes
- validate all input
- sanitize WYSIWYG HTML
- protect against XSS
- protect against CSRF if using cookies
- use audit logs for admin actions
- never expose admin data publicly
- hide admin button in production unless user is authenticated or route is secret

-----------------------------------
TECH STACK OPTIONS
-----------------------------------

Preferred backend options:
- FastAPI + PostgreSQL
- Node/Fastify + Po
