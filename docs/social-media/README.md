# Step 10 — Full Content Calendar + Social Publishing System

This document covers setup, API reference, local dev notes, and provider extension for the Step 10 publishing system.

---

## Modules

| Module | Path | Purpose |
|--------|------|---------|
| Content Calendar | `backend/app/content_calendar/` | Plan and track content items |
| Campaigns | `backend/app/campaigns/` | Campaign planner |
| Social Integrations | `backend/app/social_integrations/` | Social accounts, posts, size chart |
| Providers | `backend/app/social_integrations/providers/` | Per-platform publish logic |
| Encryption | `backend/app/core/encryption.py` | Fernet token encryption |
| Scheduler | `backend/app/social_integrations/scheduler.py` | Background auto-publisher |

---

## Setup

See [setup.md](./setup.md) for environment variable setup.  
See [api-reference.md](./api-reference.md) for full API docs.  
See [local-dev.md](./local-dev.md) for running locally.  
See [adding-a-provider.md](./adding-a-provider.md) to extend with a new platform.
