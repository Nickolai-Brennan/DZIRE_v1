Create the full frontend system for DZIRE, a premium dark-mode adult lifestyle publication, creator discovery hub, educational guide platform, review engine, newsletter funnel, and affiliate/sponsor monetization web app.

Build the frontend as a tasteful, non-explicit, sponsor-safe adult lifestyle platform.

Core stack:
- React
- Vite
- TypeScript
- Tailwind CSS
- TanStack Router
- TanStack Query
- TanStack Table
- Recharts
- TipTap or CKEditor 5 for admin WYSIWYG
- Framer Motion for subtle animations
- Lucide React icons

Design style:
- Dark luxury UI
- Black / charcoal / deep plum backgrounds
- Rose red CTAs
- Gold trophy accents
- Glassmorphism cards
- Rounded corners
- Premium magazine spacing
- Bold editorial headlines
- Clean readable body text
- Mobile-first
- Placeholder images only
- Non-explicit presentation

Color palette:
- Background: #09090B
- Surface: #15151C
- Surface Alt: #1D1D26
- Primary Accent: #E11D48
- Accent Pink: #F43F5E
- Gold: #F5C451
- Text Primary: #F8FAFC
- Text Muted: #A1A1AA
- Border: rgba(255,255,255,0.08)

Global frontend requirements:
- Responsive layout
- Sticky header
- Footer
- Reusable page shells
- Reusable cards
- Search/filter components
- Score badges
- Trophy cards
- Newsletter modules
- Admin button bottom-right
- Admin login modal
- Protected admin layout
- Public pages and private admin pages
- Clean file structure
- Component-first architecture
- Mock data first, API-ready later

-----------------------------------
PUBLIC FRONTEND PAGES
-----------------------------------

Create these public pages:

1. Homepage
Route: `/`

Sections:
- Hero
- Featured DZIRE Dolls
- Trending Positions
- Trophy Hall Preview
- Dictionary Preview
- Latest Stories
- Newsletter Signup
- VIP CTA

Hero copy:
Title: “Desire, Discovery, and Digital Intimacy”
Subtitle: “DZIRE is a premium adult lifestyle publication for guides, reviews, creator spotlights, stories, and curated experiences.”
CTAs:
- Explore DZIRE
- Join Newsletter

2. Positions Page
Route: `/positions`

Create a searchable, filterable position archive.

Sections:
- Page hero
- Search bar
- Filter chips
- Category cards
- Position card grid
- Sticky filters
- Newsletter CTA

Position card fields:
- image placeholder
- title
- short description
- keywords
- comfort score
- difficulty score
- energy score
- intimacy score
- tags
- View Guide button
- Quick View button

3. Position Hover Popup / Quick View Modal
Component:
`PositionQuickViewModal`

Trigger:
- hover or click on desktop
- tap on mobile

Layout:
Two-column modal.

Left side:
- large image placeholder
- position title
- keywords
- related positions
- related products
- related dictionary terms

Right side:
- quick description
- rating panel
- compatibility questions

Ratings:
- Comfort Score
- Difficulty Score
- Energy Level
- Intimacy Score
- Flexibility Needed
- Beginner Friendly
- Toy Compatibility
- Overall DZIRE Score

Compatibility questions:
- age range
- sex
- gender identity
- orientation
- experience level
- comfort priority
- partner setup

Keep these optional and privacy-conscious.

CTA buttons:
- Open Full Guide
- Save Position
- Find Similar
- Send to DZIRE Guide

4. Reviews Page
Route: `/reviews`

Sections:
- DZIRE Trophy Hall of Fame at top
- Reviews hero
- Trust badges
- Filter bar
- Product review grid
- Sponsor CTA banner

Trophy cards:
- Best Overall
- Best Beginner Pick
- Best Value
- Most Luxurious
- Best for Couples
- Editor’s Favorite

Product review card fields:
- image placeholder
- product name
- category
- ease of use score
- build quality score
- beginner friendly score
- value score
- overall score
- award badge
- Read Review CTA
- View Offer CTA

5. Review Detail Page
Route: `/reviews/:slug`

Sections:
- Product hero
- Quick verdict
- Score breakdown
- Pros and cons
- Best for
- Product overview
- Comparison table
- FAQ
- Related reviews
- Affiliate CTA blocks

6. DZIRE Dictionary Page
Route: `/dictionary`

Sections:
- Hero
- Search bar
- Alphabet navigation
- Featured terms
- Category filters
- Dictionary term grid
- Popular terms sidebar
- Newsletter CTA

Term card fields:
- term
- pronunciation
- category
- short definition
- related chips
- Read More CTA

7. Dictionary Term Detail Page
Route: `/dictionary/:slug`

Sections:
- Term hero
- Plain-English definition
- Expanded explanation
- Related terms
- Related positions
- Related reviews
- Related articles
- FAQ

8. DZIRE Dolls Page
Route: `/dzire-dolls`

Purpose:
Dedicated sponsored model / creator discovery page.

Sections:
- Hero
- Featured This Month
- Creator grid
- New Faces
- Most Viewed
- Editor’s Spotlight
- Upcoming Appearances
- Newsletter tie-in

Creator card fields:
- image placeholder
- creator name
- short bio
- vibe tags
- Sponsored by DZIRE badge
- Exclusive Promo pill
- View Profile CTA

9. DZIRE Doll Profile Page
Route: `/dzire-dolls/:slug`

Sections:
- Hero image
- creator name
- sponsored badge
- tagline
- tags
- external promo CTA
- about
- spotlight interview
- gallery teaser
- favorite products
- recent features
- platform links
- similar DZIRE Dolls

Important:
This is a traffic funnel, not a hosted content library.

10. Stories Page
Route: `/stories`

Sections:
- Hero
- Category filters
- Story card grid
- Fiction contest module
- Newsletter CTA

Story card fields:
- cover placeholder
- title
- author
- category
- teaser
- rating
- popularity
- Read Story CTA

11. Story Detail Page
Route: `/stories/:slug`

Sections:
- Story hero
- Reading layout
- Author card
- Rating module
- Related stories
- Tip author placeholder
- Newsletter CTA

12. Magazine Page
Route: `/magazine`

Sections:
- DZIRE Monthly hero
- Featured launch issue
- Issue grid
- Table of contents preview
- Sponsor placement preview

13. Newsletter Page
Route: `/newsletter`

Sections:
- Hero signup
- Benefit cards
- Interest chips
- Social proof
- Signup form repeated at bottom

Newsletter copy:
“Get exclusive content from DZIRE Dolls, discounts on toys and reviews, and early access to upcoming publication stories.”

Fields:
- first name
- email
- interest chips

14. VIP Page
Route: `/vip`

Sections:
- VIP hero
- Benefits
- Pricing card placeholder
- Locked content preview
- FAQ

15. Contact / Collaborate Page
Route: `/contact`

Cards:
- Become a DZIRE Doll
- Submit a Story
- Send Product for Review
- Sponsor a Feature
- Affiliate Partnership
- VIP Support
- General Questions
- Press / Media

16. Search Results Page
Route: `/search`

Sections:
- Search bar
- Result filters
- Results list
- Popular searches
- Featured DZIRE Doll
- Newsletter signup

-----------------------------------
ADMIN FRONTEND
-----------------------------------

Add an admin button fixed bottom-right on every public page.

Admin Button:
- small circular button
- lock/admin icon
- bottom-right fixed
- opens admin login modal or `/admin/login`
- dev-only visibility preferred
- tooltip: “Admin”

Temporary admin login:
- username: admin
- password: admin
- show warning:
“Temporary admin credentials. Change before production.”

Admin routes:
- `/admin/login`
- `/admin/dashboard`
- `/admin/site-stats`
- `/admin/analytics`
- `/admin/seo-reports`
- `/admin/keyword-tags`
- `/admin/newsletter-users`
- `/admin/membership-stats`
- `/admin/geographic-stats`
- `/admin/age-range-stats`
- `/admin/search-rankings`
- `/admin/schedule`
- `/admin/post-content`
- `/admin/post-templates`
- `/admin/monetization`
- `/admin/dzire-dolls`
- `/admin/settings`

Admin layout:
- sidebar navigation
- top bar
- search admin data
- quick create button
- notifications
- logout button

Admin dashboard widgets:
- total page views
- active users
- newsletter signups
- VIP members
- affiliate clicks
- sponsor clicks
- ad impressions
- review clicks
- DZIRE Doll profile views
- top content
- recent activity
- scheduled posts

Admin pages:

1. Dashboard
Business overview cards and charts.

2. Site Stats
Traffic charts, top pages, referrers, device types.

3. Analytics
Events, click tracking, funnels, CTA performance.

4. SEO Reports
Table with page title, meta description, slug, target keyword, SEO score, warnings.

5. Keyword & Tag Reports
Keyword clusters, tag usage, internal link suggestions.

6. Newsletter Users
Subscriber table with filters, interests, signup source, status.

7. Membership Stats
VIP users, free users, conversion rate, locked content clicks.

8. Geographic Stats
Country, state, region, sessions, conversions.

9. Age Range Stats
Self-reported age range analytics:
- 18–24
- 25–34
- 35–44
- 45–54
- 55+

10. Search Rankings
Keyword ranking tracker.

11. Schedule + Social Integrations
Calendar, content list, social post planner.

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

Social platforms placeholders:
- X
- Bluesky
- Instagram
- Threads
- Reddit
- TikTok
- Pinterest
- Email

12. Post Web Content
WYSIWYG editor page.

Fields:
- title
- subtitle
- slug
- excerpt
- featured image
- category
- tags
- target keyword
- meta title
- meta description
- canonical URL
- content body
- sponsor selector
- affiliate link selector
- related DZIRE Doll selector
- related product selector
- related position selector
- publish status
- schedule date
- preview
- save draft
- publish

Editor blocks:
- text
- image
- video embed
- affiliate CTA
- sponsor ad
- newsletter CTA
- review score block
- position score block
- DZIRE Doll profile embed
- SEO checklist sidebar

13. Post Templates
Create 7 template cards:
- Profile Spotlight
- Longform Essay / Cover Story
- General Article
- Toy / Product Review
- Position Guide
- Sex Secrets / Tips
- Dictionary Term

Each template card:
- title
- description
- fields preview
- Create From Template button
- Edit Template button

14. Monetization Dashboard
Sections:
- Affiliates
- Sponsors
- Ads & Placements
- Campaigns
- Activity
- Revenue placeholder

Tables:
- affiliate links
- sponsor campaigns
- ad placements
- campaign performance

15. DZIRE Dolls Admin
Manage model profiles, stats, clicks, promos.

Table fields:
- model name
- status
- featured
- profile views
- promo clicks
- external link clicks
- newsletter clicks
- active promo
- actions

Actions:
- create profile
- edit profile
- feature on homepage
- add promo
- attach interview
- attach gallery teaser
- view stats

-----------------------------------
FRONTEND COMPONENTS
-----------------------------------

Create reusable components:

Layout:
- AppShell
- PublicLayout
- AdminLayout
- Header
- Footer
- MobileNav
- AdminSidebar
- AdminTopbar
- PageHero

Cards:
- FeatureCard
- ArticleCard
- PositionCard
- PositionQuickViewModal
- ReviewCard
- TrophyCard
- ProductScoreCard
- DictionaryTermCard
- DollCard
- StoryCard
- MagazineIssueCard
- NewsletterCard
- VipPreviewCard
- SponsorPlacementCard

Forms:
- SearchBar
- FilterChips
- NewsletterForm
- ContactForm
- AdminLoginForm
- ContentEditorForm
- CompatibilityQuestionForm

Data Display:
- ScorePill
- ScoreCircle
- RatingBar
- StatCard
- AdminTable
- ChartCard
- FunnelChart
- ComparisonTable
- SEOChecklist
- CalendarView

Admin:
- AdminMetricCard
- AdminDataTable
- AdminFilterBar
- AdminContentEditor
- AdminTemplateCard
- AdminScheduleCalendar
- AdminActivityFeed
- AdminPromoTracker

-----------------------------------
MOCK DATA
-----------------------------------

Create mock data files for:
- positions
- reviews
- dictionary terms
- DZIRE Dolls
- stories
- magazine issues
- newsletter segments
- admin stats
- SEO reports
- keyword reports
- sponsors
- affiliates
- ad placements
- schedule items
- analytics events

Use realistic placeholder content but keep it tasteful and non-explicit.

-----------------------------------
FILE STRUCTURE
-----------------------------------

Use this structure:

src/
  app/
    router.tsx
    routes/
      public/
      admin/
  components/
    layout/
    cards/
    forms/
    modals/
    charts/
    admin/
    editor/
    ui/
  data/
    mockPositions.ts
    mockReviews.ts
    mockDictionary.ts
    mockDolls.ts
    mockStories.ts
    mockMagazine.ts
    mockAdminStats.ts
    mockSeoReports.ts
    mockSchedule.ts
    mockMonetization.ts
  hooks/
    useAuth.ts
    useAdminAuth.ts
    useTracking.ts
    useFilters.ts
  lib/
    api.ts
    tracking.ts
    formatters.ts
    constants.ts
  styles/
    globals.css
  types/
    content.ts
    analytics.ts
    admin.ts
    monetization.ts
    dolls.ts

-----------------------------------
TRACKING EVENTS
-----------------------------------

Create frontend tracking helpers for:
- page_view
- cta_click
- newsletter_signup
- affiliate_click
- sponsor_click
- doll_profile_view
- doll_promo_click
- position_popup_open
- position_full_guide_click
- review_offer_click
- search_query
- filter_used
- vip_cta_click

For MVP, log events to console and store mock state.
Make it API-ready for future backend route:
POST `/api/track/event`

-----------------------------------
ACCESSIBILITY
-----------------------------------

Requirements:
- keyboard navigable modals
- focus states
- aria labels for buttons
- readable contrast
- semantic headings
- form labels
- modal close button
- escape key closes modals
- mobile tap targets large enough

-----------------------------------
MOBILE REQUIREMENTS
-----------------------------------

Mobile-first behavior:
- header collapses to hamburger
- card grids become single column
- position popup becomes bottom sheet
- admin tables scroll horizontally
- filters collapse into drawer
- sticky CTA row for review and position detail pages

-----------------------------------
FINAL OUTPUT
-----------------------------------

Generate the complete frontend scaffold with:
1. React + Vite + TypeScript setup
2. Tailwind theme config
3. Public routes
4. Admin routes
5. Reusable components
6. Mock data
7. Position quick-view modal
8. Reviews trophy hall
9. DZIRE Dolls pages
10. Newsletter system
11. Admin login
12. Admin dashboard pages
13. WYSIWYG editor placeholder
14. Tracking helpers
15. Clean responsive UI

Build lean first.
Use mock data.
Make every component API-ready.
Keep the design premium, tasteful, non-explicit, and launch-ready.
