# Project Planning Guide

Reference for the `planning-agent-skill`. Covers project structuring, phase planning, tech stack selection, and module mapping.

## Project Types

| Type | Description | Typical Stack |
|------|-------------|---------------|
| SaaS web app | Multi-user web application with auth | React + FastAPI + PostgreSQL |
| Content platform | Blog, media, or content management | React + FastAPI + PostgreSQL |
| Analytics dashboard | Data visualization and reporting | React + FastAPI + MotherDuck |
| API service | Backend-only, no frontend | FastAPI + PostgreSQL |
| Landing page | Marketing site, static | Next.js or plain HTML |

## Defining Scope

A well-scoped project answers:
1. **Who** is the primary user?
2. **What** is the single most important thing they can do?
3. **Why** does this exist? (Problem being solved)
4. **When** does MVP need to ship?
5. **What** is explicitly OUT of scope for MVP?

## Module Mapping

Break a project into logical modules, where each module:
- Owns a clear domain of data and behavior
- Maps to backend service(s) and frontend page(s)
- Has a predictable set of CRUD operations

Example for a job board:
```
Modules:
- auth        → login, register, JWT, permissions
- users       → profile, preferences, roles
- positions   → job listings, filtering, search
- applications → apply, track status, notifications
- analytics   → dashboards, conversion metrics
```

## Phase Planning

A standard 3-phase project plan:

### Phase 1: MVP (Week 1–2)
Core happy path only. No nice-to-haves.
- Auth (login, register)
- 1–2 core features
- Basic UI (functional, not polished)
- Deployment to staging

### Phase 2: v1 Launch (Week 3–4)
Complete the core experience.
- Remaining core features
- Polish UI
- Error handling and validation
- Tests
- Deploy to production

### Phase 3: Growth
Optimizations and expansion after launch.
- Analytics and metrics
- Performance improvements
- SEO (if applicable)
- New features based on user feedback

## Tech Stack Decision Factors

| Factor | React + Vite | Next.js | Consideration |
|--------|-------------|---------|---------------|
| SEO needed? | No | Yes | Next.js if public content |
| SPA/Dashboard | Yes | Either | React preferred for dashboards |
| SSR needed? | No | Yes | Next.js for content sites |

## First Tasks Format

First tasks use the T-[NNN] format:

```
T-001: Set up repo structure and config
T-002: Configure database connection (MotherDuck)
T-003: Build auth backend (register, login, JWT)
T-004: Build auth frontend (login page, auth context)
T-005: Build [core feature 1] backend service + routes
...
```
