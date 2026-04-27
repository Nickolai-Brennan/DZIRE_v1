#!/usr/bin/env bash
# run-dev.sh — Start frontend and backend dev servers for DZIRE_v1
set -e

echo "==> Starting DZIRE_v1 dev servers..."

# Start backend in background
echo "==> Starting FastAPI backend on port 8000..."
cd backend && uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# Start frontend
echo "==> Starting Vite frontend on port 5173..."
cd frontend && npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "==> Dev servers running."
echo "    Backend: http://localhost:8000"
echo "    Frontend: http://localhost:5173"
echo ""
echo "    Press Ctrl+C to stop."
wait $BACKEND_PID $FRONTEND_PID
