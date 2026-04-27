# Frontend Docs — DZIRE_v1

## Stack
- React 19 (functional components + hooks)
- Vite (build tool)
- TypeScript strict mode
- Tailwind CSS utility-first
- React Router v7

## Folder Structure

```
frontend/src/
├── design-system/       # ← Centralised design system (Step 6)
│   ├── tokens/          # colors.ts, typography.ts, spacing.ts, radii.ts, shadows.ts, z-index.ts, breakpoints.ts
│   ├── components/      # Button, Card, Badge, FormField, Modal, DataTable, StatCard
│   ├── layouts/         # PublicLayout, AdminLayout, ArticleLayout, DashboardLayout, LandingPageLayout
│   ├── patterns/        # HeroSection, BlogCardGrid, FeatureGrid, SponsorStrip
│   └── README.md
├── components/
│   ├── layout/      # Header, Footer, PublicLayout, AdminButton (dev-only)
│   ├── ui/          # Shared UI primitives (Button, Card, Badge, etc.)
│   ├── positions/   # Position-specific components
│   ├── reviews/     # Review-specific components
│   └── dictionary/  # Dictionary-specific components
├── lib/
│   ├── api/
│   │   └── admin.ts   # Admin API client (adminLogin, adminMe, adminLogout)
│   └── auth/
│       └── token.ts   # JWT localStorage helpers + expiry check
├── pages/
│   ├── admin/
│   │   ├── AdminLoginPage.tsx      # /admin/login
│   │   └── AdminDashboardPage.tsx  # /admin/dashboard (auth-guarded)
│   └── ...                         # Public page components (15 pages)
├── services/        # API client functions (replaces mock data)
├── data/            # Mock data (temporary, to be replaced by services/)
├── utils/           # Utility/helper functions
└── assets/          # Static images and SVGs
```

## Design System

The design system lives in `frontend/src/design-system/`. Import from the barrel:

```ts
import { colors, spacing, Button, Card, PublicLayout, HeroSection } from '@/design-system';
```

See [`frontend/src/design-system/README.md`](../frontend/src/design-system/README.md) and [`docs/design-system.md`](./design-system.md) for the full API reference.

## Routes

### Public Routes
| Path | Component |
|---|---|
| `/` | `HomePage` |
| `/positions` | `PositionsPage` |
| `/positions/:slug` | `PositionDetailPage` |
| `/reviews` | `ReviewsPage` |
| `/reviews/:slug` | `ReviewDetailPage` |
| `/dictionary` | `DictionaryPage` |
| `/dictionary/:slug` | `DictionaryTermPage` |
| `/dzire-dolls` | `DzireDollsPage` |
| `/stories` | `StoriesPage` |
| `/magazine` | `MagazinePage` |
| `/newsletter` | `NewsletterPage` |
| `/vip` | `VipPage` |
| `/contact` | `ContactPage` |
| `/search` | `SearchPage` |

### Admin Routes (outside `PublicLayout`)
| Path | Component | Auth |
|---|---|---|
| `/admin/login` | `AdminLoginPage` | None |
| `/admin/dashboard` | `AdminDashboardPage` | JWT required (redirects to `/admin/login`) |

## Admin Floating Button
`AdminButton` is rendered in `PublicLayout` but only visible in development builds (`import.meta.env.DEV`). It appears bottom-right, links to `/admin/login`, and shows an "Admin" tooltip on hover.

## API Client Layer
- Public API calls go in `frontend/src/services/` — never directly in components.
- Admin API calls go in `frontend/src/lib/api/admin.ts`.
- JWT token helpers (get/set/clear/validate) live in `frontend/src/lib/auth/token.ts`.

## Reference
- [`instructions/frontend.md`](../instructions/frontend.md)
- [`workflows/frontend-build.md`](../workflows/frontend-build.md)

