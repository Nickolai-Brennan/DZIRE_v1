# Frontend Docs — DZIRE_v1

## Stack
- React 19 (functional components + hooks)
- Vite (build tool)
- TypeScript strict mode
- Tailwind CSS v4 utility-first
- React Router v7

## Folder Structure

```
frontend/src/
├── auth/                    # Step 7 — auth pages
│   ├── LoginPage.tsx        # /login  (cookie-based API)
│   ├── RegisterPage.tsx     # /signup (cookie-based API)
│   ├── ForgotPasswordPage.tsx  # /forgot-password
│   └── ResetPasswordPage.tsx   # /reset-password?token=...
├── components/
│   ├── auth/                # Step 7 — auth UI components
│   │   ├── LoginForm.tsx        # Reusable login form
│   │   ├── RegisterForm.tsx     # Reusable register form
│   │   ├── ProtectedRoute.tsx   # Redirects unauthenticated users to /login
│   │   └── RoleGate.tsx         # Renders children only for matching role
│   ├── layout/              # Header, Footer, PublicLayout, AdminButton (dev-only)
│   ├── ui/                  # Shared UI primitives (Button, Card, Badge, etc.)
│   ├── positions/           # Position-specific components
│   ├── reviews/             # Review-specific components
│   └── dictionary/          # Dictionary-specific components
├── context/
│   ├── AuthContext.tsx       # Step 7 — real API auth with session restore on mount
│   ├── FavoritesContext.tsx
│   └── PlaylistContext.tsx
├── design-system/           # Centralised design system (Step 6)
│   ├── tokens/              # colors.ts, typography.ts, spacing.ts, radii.ts, shadows.ts, z-index.ts, breakpoints.ts
│   ├── components/          # Button, Card, Badge, FormField, Modal, DataTable, StatCard
│   ├── layouts/             # PublicLayout, AdminLayout, ArticleLayout, DashboardLayout, LandingPageLayout
│   ├── patterns/            # HeroSection, BlogCardGrid, FeatureGrid, SponsorStrip
│   └── README.md
├── hooks/                   # Step 7 — custom hooks
│   ├── useAuth.ts           # Re-exports useAuth from AuthContext
│   └── usePermissions.ts    # Role + permission checks (mirrors backend ROLE_PERMISSIONS)
├── lib/
│   ├── api/
│   │   └── admin.ts         # Admin API client (adminLogin, adminMe, adminLogout)
│   └── auth/
│       └── token.ts         # JWT localStorage helpers + expiry check (admin only)
├── pages/
│   ├── admin/
│   │   ├── AdminLoginPage.tsx      # /admin/login
│   │   └── AdminDashboardPage.tsx  # /admin/dashboard (auth-guarded)
│   └── ...                         # Public page components
├── services/
│   ├── api.ts               # Base fetch client (credentials: include, Bearer header, auto-refresh)
│   └── authService.ts       # Step 7 — register, login, logout, refresh, forgotPassword, resetPassword, verifyEmail, getMe
├── data/                    # Mock data (temporary, to be replaced by services/)
├── utils/                   # Utility/helper functions
└── assets/                  # Static images and SVGs
```

## Authentication (Step 7)

The `AuthContext` uses the real `/api/auth/*` backend. On mount it silently calls
`/api/auth/refresh` to restore any active session from the HttpOnly refresh cookie.

```tsx
// Use anywhere inside AuthProvider
const { user, isAuthenticated, isVip, login, signup, logout } = useAuth();
```

### Protected Routes

Wrap any route that requires authentication:

```tsx
<Route path="/profile" element={
  <ProtectedRoute>
    <ProfilePage />
  </ProtectedRoute>
} />
```

### Role-Based Rendering

```tsx
import { RoleGate } from './components/auth/RoleGate';

<RoleGate role="admin">
  <AdminPanel />
</RoleGate>

<RoleGate role="vip" fallback={<Paywall />}>
  <VIPContent />
</RoleGate>
```

### Permission Checks

```tsx
import { usePermissions } from './hooks/usePermissions';

const { hasPermission, isAdmin, isVip } = usePermissions();

if (hasPermission('create_post')) { /* show create button */ }
```

## Design System

The design system lives in `frontend/src/design-system/`. Import from the barrel:

```ts
import { colors, spacing, Button, Card, PublicLayout, HeroSection } from '@/design-system';
```

See [`frontend/src/design-system/README.md`](../frontend/src/design-system/README.md) and [`docs/design-system.md`](./design-system.md) for the full API reference.

## Routes

### Public Routes
| Path | Component | Auth |
|---|---|---|
| `/` | `HomePage` | None |
| `/login` | `LoginPage` | None |
| `/signup` | `SignupPage` | None |
| `/forgot-password` | `ForgotPasswordPage` | None |
| `/reset-password` | `ResetPasswordPage` | None |
| `/profile` | `ProfilePage` | **Protected** (redirects to `/login`) |
| `/positions` | `PositionsPage` | None |
| `/positions/:slug` | `PositionDetailPage` | None |
| `/reviews` | `ReviewsPage` | None |
| `/reviews/:slug` | `ReviewDetailPage` | None |
| `/dictionary` | `DictionaryPage` | None |
| `/dictionary/:slug` | `DictionaryTermPage` | None |
| `/dzire-dolls` | `DzireDollsPage` | None |
| `/stories` | `StoriesPage` | None |
| `/magazine` | `MagazinePage` | None |
| `/newsletter` | `NewsletterPage` | None |
| `/vip` | `VipPage` | None |
| `/contact` | `ContactPage` | None |
| `/search` | `SearchPage` | None |

### Admin Routes (outside `PublicLayout`)
| Path | Component | Auth |
|---|---|---|
| `/admin/login` | `AdminLoginPage` | None |
| `/admin/dashboard` | `AdminDashboardPage` | JWT required (redirects to `/admin/login`) |

## API Client Layer
- All requests use `credentials: 'include'` so HttpOnly cookies are sent automatically.
- Access token is stored in memory (`setAccessToken`) and attached as `Authorization: Bearer`.
- On 401, the client silently calls `/api/auth/refresh` and retries the original request.
- Public API calls: `frontend/src/services/`
- Admin API calls: `frontend/src/lib/api/admin.ts`

## Admin Floating Button
`AdminButton` is rendered in `PublicLayout` but only visible in development builds (`import.meta.env.DEV`). It appears bottom-right, links to `/admin/login`, and shows an "Admin" tooltip on hover.

## Reference
- [`docs/authentication.md`](./authentication.md)
- [`docs/roles-permissions.md`](./roles-permissions.md)
- [`docs/security.md`](./security.md)
- [`instructions/frontend.md`](../instructions/frontend.md)
- [`workflows/frontend-build.md`](../workflows/frontend-build.md)

