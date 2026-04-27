# Frontend Docs — DZIRE_v1

## Stack
- React 18 (functional components + hooks)
- Vite (build tool)
- TypeScript strict mode
- Tailwind CSS utility-first
- React Router v6

## Folder Structure

```
frontend/src/
├── components/
│   ├── layout/      # Header, Footer, PublicLayout
│   ├── ui/          # Shared UI primitives (Button, Card, Badge, etc.)
│   ├── positions/   # Position-specific components
│   ├── reviews/     # Review-specific components
│   └── dictionary/  # Dictionary-specific components
├── pages/           # Route-level page components (15 pages)
├── services/        # API client functions (replaces mock data)
├── data/            # Mock data (temporary, to be replaced by services/)
├── utils/           # Utility/helper functions
└── assets/          # Static images and SVGs
```

## Routes

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
| `/admin/login` | Admin Login (Coming Soon) |

## API Client Layer
API calls go in `frontend/src/services/` — never directly in components.

## Reference
- [`instructions/frontend.md`](../instructions/frontend.md)
- [`workflows/frontend-build.md`](../workflows/frontend-build.md)
