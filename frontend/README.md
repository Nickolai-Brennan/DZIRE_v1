# DZIRE Frontend

A premium dark-mode adult lifestyle publication web app built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 18** + **TypeScript** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS v4** - Utility-first styling with custom dark theme
- **React Router v6** - Client-side routing
- **TanStack Query** - Data fetching (ready for integration)
- **TanStack Table** - Table components (ready for integration)
- **Recharts** - Charts and analytics visualizations (ready for integration)
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icon library

## Color Palette

- **Background**: `#09090B`
- **Surface**: `#15151C`
- **Surface Alt**: `#1D1D26`
- **Primary (Rose Red)**: `#E11D48`
- **Accent (Pink)**: `#F43F5E`
- **Gold**: `#F5C451`
- **Text Primary**: `#F8FAFC`
- **Text Muted**: `#A1A1AA`

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Runs the app at [http://localhost:5173](http://localhost:5173)

### Build

```bash
npm run build
```

Builds the app for production to `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # Base UI components (Button, Card, Badge, etc.)
│   │   ├── layout/          # Layout components (Header, Footer, PublicLayout)
│   │   ├── positions/       # Position-related components
│   │   ├── reviews/         # Review-related components
│   │   ├── dictionary/      # Dictionary-related components
│   │   ├── content/         # Article/content components
│   │   ├── dolls/           # DZIRE Dolls components
│   │   └── stories/         # Story components
│   ├── pages/               # Route pages
│   │   ├── HomePage.tsx
│   │   ├── PositionsPage.tsx
│   │   ├── ReviewsPage.tsx
│   │   ├── DictionaryPage.tsx
│   │   └── ...
│   ├── data/                # Mock data and types
│   │   ├── types.ts
│   │   ├── mockPositions.ts
│   │   ├── mockReviews.ts
│   │   ├── mockDictionary.ts
│   │   ├── mockDolls.ts
│   │   ├── mockStories.ts
│   │   ├── mockArticles.ts
│   │   └── mockAdminStats.ts
│   ├── utils/               # Utility functions
│   │   └── track.ts         # Analytics tracking
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles with Tailwind
├── public/                  # Static assets
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Features Implemented

### Phase 1-3: Foundation & Core UI
✅ Vite + React + TypeScript setup
✅ Tailwind CSS v4 with custom dark theme
✅ Base UI components (Button, Card, Badge, Modal, SearchBar, etc.)
✅ Layout components (Header, Footer, PublicLayout, AdminButton)
✅ React Router v6 setup with all routes

### Phase 2: Mock Data System
✅ TypeScript interfaces for all data types
✅ Mock data for Positions (8 entries)
✅ Mock data for Reviews (3 trophy winners)
✅ Mock data for Dictionary (6 terms)
✅ Mock data for DZIRE Dolls (6 profiles)
✅ Mock data for Stories (4 entries)
✅ Mock data for Articles (5 entries)
✅ Mock data for Magazine & Admin Stats

### Phase 4: Homepage
✅ Hero section with gradient headline
✅ Featured DZIRE Dolls carousel
✅ Trending Positions grid
✅ Trophy Hall preview
✅ Dictionary preview
✅ Latest Stories
✅ Newsletter signup form
✅ VIP CTA section

### Phase 5-11: Additional Pages
✅ Positions page with search and filtering
✅ Reviews page with Trophy Hall
✅ Dictionary page with search
✅ Placeholder pages for all routes

## Routes

- `/` - Homepage
- `/positions` - Position guides listing
- `/positions/:slug` - Individual position detail (placeholder)
- `/reviews` - Product reviews with Trophy Hall
- `/reviews/:slug` - Review detail (placeholder)
- `/dictionary` - Sex dictionary
- `/dictionary/:slug` - Term detail (placeholder)
- `/dzire-dolls` - Creator profiles (placeholder)
- `/dzire-dolls/:slug` - Doll profile detail (placeholder)
- `/stories` - Fantasy stories (placeholder)
- `/stories/:slug` - Story detail (placeholder)
- `/magazine` - Magazine issues (placeholder)
- `/newsletter` - Newsletter signup (placeholder)
- `/vip` - VIP membership (placeholder)
- `/contact` - Contact page (placeholder)
- `/search` - Search page (placeholder)
- `/admin/login` - Admin login (placeholder)

## Components

### UI Components (`src/components/ui/`)
- `Button` - Primary, secondary, ghost, gold variants
- `Badge` - Category and trophy badges
- `Card` - Glass-morphism dark cards with hover states
- `ScorePill` - Colored score indicators
- `SearchBar` - Search input with icon
- `Modal` - Full-screen overlay modal
- `LoadingState` - Loading spinner
- `EmptyState` - Empty state placeholder
- `NewsletterForm` - Email signup form with tracking

### Layout Components (`src/components/layout/`)
- `Header` - Sticky header with navigation and mobile menu
- `Footer` - Dark footer with links
- `PublicLayout` - Wrapper for public pages
- `AdminButton` - Fixed bottom-right admin access button

## Tracking & Analytics

The app includes a tracking utility (`src/utils/track.ts`) that logs events:

```typescript
track('newsletter_signup', { email });
track('position_view', { slug, title });
track('affiliate_click', { productId, url });
```

Currently logs to console. Ready for API integration.

## TODO: API Integration

Replace mock data with API calls:

1. Connect to backend API endpoints
2. Replace `mockPositions` with API fetches
3. Replace `mockReviews` with API fetches
4. Replace `mockDictionary` with API fetches
5. Implement TanStack Query for data fetching
6. Connect tracking utility to analytics API

## Next Steps

### Position Detail Pages (Phase 6-7)
- [ ] Position Quick View Modal with two-column layout
- [ ] Full Position Detail page with related content
- [ ] Score breakdowns and compatibility questions

### Review Detail Pages (Phase 8-9)
- [ ] Review Detail page with full breakdown
- [ ] Pros/cons sections
- [ ] FAQ accordion
- [ ] Affiliate CTAs with tracking

### Dictionary Detail (Phase 11)
- [ ] Term detail pages
- [ ] Related content sections
- [ ] FAQ accordions

### Additional Features
- [ ] DZIRE Dolls profile pages
- [ ] Story detail pages with reading experience
- [ ] Magazine issue pages
- [ ] VIP membership pages
- [ ] Admin dashboard
- [ ] Search functionality
- [ ] User authentication
- [ ] Newsletter integration
- [ ] Affiliate tracking system

## Design Principles

1. **Dark Luxury** - Black backgrounds with rose-red accents and gold highlights
2. **Glass Morphism** - Subtle transparency and blur effects on cards
3. **Mobile-First** - Responsive design that works on all devices
4. **Premium Feel** - High-end magazine aesthetic
5. **Performance** - Optimized bundle size and lazy loading
6. **Accessibility** - Semantic HTML and ARIA labels

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Adults only (18+). All rights reserved.
