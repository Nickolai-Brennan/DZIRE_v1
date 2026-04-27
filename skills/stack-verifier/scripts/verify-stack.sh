#!/usr/bin/env bash
# verify-stack.sh
# Verifies the DZIRE_v1 development stack is correctly installed.
# Usage: ./scripts/verify-stack.sh [--env-file .env]
# Exit code 0 = all checks passed; 1 = one or more checks failed

set -euo pipefail

ENV_FILE="${1:-${ENV_FILE:-.env}}"
PASS=0
FAIL=0
MISSING=()

# ── Helpers ────────────────────────────────────────────────────────────────
green()  { echo -e "\033[0;32m✔  $*\033[0m"; }
red()    { echo -e "\033[0;31m✘  $*\033[0m"; }
yellow() { echo -e "\033[0;33m⚠  $*\033[0m"; }

check_tool() {
    local name="$1"
    local cmd="$2"
    local min_version="$3"
    if command -v "$cmd" &>/dev/null; then
        local version
        version=$($cmd --version 2>&1 | head -1 | grep -oP '[\d]+\.[\d]+' | head -1)
        green "$name $version"
        ((PASS++))
    else
        red "$name — NOT FOUND (required: $min_version+)"
        MISSING+=("$name: install $min_version+")
        ((FAIL++))
    fi
}

check_env_var() {
    local var="$1"
    if [ -n "${!var:-}" ]; then
        green "env: $var is set"
        ((PASS++))
    else
        red "env: $var is NOT set"
        MISSING+=("env var: $var")
        ((FAIL++))
    fi
}

# ── Load .env ──────────────────────────────────────────────────────────────
echo ""
echo "=== DZIRE_v1 Stack Verifier ==="
echo ""

if [ -f "$ENV_FILE" ]; then
    # shellcheck disable=SC1090
    set -a
    source "$ENV_FILE"
    set +a
    yellow "Loaded env from $ENV_FILE"
else
    yellow "No $ENV_FILE found — skipping env var load"
fi

# ── System Tools ───────────────────────────────────────────────────────────
echo ""
echo "--- System Tools ---"
check_tool "Node.js"   "node"    "18"
check_tool "npm"       "npm"     "9"
check_tool "Python"    "python3" "3.11"
check_tool "pip"       "pip3"    "23"
check_tool "Docker"    "docker"  "24"
check_tool "Git"       "git"     "2"

# ── Frontend Dependencies ──────────────────────────────────────────────────
echo ""
echo "--- Frontend ---"
if [ -d "frontend/node_modules" ]; then
    green "frontend/node_modules exists"
    ((PASS++))
else
    red "frontend/node_modules NOT found — run: cd frontend && npm install"
    MISSING+=("frontend: npm install")
    ((FAIL++))
fi

# ── Backend Dependencies ───────────────────────────────────────────────────
echo ""
echo "--- Backend ---"
for pkg in fastapi uvicorn sqlalchemy alembic pydantic; do
    if pip3 show "$pkg" &>/dev/null 2>&1; then
        version=$(pip3 show "$pkg" 2>/dev/null | grep ^Version | awk '{print $2}')
        green "Python: $pkg $version"
        ((PASS++))
    else
        red "Python: $pkg — NOT installed"
        MISSING+=("pip install $pkg")
        ((FAIL++))
    fi
done

# ── Environment Variables ──────────────────────────────────────────────────
echo ""
echo "--- Environment Variables ---"
for var in DATABASE_URL SECRET_KEY JWT_ALGORITHM FRONTEND_URL; do
    check_env_var "$var"
done

# ── Summary ────────────────────────────────────────────────────────────────
echo ""
echo "=== Summary ==="
echo "  Passed:  $PASS"
echo "  Failed:  $FAIL"

if [ ${#MISSING[@]} -gt 0 ]; then
    echo ""
    echo "Missing items:"
    for item in "${MISSING[@]}"; do
        echo "  - $item"
    done
fi

echo ""
if [ "$FAIL" -eq 0 ]; then
    green "All checks passed. Stack is ready."
    exit 0
else
    red "$FAIL check(s) failed. See missing items above."
    exit 1
fi
