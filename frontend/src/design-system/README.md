# DZIRE Design System

A centralized, reusable design system for the DZIRE platform. Built with **React + TypeScript + Tailwind CSS v4**.

---

## Folder Structure

```
frontend/src/design-system/
├── tokens/          # Design tokens (colors, typography, spacing, …)
├── components/      # Primitive UI components
├── layouts/         # Page layout shells
├── patterns/        # Composed UI patterns (HeroSection, BlogCardGrid, …)
└── README.md        # ← you are here
```

---

## Quick Start

### Import tokens

```ts
import { colors, typography, spacing, shadows, radii, zIndex, breakpoints } from '@/design-system/tokens';

// Use in inline styles or custom Tailwind classes
const style = { color: colors.primary[500], fontFamily: typography.display };
```

### Import components

```tsx
import { Button, Card, CardBody, Badge, FormField, Modal, DataTable, StatCard } from '@/design-system/components';

// Button variants: primary | secondary | accent | ghost | outline | danger | vip | sponsor
<Button variant="primary" size="lg">Subscribe Now</Button>
<Button variant="vip" leftIcon={<Crown />}>Go VIP</Button>
<Button variant="danger" loading>Deleting…</Button>

// Card
<Card variant="glass" interactive>
  <CardBody>Content goes here</CardBody>
</Card>

// Badge
<Badge variant="vip">VIP Only</Badge>
<Badge variant="sponsor">Sponsored</Badge>
<Badge variant="success">Published</Badge>

// StatCard
<StatCard
  value="12,400"
  label="Monthly Readers"
  trend="+4.2%"
  trendDirection="up"
  icon={<Users className="w-5 h-5" />}
/>
```

### Import layouts

```tsx
import { PublicLayout, ArticleLayout, DashboardLayout } from '@/design-system/layouts';

// Public page
<PublicLayout>
  <HomePage />
</PublicLayout>

// Article page with sidebar
<ArticleLayout sidebar={<TableOfContents />}>
  <ArticleBody />
</ArticleLayout>
```

### Import patterns

```tsx
import { HeroSection, BlogCardGrid, FeatureGrid, SponsorStrip } from '@/design-system/patterns';

<HeroSection
  headline="Explore. Discover. Connect."
  subheadline="Premium content for modern audiences."
  ctaLabel="Get Started"
  secondaryCtaLabel="Learn More"
/>

<BlogCardGrid posts={posts} columns={3} />

<SponsorStrip sponsors={sponsors} />
```

---

## Token Reference

| Token file      | Key exports                               |
|-----------------|-------------------------------------------|
| `colors.ts`     | `background`, `surface`, `primary`, `accent`, `gold`, `vip`, `sponsor`, semantic colors |
| `typography.ts` | `display`, `body`, `mono`, `scale`, `weight`, `leading` |
| `spacing.ts`    | `xs` (4px) → `4xl` (96px)               |
| `radii.ts`      | `sm` (6px) → `full` (999px)             |
| `shadows.ts`    | `sm`, `md`, `lg`, `glowPrimary`, `glass` |
| `z-index.ts`    | `base` → `max`                           |
| `breakpoints.ts`| `sm` (640px) → `2xl` (1536px)           |

---

## Component Variants

### Button
`primary` · `secondary` · `accent` · `ghost` · `outline` · `danger` · `vip` · `sponsor`

### Card
`default` · `glass` · `elevated` · `outline` · `vip` · `sponsor`

### Badge
`default` · `category` · `success` · `warning` · `danger` · `info` · `vip` · `sponsor` · `trophy`

---

## Accessibility

- All interactive elements expose `focus-visible` ring styles.
- `Modal` traps focus, locks scroll, and responds to `Escape`.
- `FormField` wires `aria-describedby`, `aria-invalid`, and `aria-required` automatically.
- `DataTable` uses semantic `<table>` markup with `scope="col"` headers.
- Images should always include meaningful `alt` text.

---

## Contributing

1. Add tokens to the relevant `tokens/*.ts` file and re-export from `tokens/index.ts`.
2. New components go in `components/`, following the existing prop/style pattern.
3. Run `npm run build` inside `frontend/` to verify TypeScript compiles cleanly.
4. Keep Tailwind classes; avoid inline `style` props unless using token values dynamically.
