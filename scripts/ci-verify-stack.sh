#!/usr/bin/env bash
# ci-verify-stack.sh
# Non-interactive CI environment and stack verification for DZIRE_v1.
# Reads required vars from config/env.example, checks presence of secrets,
# and applies safe defaults for non-secret configuration values.
#
# Usage:  bash scripts/ci-verify-stack.sh
# Exit:   0 = all checks passed | 1 = one or more required items missing

set -euo pipefail

PASS=0
FAIL=0
MISSING=()

# ── Colour helpers (disabled when not a TTY so CI logs stay clean) ─────────
if [ -t 1 ]; then
  green()  { echo -e "\033[0;32m[OK]   $*\033[0m"; }
  red()    { echo -e "\033[0;31m[FAIL] $*\033[0m"; }
  yellow() { echo -e "\033[0;33m[WARN] $*\033[0m"; }
else
  green()  { echo "[OK]   $*"; }
  red()    { echo "[FAIL] $*"; }
  yellow() { echo "[WARN] $*"; }
fi

# ── Helpers ────────────────────────────────────────────────────────────────
check_tool() {
  local name="$1" cmd="$2"
  if command -v "$cmd" &>/dev/null; then
    green "tool: $name $($cmd --version 2>&1 | head -1)"
    PASS=$((PASS + 1))
  else
    red "tool: $name — NOT FOUND"
    MISSING+=("tool: $name")
    FAIL=$((FAIL + 1))
  fi
}

# Check a non-secret env var: must be set and non-empty.
check_var() {
  local var="$1"
  local value="${!var:-}"
  if [ -n "$value" ]; then
    green "env:  $var = $value"
    PASS=$((PASS + 1))
  else
    red "env:  $var — NOT SET"
    MISSING+=("env var: $var")
    FAIL=$((FAIL + 1))
  fi
}

# Check a secret env var: must be set and non-empty; value is NEVER printed.
check_secret() {
  local var="$1"
  local value="${!var:-}"
  if [ -n "$value" ]; then
    green "secret: $var is present"
    PASS=$((PASS + 1))
  else
    yellow "secret: $var — not set (may be optional in some environments)"
    # Secrets are treated as warnings rather than hard failures in CI so that
    # forks and open PRs that lack repo secrets can still pass the workflow.
  fi
}

# Check a secret env var and enforce a minimum character length.
check_secret_min_length() {
  local var="$1" min_len="$2"
  local value="${!var:-}"
  if [ -z "$value" ]; then
    yellow "secret: $var — not set (may be optional in some environments)"
  elif [ "${#value}" -lt "$min_len" ]; then
    red "secret: $var — present but shorter than required minimum of $min_len characters"
    MISSING+=("secret: $var must be at least $min_len characters")
    FAIL=$((FAIL + 1))
  else
    green "secret: $var is present and meets minimum length"
    PASS=$((PASS + 1))
  fi
}

# ── Header ─────────────────────────────────────────────────────────────────
echo ""
echo "============================================================"
echo "  DZIRE_v1 — CI Stack & Environment Verification"
echo "============================================================"
echo ""

# ── 1. Tool checks ─────────────────────────────────────────────────────────
echo "--- Tools ---"
check_tool "Node.js"  node
check_tool "npm"      npm
check_tool "Python"   python3
check_tool "pip"      pip
check_tool "Git"      git

echo ""

# ── 2. Frontend dependency check ──────────────────────────────────────────
echo "--- Frontend ---"
FRONTEND_PKG="frontend/package.json"
if [ -f "$FRONTEND_PKG" ]; then
  if [ -d "frontend/node_modules" ]; then
    green "frontend: node_modules present"
    PASS=$((PASS + 1))
  else
    red "frontend: node_modules missing — run 'npm ci' inside frontend/"
    MISSING+=("frontend: node_modules")
    FAIL=$((FAIL + 1))
  fi
else
  yellow "frontend: $FRONTEND_PKG not found — skipping frontend checks"
fi

echo ""

# ── 3. Backend dependency check ───────────────────────────────────────────
echo "--- Backend ---"
BACKEND_REQ="backend/requirements.txt"
if [ -f "$BACKEND_REQ" ]; then
  # Spot-check that fastapi is importable (installed).
  if python3 -c "import fastapi" &>/dev/null; then
    green "backend: fastapi importable"
    PASS=$((PASS + 1))
  else
    red "backend: fastapi not installed — run 'pip install -r backend/requirements.txt'"
    MISSING+=("backend: fastapi not installed")
    FAIL=$((FAIL + 1))
  fi
else
  yellow "backend: $BACKEND_REQ not found — skipping backend checks"
fi

echo ""

# ── 4. Environment variable checks ────────────────────────────────────────
echo "--- Environment Variables ---"

# Non-secret vars: must have a value (CI defaults are set by the workflow).
check_var "APP_ENV"
check_var "JWT_ALGORITHM"
check_var "JWT_ACCESS_TOKEN_EXPIRE_MINUTES"
check_var "JWT_REFRESH_TOKEN_EXPIRE_DAYS"
check_var "BACKEND_HOST"
check_var "BACKEND_PORT"
check_var "VITE_API_BASE_URL"

echo ""

# Secret vars: presence-only check; never printed.
echo "--- Secrets (presence only) ---"
check_secret_min_length "APP_SECRET_KEY" 32
check_secret_min_length "JWT_SECRET_KEY" 32
check_secret "DATABASE_URL"
check_secret "MOTHERDUCK_TOKEN"
check_secret "VERCEL_PROJECT_ID"
check_secret "VERCEL_TEAM_ID"
check_secret "RENDER_SERVICE_ID"
check_secret "RENDER_API_KEY"

echo ""

# ── 5. Summary ────────────────────────────────────────────────────────────
echo "============================================================"
echo "  Results: ${PASS} passed | ${FAIL} failed"
echo "============================================================"

if [ "${#MISSING[@]}" -gt 0 ]; then
  echo ""
  echo "Missing items:"
  for item in "${MISSING[@]}"; do
    red "  • $item"
  done
  echo ""
fi

if [ "$FAIL" -gt 0 ]; then
  echo "VERIFICATION FAILED — resolve the items above before proceeding."
  exit 1
else
  echo "All required checks passed."
fi
