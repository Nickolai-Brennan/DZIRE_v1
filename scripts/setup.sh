#!/usr/bin/env bash
# setup.sh — Create base folders and install starter dependencies for DZIRE_v1
set -e

echo "==> Setting up DZIRE_v1..."

# Frontend
echo "==> Installing frontend dependencies..."
cd frontend && npm install && cd ..

# Backend
echo "==> Installing backend dependencies..."
cd backend && pip install -r requirements.txt 2>/dev/null || echo "No requirements.txt yet." && cd ..

echo "==> Setup complete."
