#!/usr/bin/env bash
# verify-stack.sh — Confirm required tools are installed for DZIRE_v1
set -e

echo "==> Verifying stack for DZIRE_v1..."

check_cmd() {
  if command -v "$1" &>/dev/null; then
    echo "  [OK] $1: $($1 --version 2>&1 | head -1)"
  else
    echo "  [MISSING] $1 — please install it."
  fi
}

check_cmd node
check_cmd npm
check_cmd python
check_cmd pip
check_cmd psql

echo ""
echo "==> Stack verification complete."
echo "    If any tools are MISSING, install them before running setup.sh."
