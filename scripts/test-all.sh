#!/usr/bin/env bash
# test-all.sh — Run the full DZIRE_v1 test suite
set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "==> Running all DZIRE_v1 tests from: $REPO_ROOT"

echo ""
echo "--- Backend tests (pytest) ---"
pytest "$REPO_ROOT/tests/backend/" -v

echo ""
echo "--- API tests (pytest) ---"
pytest "$REPO_ROOT/tests/api/" -v

echo ""
echo "--- Frontend tests (vitest) ---"
cd "$REPO_ROOT/frontend" && npm run test

echo ""
echo "==> All tests complete."
