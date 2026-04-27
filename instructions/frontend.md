# instructions/frontend.md

**Owner**: `frontend-agent` | **Skill**: `frontend-builder`

---

## Stack
- React 18 (functional components + hooks only)
- Vite (build tool)
- TypeScript (strict mode)
- Tailwind CSS (utility-first, no inline styles)
- React Router v6 (client-side routing)
- Axios or native fetch (API calls)

## Folder Structure
```
frontend/src/
├── components/   # Reusable UI components
├── pages/        # Route-level page components
├── routes/       # React Router route definitions
├── hooks/        # Custom React hooks
├── services/     # API service functions
├── layouts/      # Shared layout wrappers
├── styles/       # Global CSS / Tailwind config
└── utils/        # Utility/helper functions
```

## Rules
1. Every component and page must have TypeScript types for all props and data.
2. Style with Tailwind utility classes only.
3. API calls go in `services/` — never directly in components.
4. Access token stored in memory (not localStorage). Use `/auth/refresh` on expiry.
5. New pages require a route entry in `routes/` and a navigation link.

## Reference
- [`prompts/frontend-prompt.md`](../prompts/frontend-prompt.md)
- [`workflows/frontend-build.md`](../workflows/frontend-build.md)
