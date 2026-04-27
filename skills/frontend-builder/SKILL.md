---
name: frontend-builder
description: Scaffold, build, and extend the React frontend. Use when the user asks to add pages, components, routes, layouts, hooks, or connect the frontend to the API.
category: build
version: v1.0
inputs:
  - user request
  - existing frontend structure
  - API contracts from api/
outputs:
  - React components
  - Page files
  - Route definitions
  - API service functions
---

# Frontend Builder Skill

## Purpose
Build and extend the React + Vite + TypeScript + Tailwind frontend, from new pages and components to API client integration.

## When To Use
Use this skill when the user asks to:
- Add a new page or route
- Build a UI component
- Create a layout
- Add a form or data table
- Connect the frontend to a backend API endpoint

## Inputs
- User request (feature description)
- Existing `frontend/src/` structure
- API contracts from `api/`
- Stack: React 18, Vite, TypeScript (strict), Tailwind CSS, React Router v6

## Workflow
1. Identify the correct folder (`pages/`, `components/`, `services/`, etc.)
2. Create TypeScript types for all props and API data
3. Build the component or page using Tailwind utility classes
4. Register route in `App.tsx` if a new page
5. API calls go in `frontend/src/services/` — never inline in components
6. Review against checklist

## Output Format
```
frontend/src/
├── pages/[PageName].tsx
├── components/[domain]/[ComponentName].tsx
├── services/[domain]Service.ts
└── (route registration in App.tsx)
```

## Quality Checklist
- [ ] TypeScript types defined for all props and data
- [ ] Tailwind classes used (no inline styles)
- [ ] API calls in `services/` layer
- [ ] Route registered if new page
- [ ] Component is reusable and named clearly

## Reference
- [`instructions/frontend.md`](../../instructions/frontend.md)
- [`workflows/frontend-build.md`](../../workflows/frontend-build.md)
