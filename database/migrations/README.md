# database/migrations — Alembic Migration Notes

Alembic migrations are managed from the backend/ directory.

Setup:

    cd backend
    alembic init alembic          # first-time only
    # Edit alembic.ini: set sqlalchemy.url = $DATABASE_URL

Create a new migration:

    alembic revision --autogenerate -m "description"

Apply migrations:

    alembic upgrade head

Rollback one step:

    alembic downgrade -1

Reference: <https://alembic.sqlalchemy.org/en/latest/>
