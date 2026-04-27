# Project Overview — DZIRE_v1

## Summary
DZIRE_v1 is a full-stack web application built with React + Vite + TypeScript on the frontend and FastAPI + Python on the backend, backed by PostgreSQL on MotherDuck.

## Product Purpose
A content and community platform featuring positions, reviews, a dictionary, stories, a magazine, and a VIP section.

## Target Users
- General public (read-only content consumers)
- Registered members (reviews, newsletter, VIP)
- Administrators (content management via admin panel)

## Core Features
- Positions browser with filters and detail pages
- Review system with scores and detail views
- Dictionary with term search and individual term pages
- Stories and Magazine content sections
- Dzire Dolls profiles
- Newsletter subscription
- VIP membership section
- Admin panel (planned)
- Search across content types

## Stack
- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS → Vercel
- **Backend**: FastAPI + Python 3.11+ → Render
- **Database**: PostgreSQL on MotherDuck
- **API**: REST (`/api/v1/`) + GraphQL (Strawberry, planned)
- **Auth**: JWT (access token in memory, refresh token in HttpOnly cookie)

## Revenue Model
- VIP membership subscriptions
- Newsletter

## Reference
- [`config/stack.config.json`](../config/stack.config.json)
- [`docs/stack.md`](./stack.md)
- [`docs/architecture.md`](./architecture.md)
