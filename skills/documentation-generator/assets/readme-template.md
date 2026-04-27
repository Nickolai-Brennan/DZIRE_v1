# [Project Name]

> [One-line description of what this project is and what problem it solves.]

## Overview

[2-3 sentences describing the project's purpose, target users, and key value proposition.]

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS |
| Backend | FastAPI + Python 3.11 + SQLAlchemy |
| Database | PostgreSQL (MotherDuck) + Alembic |
| Auth | JWT (access + refresh tokens) |
| API | REST (`/api/v1/`) |
| Testing | pytest + Vitest + Playwright |
| Deploy | Vercel (frontend) + Render (backend) |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/[org]/[repo].git
cd [repo]

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && pip install -r requirements.txt

# Copy environment variables
cp config/env.example .env
# Edit .env with your values

# Run database migrations
alembic upgrade head

# Start development servers
# Terminal 1: backend
cd backend && uvicorn app.main:app --reload

# Terminal 2: frontend
cd frontend && npm run dev
```

## Project Structure

```
[repo]/
├── frontend/          # React + Vite frontend
├── backend/           # FastAPI backend
├── database/          # Schemas, migrations, seeds
├── api/               # API contracts and route maps
├── agents/            # AI agent configurations
├── skills/            # Reusable AI skills
├── workflows/         # Workflow documentation
├── instructions/      # Copilot instruction files
├── config/            # Stack config and env example
├── docs/              # Project documentation
├── evals/             # Evaluation cases
└── scripts/           # Development scripts
```

## Documentation

- [Architecture Guide](architecture.md)
- [Setup Guide](setup.md)
- [API Reference](api-reference.md)
- [Changelog](changelog.md)

## Contributing

1. Check `task-list.txt` for current tasks
2. Create a feature branch
3. Follow conventions in `instructions/`
4. Run tests before submitting: `scripts/test-all.sh`
5. Submit a pull request with a descriptive title
