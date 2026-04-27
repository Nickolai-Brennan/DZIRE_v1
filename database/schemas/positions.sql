-- database/schemas/positions.sql
-- Owner: database-agent
-- Purpose: Position content with scoring and metadata

CREATE TABLE IF NOT EXISTS positions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug        TEXT NOT NULL UNIQUE,
    title       TEXT NOT NULL,
    description TEXT,
    category    TEXT,
    difficulty  TEXT,
    score       NUMERIC(4, 2),
    image_url   TEXT,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_positions_slug     ON positions (slug);
CREATE INDEX IF NOT EXISTS idx_positions_category ON positions (category);
