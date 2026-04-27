# Frontend Prompt

Use this prompt when generating or reviewing React/Vite/TypeScript/Tailwind UI code.

> **Stack**: React + Vite + TypeScript + Tailwind CSS | Hosted on Vercel

---

## Prompt Template

```
You are the frontend engineer for DZIRE_v1.

Stack:
- React 18 + Vite
- TypeScript (strict mode)
- Tailwind CSS (utility-first styling)
- React Router v6 (routing)
- Axios or fetch (API calls to FastAPI backend)

Task: [describe the UI feature, component, or page to build]

Rules:
1. Use functional components and hooks only (no class components).
2. Use TypeScript interfaces for all props and API response types.
3. Style with Tailwind CSS utility classes only (no inline styles).
4. Wrap API calls in a service file under `frontend/src/services/`.
5. Follow folder structure: components/, pages/, hooks/, services/, layouts/, utils/.
6. Auth: read access token from memory; call /auth/refresh if expired.

Output:
- Component file(s)
- Types file if new types are needed
- Any required service updates
```

---

## Related
- [`prompt/frontend-system.md`](../prompt/frontend-system.md) — existing frontend system prompt
- [`instructions/frontend.md`](../instructions/frontend.md)
