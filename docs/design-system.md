# Design System Documentation — DZIRE

This document describes the DZIRE design system architecture, token structure, and component catalog.

## Overview

The design system lives in `frontend/src/design-system/` and exports:

| Layer | Path | Purpose |
|-------|------|---------|
| Tokens | `tokens/` | Immutable design values |
| Components | `components/` | Reusable UI primitives |
| Layouts | `layouts/` | Page-level layout shells |
| Patterns | `patterns/` | Composed UI sections |

---

## Tokens

All tokens are TypeScript `const` objects with type exports for type-safety.

### colors.ts
Defines the full DZIRE brand palette including semantic roles (success, warning, danger, info, vip, sponsor) and overlay values.

### typography.ts
Font family strings for display, body, and mono roles; a pixel-based size scale; weight, leading, and tracking maps.

### spacing.ts
4px-base spacing scale from `0` to `32` (128px), with named aliases (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`).

### radii.ts
Border-radius values from `none` (0px) to `full` (999px).

### shadows.ts
Shadow presets for elevation levels plus brand glow effects (`glowPrimary`, `glowGold`, `glowVip`) and a `glass` shadow.

### z-index.ts
Explicit stacking order: `base` → `raised` → `dropdown` → `sticky` → `overlay` → `modal` → `popover` → `toast` → `tooltip` → `max`.

### breakpoints.ts
Mobile-first breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px).

---

## Components

### Button

**File:** `components/Button.tsx`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ButtonVariant` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height/padding preset |
| `block` | `boolean` | `false` | Full-width |
| `loading` | `boolean` | `false` | Show spinner, disable |
| `leftIcon` | `ReactNode` | — | Prepend icon |
| `rightIcon` | `ReactNode` | — | Append icon |

Variants: `primary · secondary · accent · ghost · outline · danger · vip · sponsor`

### Card

**File:** `components/Card.tsx`

Sub-components: `CardHeader`, `CardBody`, `CardFooter`

Variants: `default · glass · elevated · outline · vip · sponsor`

### Badge

**File:** `components/Badge.tsx`

Variants: `default · category · success · warning · danger · info · vip · sponsor · trophy`
Sizes: `sm · md`

### FormField

**File:** `components/FormField.tsx`

Automatically wires `id`, `aria-describedby`, `aria-invalid`, and `aria-required` to child form controls via `React.cloneElement`. Exports `inputBaseClasses` string for consistent input styling.

### Modal

**File:** `components/Modal.tsx`

Accessible modal using React Portal. Features: Escape-to-close, scroll lock, auto-focus, backdrop click to close.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled visibility |
| `onClose` | `() => void` | — | Close callback |
| `title` | `string` | — | Modal heading |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Max-width preset |
| `footer` | `ReactNode` | — | Action buttons slot |

### DataTable

**File:** `components/DataTable.tsx`

Generic `<T>` typed table component. Supports `striped` rows, empty-state slot, and `align` per column.

### StatCard

**File:** `components/StatCard.tsx`

KPI metric display with optional icon, trend badge, and description.

---

## Layouts

| Component | File | Description |
|-----------|------|-------------|
| `PublicLayout` | `layouts/PublicLayout.tsx` | Standard page with Header + Footer |
| `AdminLayout` | `layouts/AdminLayout.tsx` | Re-export of `admin/AdminLayout.tsx` |
| `ArticleLayout` | `layouts/ArticleLayout.tsx` | Narrow reading column + optional sidebar |
| `DashboardLayout` | `layouts/DashboardLayout.tsx` | Collapsible sidebar + top header + content |
| `LandingPageLayout` | `layouts/LandingPageLayout.tsx` | Full-width, header/footer optional |

---

## Patterns

| Pattern | File | Description |
|---------|------|-------------|
| `BlogCardGrid` | `patterns/BlogCardGrid.tsx` | Responsive grid of article cards |
| `HeroSection` | `patterns/HeroSection.tsx` | Full-width hero with CTA buttons |
| `FeatureGrid` | `patterns/FeatureGrid.tsx` | Icon + title + description grid |
| `SponsorStrip` | `patterns/SponsorStrip.tsx` | Horizontal partner/sponsor logo strip |

---

## Import Paths

```ts
// Individual namespace
import { colors } from '@/design-system/tokens';
import { Button } from '@/design-system/components';
import { PublicLayout } from '@/design-system/layouts';
import { HeroSection } from '@/design-system/patterns';

// Everything at once
import { colors, Button, PublicLayout, HeroSection } from '@/design-system';
```

---

## Alignment With Tailwind v4

The project uses Tailwind CSS v4 (`@import "tailwindcss"` + `@theme` block in `index.css`).  
Design-system tokens **document** the values; the Tailwind classes (`bg-primary`, `text-textMuted`, etc.) reference the CSS variables defined in `index.css`. Both stay in sync.

---

_Last updated: Step 6 implementation_
