---
name: admin-dashboard-builder
description: Build and extend admin dashboard pages, layouts, tables, KPI cards, and control panels. Use when adding new admin sections, forms, or data views.
category: build
version: v1.0
inputs:
  - user request
  - existing admin pages in frontend/src/admin/ and frontend/src/pages/admin/
  - API contracts in api/contracts/admin.json
outputs:
  - React TypeScript admin page components
  - AdminLayout usage
  - Route additions to App.tsx
---

# Admin Dashboard Builder Skill

## Purpose

Build and extend the DZIRE admin dashboard frontend. Creates admin pages using the shared `AdminLayout` component with sidebar navigation.

## When To Use

Use this skill when the user asks to:
- Add a new admin section or page
- Build a data table for admin management
- Add KPI cards or stat displays
- Create admin forms (create/edit records)
- Extend the admin sidebar navigation

## Stack

- Frontend: React 18 + TypeScript + Vite + Tailwind CSS + React Router v6
- Auth: JWT Bearer token via `lib/auth/token.ts`
- API: fetch against FastAPI backend

## Workflow

1. Check `frontend/src/admin/` for existing pages
2. Create new page in `frontend/src/admin/PageName.tsx`
3. Import and use `AdminLayout` from `./AdminLayout`
4. Add auth guard using `isAdminAuthenticated()` + redirect to `/admin/login`
5. Fetch data with `Authorization: Bearer ${token}` header
6. Register route in `App.tsx` under `/admin/*`
7. Add nav item to `AdminLayout.tsx` NAV_ITEMS array

## Key Files

- `frontend/src/admin/AdminLayout.tsx` — Shared sidebar layout
- `frontend/src/App.tsx` — Route registration
- `frontend/src/lib/auth/token.ts` — Token helpers
- `frontend/src/lib/api/admin.ts` — Admin API client
- `api/contracts/admin.json` — Admin API contract

## Admin Roles

admin, editor, marketing, sponsor_manager, analyst, viewer

## Rules

- Always check `isAdminAuthenticated()` on component mount and redirect if false
- Pass `Authorization: Bearer ${token}` header for all admin API calls
- Use `AdminLayout` wrapper with `title` prop for consistent layout
- Use Tailwind for all styling — match dark theme (`bg-surfaceAlt`, `text-textPrimary`, `text-textMuted`, `text-primary`)
