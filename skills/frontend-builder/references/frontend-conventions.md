# Frontend Development Conventions

Reference for the `frontend-builder` skill. Covers React/Vite/TypeScript/Tailwind conventions, component patterns, routing, and API integration for DZIRE_v1.

## Project Structure

```
frontend/src/
├── main.tsx             # Entry point
├── App.tsx              # Root component + router
├── pages/               # One file per route
├── components/          # Reusable UI components
│   ├── layout/          # Header, Footer, Sidebar, Layout
│   ├── ui/              # Base UI (Button, Input, Modal, Table)
│   └── [domain]/        # Domain-specific components
├── services/            # API call functions (no logic in components)
├── hooks/               # Custom React hooks
├── types/               # TypeScript interfaces and types
├── lib/                 # Utilities, helpers, constants
└── assets/              # Static assets (images, fonts)
```

## TypeScript Rules

- All props must have explicit TypeScript types — no `any`
- Define interfaces in `types/` for shared data shapes
- Use `interface` for object shapes, `type` for unions/primitives

```tsx
// types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

// Component with typed props
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
}
```

## Component Conventions

- One component per file
- File name matches component name: `UserCard.tsx` → `export function UserCard`
- Use named exports (not default)
- Functional components only (no class components)
- Props destructured at top of function

```tsx
// components/users/UserCard.tsx
import { User } from "@/types/user";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-sm text-gray-500">{user.email}</p>
    </div>
  );
}
```

## Tailwind Rules

- Use Tailwind utility classes (no inline styles, no separate CSS files for component styles)
- Responsive prefix order: `sm:`, `md:`, `lg:`, `xl:`
- Hover/focus states: `hover:`, `focus:`, `focus-visible:`
- Common patterns:
  - Cards: `rounded-lg border p-4 shadow-sm`
  - Buttons: `rounded-md px-4 py-2 font-medium transition-colors`
  - Forms: `rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2`

## API Services

All API calls live in `services/` — never inline in components.

```ts
// services/userService.ts
const API_BASE = "/api/v1";

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/users`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  const { data } = await res.json();
  return data;
}
```

## Routing

- Routes defined in `App.tsx` using React Router v6
- Pages live in `pages/`, one file per route
- Protected routes wrap with an `<AuthGuard>` component
- URL parameters: `useParams<{ id: string }>()`

## State Management

- Local state: `useState`
- Side effects + data fetching: `useEffect` or React Query
- Shared auth state: Context API (`AuthContext`)
- Avoid prop drilling > 2 levels — use Context or lift state

## Error Handling

- Wrap async calls in `try/catch`
- Show user-facing error messages (not raw error objects)
- Use a `<ErrorBoundary>` component for unexpected render errors
