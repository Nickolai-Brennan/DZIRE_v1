# STEP 6 — DESIGN SYSTEM + BRAND GUIDELINES

Step 6 defines the brand identity, reusable UI system, public-facing layouts, admin dashboard styling, and social media design rules.

This step creates:
- Brand foundation
- Visual identity rules
- Design tokens
- Typography system
- Color system
- Component library
- CMS content layouts
- Admin dashboard layouts
- VIP/sponsor/affiliate styling
- Social media asset guidelines
- Accessibility and responsive rules

---

## STEP 6 OBJECTIVE

Create a consistent visual system across the full project.

```text
CMS + Admin System
→ Brand Guidelines
→ Design Tokens
→ UI Components
→ Layout Patterns
→ Social Media Style


---

STEP 6 FILE STRUCTURE ADDITIONS

frontend/src/design-system/
frontend/src/design-system/tokens/
frontend/src/design-system/components/
frontend/src/design-system/layouts/
frontend/src/design-system/patterns/

frontend/public/brand/

docs/brand-guidelines.md
docs/design-system.md
docs/ui-components.md
docs/social-media-style-guide.md
docs/admin-dashboard-style.md

.github/agents/design-system-agent.md
.github/agents/brand-guidelines-agent.md
.github/agents/ui-component-agent.md
.github/agents/social-graphics-agent.md

skills/design-system-builder/
skills/brand-guidelines-builder/
skills/ui-component-builder/
skills/social-graphics-builder/


---

1. DESIGN SYSTEM STRUCTURE

frontend/src/design-system/
├── tokens/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── shadows.ts
│   ├── radii.ts
│   └── z-index.ts
│
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Modal.tsx
│   ├── Tabs.tsx
│   ├── Table.tsx
│   ├── DataTable.tsx
│   ├── StatCard.tsx
│   ├── ChartCard.tsx
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── FormField.tsx
│   ├── SearchBar.tsx
│   ├── FilterPanel.tsx
│   └── EmptyState.tsx
│
├── layouts/
│   ├── PublicLayout.tsx
│   ├── AdminLayout.tsx
│   ├── ArticleLayout.tsx
│   ├── DashboardLayout.tsx
│   └── LandingPageLayout.tsx
│
├── patterns/
│   ├── BlogCardGrid.tsx
│   ├── HeroSection.tsx
│   ├── FeatureGrid.tsx
│   ├── PricingBlock.tsx
│   ├── SponsorStrip.tsx
│   ├── NewsletterBlock.tsx
│   ├── SocialEmbedWall.tsx
│   └── PaywallBlock.tsx
│
└── README.md


---

2. BRAND FOUNDATION

Brand Name

[PROJECT_NAME]

Positioning

A modern digital content platform built for publishing, monetization, audience growth, analytics, and premium member experiences.

Personality

Bold
Modern
Clean
Editorial
Data-aware
Premium
Trustworthy
High-energy

Brand Promise

Deliver high-quality content, smarter discovery, premium experiences, and measurable growth for audiences, creators, sponsors, and partners.


---

3. LOGO SYSTEM

Logo Variants

Primary Logo
Horizontal Logo
Icon Mark
Monogram
Light Version
Dark Version
Social Avatar
Favicon
Watermark

Logo File Structure

frontend/public/brand/
├── logo-primary.svg
├── logo-horizontal.svg
├── logo-icon.svg
├── logo-light.svg
├── logo-dark.svg
├── favicon.svg
└── watermark.svg

Logo Rules

Keep clear space around logo
Do not stretch or distort
Do not use on low-contrast backgrounds
Use icon mark for small spaces
Use full logo for headers and official materials
Use watermark only on branded media assets


---

4. COLOR SYSTEM

Color Roles

Primary        → Main brand color
Secondary      → Supporting brand color
Accent         → CTAs and highlights
Neutral        → Text, backgrounds, borders
Success        → Positive states
Warning        → Attention states
Danger         → Errors/destructive actions
Info           → Notices and helper states
VIP            → Premium subscription elements
Sponsor        → Sponsor/affiliate highlights

Token File

frontend/src/design-system/tokens/colors.ts

export const colors = {
  primary: {
    50: "#F5F3FF",
    100: "#EDE9FE",
    500: "#7C3AED",
    600: "#6D28D9",
    700: "#5B21B6",
    900: "#2E1065"
  },
  secondary: {
    50: "#ECFEFF",
    100: "#CFFAFE",
    500: "#06B6D4",
    600: "#0891B2",
    900: "#164E63"
  },
  accent: {
    500: "#F59E0B",
    600: "#D97706"
  },
  neutral: {
    50: "#FAFAFA",
    100: "#F4F4F5",
    200: "#E4E4E7",
    500: "#71717A",
    700: "#3F3F46",
    900: "#18181B"
  },
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
  info: "#2563EB",
  vip: "#C084FC",
  sponsor: "#FACC15"
}


---

5. TYPOGRAPHY SYSTEM

Font Roles

Display Font  → Headlines, hero titles, campaign graphics
Body Font     → Articles, admin dashboard, general UI
Mono Font     → Code, IDs, metrics, logs

Recommended Pairing

Display: Barlow Condensed
Body: Inter
Mono: JetBrains Mono

Token File

frontend/src/design-system/tokens/typography.ts

export const typography = {
  display: "Barlow Condensed, sans-serif",
  body: "Inter, sans-serif",
  mono: "JetBrains Mono, monospace",
  scale: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "60px"
  }
}


---

6. SPACING / RADIUS / SHADOW TOKENS

spacing.ts

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px"
}

radii.ts

export const radii = {
  sm: "6px",
  md: "10px",
  lg: "14px",
  xl: "20px",
  "2xl": "28px",
  full: "999px"
}

shadows.ts

export const shadows = {
  sm: "0 1px 2px rgba(0,0,0,0.06)",
  md: "0 6px 16px rgba(0,0,0,0.08)",
  lg: "0 12px 32px rgba(0,0,0,0.12)",
  glow: "0 0 24px rgba(124,58,237,0.35)"
}


---

7. CORE UI COMPONENTS

Button
Card
Badge
Input
Textarea
Select
Checkbox
Toggle
Modal
Drawer
Tabs
Table
DataTable
Dropdown
Tooltip
Alert
Toast
Progress
StatCard
ChartCard
Pagination
SearchBar
FilterPanel
EmptyState


---

8. BUTTON VARIANTS

Primary
Secondary
Accent
Ghost
Outline
Danger
VIP
Sponsor

Button Rules

Primary   → main action
Accent    → promotional action
VIP       → subscription action
Sponsor   → sponsor/affiliate action
Danger    → destructive action only
Ghost     → secondary navigation
Outline   → lower-priority action


---

9. CARD VARIANTS

Article Card
Feature Card
Sponsor Card
Affiliate Product Card
VIP Card
Stat Card
Chart Card
Admin Tool Card
Social Embed Card


---

10. CONTENT DESIGN SYSTEM

Blog Card Fields

Title
Excerpt
Category
Tags
Author
Published Date
Featured Image
Read Time
SEO Score optional
VIP badge optional
Sponsor badge optional

Article Page Layout

Header
Hero Image
Title
Subtitle
Author Meta
Social Share
Article Body
Affiliate Blocks
Sponsor Blocks
Related Posts
Newsletter Signup
Comments optional

Article Templates

General Article
Longform Essay
Review
Guide
News Post
Sponsor Spotlight
Affiliate Product Post
VIP Exclusive
Social Roundup


---

11. ADMIN DASHBOARD DESIGN SYSTEM

Dashboard Layout

Left Sidebar
Top Header
KPI Row
Main Chart Area
Data Tables
Action Panels
Filters

Admin Components

AdminSidebar
AdminHeader
KpiCard
MetricTrend
ChartPanel
DataTable
FilterBar
DateRangePicker
ExportButton
StatusBadge
RoleBadge

Admin Style Rules

Prioritize readability
Use compact spacing
Use clear status colors
Keep KPI cards uniform
Use filters and search on data-heavy pages
Keep destructive actions visually separate


---

12. MARKETING + AD DASHBOARD DESIGN

Marketing Cards

Traffic Sources
Campaign Performance
Newsletter Growth
Conversion Rate
Top Landing Pages
Top Referrers
Social Channel Performance

Advertising Cards

Sponsor Impressions
Sponsor Clicks
CTR
Campaign Revenue
Active Placements
Expiring Campaigns
Affiliate Clicks
Estimated Commission


---

13. SEO DASHBOARD DESIGN

SEO Components

SEOScoreCard
KeywordList
TagCloud
MetaAuditPanel
PostVisibilityTable
InternalLinkPanel
RecommendationBox

SEO Status

Excellent   → 90–100
Good        → 75–89
Needs Work  → 60–74
Poor        → 0–59


---

14. VIP DESIGN SYSTEM

VIP Rules

Use premium accent color
Add subtle glow or border
Use badge labels
Keep paywalls clean and persuasive
Avoid clutter

VIP Components

VIPBadge
VIPPlanCard
VIPPaywall
VIPFeatureList
VIPSubscribeButton
MemberOnlyLock


---

15. AFFILIATE + SPONSOR DESIGN

Rules

Clearly label sponsored content
Keep sponsor cards distinct but not intrusive
Track placement performance
Use consistent badges
Keep affiliate CTAs visible but not spammy

Components

SponsorBanner
SponsorCard
AffiliateBox
ProductCTA
CouponCodeBox
DisclosureLabel


---

16. SOCIAL MEDIA STYLE GUIDE

Social Graphic Types

Quote Card
Article Promo
New Post Announcement
VIP Promo
Sponsor Promo
Newsletter Signup
Stat Graphic
Carousel Slide
Story Graphic

Social Design Rules

Keep consistent logo placement
Use bold headlines
Use one clear CTA
Use platform-specific dimensions
Maintain color consistency
Keep templates reusable

Suggested Sizes

Instagram Square: 1080x1080
Instagram Story: 1080x1920
X / Twitter Post: 1600x900
Facebook Post: 1200x630
YouTube Thumbnail: 1280x720
TikTok Cover: 1080x1920


---

17. IMAGE + MEDIA GUIDELINES

Image Rules

Use consistent aspect ratios
Optimize file sizes
Add alt text
Avoid blurry images
Use branded overlays when needed
Keep sponsor/affiliate disclosures visible

Image Ratios

Hero Image: 16:9
Article Card: 4:3
Profile Card: 1:1
Social Preview: 1.91:1
Vertical Feature: 9:16


---

18. ACCESSIBILITY RULES

Use sufficient color contrast
Support keyboard navigation
Show visible focus states
Add alt text for images
Use semantic headings
Use descriptive buttons
Tie error messages to fields
Avoid color-only status indicators


---

19. RESPONSIVE DESIGN RULES

Breakpoints

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
}

Behavior

Mobile first
Collapse sidebars
Stack cards on mobile
Keep admin tables scrollable
Keep CTAs visible
Compress KPI grids on small screens


---

20. NEW AGENTS FOR STEP 6

design-system-agent

Purpose:

Build design tokens

Standardize UI components

Maintain interface consistency


brand-guidelines-agent

Purpose:

Define visual identity, logo rules, colors, typography, and media usage


ui-component-agent

Purpose:

Create reusable buttons, cards, forms, tables, layouts, and dashboard components


social-graphics-agent

Purpose:

Create social media asset rules, templates, and graphic standards



---

21. NEW SKILLS FOR STEP 6

skills/design-system-builder/
skills/brand-guidelines-builder/
skills/ui-component-builder/
skills/social-graphics-builder/


---

22. STEP 6 BUILD ORDER

1. Define brand foundation
2. Define logo rules
3. Define color tokens
4. Define typography tokens
5. Define spacing/radius/shadow tokens
6. Build core UI components
7. Build layout components
8. Build CMS content patterns
9. Build admin dashboard patterns
10. Build VIP/sponsor/affiliate patterns
11. Build social media style rules
12. Build accessibility rules
13. Build responsive rules
14. Add design agents
15. Add design skills
16. Create design docs


---

23. STEP 6 TASK LIST

T-076 Create brand guidelines doc
T-077 Create design system doc
T-078 Create color tokens
T-079 Create typography tokens
T-080 Create spacing tokens
T-081 Create radius tokens
T-082 Create shadow tokens
T-083 Create Button component
T-084 Create Card component
T-085 Create Badge component
T-086 Create FormField component
T-087 Create Modal component
T-088 Create DataTable component
T-089 Create StatCard component
T-090 Create AdminLayout
T-091 Create PublicLayout
T-092 Create ArticleLayout
T-093 Create BlogCard pattern
T-094 Create SponsorCard pattern
T-095 Create VIPPaywall pattern
T-096 Create social media style guide
T-097 Create admin dashboard style guide
T-098 Add design-system-agent
T-099 Add brand-guidelines-agent
T-100 Run Step 6 review


---

STEP 6 COMPLETION CHECKLIST

[ ] Brand foundation defined
[ ] Logo rules defined
[ ] Color system created
[ ] Typography system created
[ ] Spacing/radius/shadow system created
[ ] Core UI components defined
[ ] Layout system defined
[ ] Content card system defined
[ ] Admin dashboard UI system defined
[ ] Marketing/advertising dashboard style defined
[ ] SEO dashboard style defined
[ ] VIP design system defined
[ ] Affiliate/sponsor design rules defined
[ ] Social media style guide created
[ ] Accessibility rules added
[ ] Responsive rules added
[ ] Design agents added
[ ] Design skills added
[ ] Docs added


---

STEP 6 COMPLETION STANDARD

Step 6 is complete when the project has:

Consistent visual identity
Reusable design tokens
Reusable UI components
Public-facing content layouts6
Admin dashboard layouts
VIP/sponsor/affiliate styles
Social content guidelines
Accessibility standards
Responsive behavior rules


---

NEXT STEP

Step 7 should define authentication, user accounts, roles, permissions, admin access, VIP membership access, and protected content rules.Step 
