# Setup Guide — DZIRE_v1

## Prerequisites

- Node.js 20+
- Python 3.11+
- Git
- Docker (optional, for containerized backend)

## 1. Clone the Repository

```bash
git clone https://github.com/Nickolai-Brennan/DZIRE_v1.git
cd DZIRE_v1
```

## 2. Run Setup Script

```bash
bash scripts/setup.sh
```

This creates all required project folders.

## 3. Configure Environment Variables

```bash
cp config/env.example .env
```

Edit `.env` and fill in:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `MOTHERDUCK_TOKEN` | MotherDuck access token |
| `JWT_SECRET` | Secret key for JWT signing |
| `JWT_ALGORITHM` | e.g. `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | e.g. `15` |
| `REFRESH_TOKEN_EXPIRE_DAYS` | e.g. `30` |

## 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## 5. Backend Setup

```bash
cd backend
pip install -r requirements.txt  # (once requirements.txt is created)
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`.

## 6. Verify Stack

```bash
bash scripts/verify-stack.sh
```

## 7. Run All Tests

```bash
bash scripts/test-all.sh
```

## Reference
- [`config/env.example`](../config/env.example)
- [`docs/stack.md`](./stack.md)
- [`scripts/setup.sh`](../scripts/setup.sh)
