#!/usr/bin/env bash
# test-all.sh — Run the full DZIRE_v1 test suite
set -e

echo "==> Running all DZIRE_v1 tests..."

echo ""
echo "--- Backend tests (pytest) ---"
cd backend && pytest ../tests/backend/ -v && cd ..

echo ""
echo "--- API tests (pytest) ---"
cd backend && pytest ../tests/api/ -v && cd ..

echo ""
echo "--- Frontend tests (vitest) ---"
cd frontend && npm run test && cd ..

echo ""
echo "==> All tests complete."
