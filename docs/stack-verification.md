# Stack Verification

This document explains how to verify the DZIRE_v1 development stack both **locally** and **in CI**.

---

## Overview

The project provides two complementary verification scripts:

| Script | Purpose |
|---|---|
| `scripts/verify-stack.sh` | Quick local tool check (Node, npm, Python, pip, psql) |
| `scripts/ci-verify-stack.sh` | Full CI verification — tools, dependencies, and env vars |

Stack requirements are locked in [`config/stack.config.json`](../config/stack.config.json).  
Required environment variables are documented in [`config/env.example`](../config/env.example).

---

## Running Locally

### 1. Quick tool check

```bash
bash scripts/verify-stack.sh
```

Outputs `[OK]` or `[MISSING]` for: `node`, `npm`, `python`, `pip`, `psql`.

### 2. Full environment check

Copy the example env file, fill in values, then run:

```bash
cp config/env.example .env
# Edit .env with your local values …
bash scripts/ci-verify-stack.sh
```

This checks tools, installed dependencies, and all required environment variables.

---

## CI Workflow

The workflow file is at **`.github/workflows/stack-verify.yml`**.

It runs automatically on:

- Every **push** to `main` / `master`
- Every **pull request**
- Manual trigger via **`workflow_dispatch`**

### Steps performed

1. **Checkout** — clone the repository
2. **Set up Node.js 20** — with `npm` cache keyed on `frontend/package-lock.json`
3. **Set up Python 3.12** — with `pip` cache keyed on `backend/requirements.txt`
4. **Check Docker** — validates availability; non-fatal if absent
5. **Install frontend deps** — `npm ci` inside `frontend/`
6. **Install backend deps** — `pip install -r backend/requirements.txt`
7. **Validate environment** — runs `scripts/ci-verify-stack.sh`
8. **Stack verification** — runs `scripts/verify-stack.sh`

---

## Required Secrets

Add these under **Settings → Secrets and variables → Actions → Secrets** in your GitHub repository.  
Secret values are **never printed** in workflow logs.

| Secret name | Maps to `config/env.example` | Description |
|---|---|---|
| `APP_SECRET_KEY` | `APP_SECRET_KEY` | Application signing secret (min 32 chars) |
| `JWT_SECRET_KEY` | `JWT_SECRET_KEY` | JWT signing secret (min 32 chars) |
| `DATABASE_URL` | `DATABASE_URL` | PostgreSQL / MotherDuck connection string |
| `MOTHERDUCK_TOKEN` | `MOTHERDUCK_TOKEN` | MotherDuck service token |
| `VERCEL_PROJECT_ID` | `VERCEL_PROJECT_ID` | Vercel project ID (frontend deployment) |
| `VERCEL_TEAM_ID` | `VERCEL_TEAM_ID` | Vercel team ID (frontend deployment) |
| `RENDER_SERVICE_ID` | `RENDER_SERVICE_ID` | Render service ID (backend deployment) |
| `RENDER_API_KEY` | `RENDER_API_KEY` | Render API key (backend deployment) |

> **Note:** Missing secrets produce a `[WARN]` in CI output rather than failing the workflow.  
> This allows forks and open PRs without access to repo secrets to still pass verification.

### Non-secret variables (repository variables)

These can be stored as **repository variables** (not secrets) for easy override:

| Variable name | Default | Description |
|---|---|---|
| `JWT_ALGORITHM` | `HS256` | JWT signing algorithm |
| `JWT_ACCESS_TOKEN_EXPIRE_MINUTES` | `15` | Access token TTL in minutes |
| `JWT_REFRESH_TOKEN_EXPIRE_DAYS` | `30` | Refresh token TTL in days |

---

## Troubleshooting

| Symptom | Resolution |
|---|---|
| `node_modules missing` | Run `npm ci` inside `frontend/` |
| `fastapi not installed` | Run `pip install -r backend/requirements.txt` |
| `APP_ENV — NOT SET` | Ensure the workflow env block or your `.env` file sets this var |
| Docker not available | Docker checks are non-fatal; no action needed for basic CI |
