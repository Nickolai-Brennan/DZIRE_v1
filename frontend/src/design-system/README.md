# DZIRE Design System

A consistent visual system for all DZIRE interfaces — public site, admin dashboard, CMS, and marketing pages.

## Quick Start

```ts
// Import tokens
import { colors, typography, spacing, radii, shadows, zIndex, breakpoints } from './tokens';

// Import components
import { Button, Card, Badge, Modal, Tabs, StatCard } from './components';

// Import layouts
import { PublicLayout, AdminLayout, ArticleLayout, DashboardLayout } from './layouts';

// Import patterns
import { HeroSection, BlogCardGrid, NewsletterBlock, PaywallBlock } from './patterns';

// Or import everything from the barrel
import { Button, colors, PublicLayout, HeroSection } from '../design-system';
```

## Structure

```
design-system/
├── tokens/          # Design tokens (colors, typography, spacing, etc.)
├── components/      # Core UI components (Button, Card, Modal, etc.)
├── layouts/         # Layout shells (PublicLayout, AdminLayout, etc.)
├── patterns/        # Compound content patterns (HeroSection, BlogCardGrid, etc.)
└── index.ts         # Main barrel export
```

## Token Reference

| Token file       | Values                                                         |
|------------------|----------------------------------------------------------------|
| `colors.ts`      | background, surface, primary, accent, gold, vip, sponsor, ... |
| `typography.ts`  | display, body, mono fonts; scale xs→6xl; weights; line-heights |
| `spacing.ts`     | xs (4px) → 3xl (64px)                                         |
| `radii.ts`       | sm (6px) → full (999px)                                        |
| `shadows.ts`     | sm, md, lg, glow, glowGold, glowVip                           |
| `z-index.ts`     | base → tooltip (0–70)                                          |
| `breakpoints.ts` | sm (640px) → 2xl (1536px)                                      |

## Component Reference

| Component      | Description                                        |
|----------------|----------------------------------------------------|
| `Button`       | 8 variants (primary/secondary/accent/ghost/outline/danger/vip/sponsor), 3 sizes |
| `Card`         | Surface card with optional hover, glow, padding    |
| `Badge`        | 10 variants including vip, sponsor, success, danger |
| `Modal`        | Accessible dialog with escape-to-close             |
| `Tabs`         | Accessible tab panel with aria roles               |
| `Table`        | Typed generic table                                |
| `DataTable`    | Table with empty state fallback                    |
| `StatCard`     | KPI card with trend indicator                      |
| `ChartCard`    | Chart wrapper with title/subtitle/action           |
| `FormField`    | Label + input/textarea with validation states      |
| `SearchBar`    | Search input with icon                             |
| `FilterPanel`  | Multi-group filter chips with clear                |
| `EmptyState`   | Empty/zero-state display                           |

## Layout Reference

| Layout              | Use for                                 |
|---------------------|-----------------------------------------|
| `PublicLayout`      | Public pages (blog, home, reviews, etc.)|
| `AdminLayout`       | Admin dashboard pages                   |
| `ArticleLayout`     | Full articles with optional sidebar     |
| `DashboardLayout`   | Analytics/dashboard pages               |
| `LandingPageLayout` | Marketing and landing pages             |

## Pattern Reference

| Pattern           | Use for                                |
|-------------------|----------------------------------------|
| `HeroSection`     | Page hero / above the fold             |
| `BlogCardGrid`    | List of article cards                  |
| `FeatureGrid`     | Product/service feature highlights     |
| `PricingBlock`    | Subscription/pricing tiers             |
| `SponsorStrip`    | Sponsor logo strip                     |
| `NewsletterBlock` | Email newsletter signup block          |
| `SocialEmbedWall` | Social post / embed grid               |
| `PaywallBlock`    | VIP content gate                       |

## Styling

All components use **Tailwind CSS v4** utility classes and reference the custom theme tokens defined in `frontend/src/index.css`:

```css
@theme {
  --color-background: #09090B;
  --color-surface: #15151C;
  --color-surfaceAlt: #1D1D26;
  --color-primary: #E11D48;
  --color-accent: #F43F5E;
  --color-gold: #F5C451;
  --color-textPrimary: #F8FAFC;
  --color-textMuted: #A1A1AA;
}
```

No additional CSS files are needed — components are self-contained.

## Accessibility

- All `Button` components have `type="button"` by default (prevents accidental form submit).
- `Modal` has `role="dialog"`, `aria-modal="true"`, and escape-to-close.
- `Tabs` use `role="tab"`, `role="tabpanel"`, and `aria-selected`.
- Form fields link labels to inputs via `htmlFor`/`id`.
- Error messages use `role="alert"`.
