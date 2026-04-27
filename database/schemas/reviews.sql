-- database/schemas/reviews.sql
-- Owner: database-agent
-- Purpose: Editorial and user reviews with scores

CREATE TABLE IF NOT EXISTS reviews (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug         TEXT NOT NULL UNIQUE,
    title        TEXT NOT NULL,
    body         TEXT,
    score        NUMERIC(4, 2),
    author_id    UUID REFERENCES users(id) ON DELETE SET NULL,
    position_id  UUID REFERENCES positions(id) ON DELETE SET NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_slug        ON reviews (slug);
CREATE INDEX IF NOT EXISTS idx_reviews_author_id   ON reviews (author_id);
CREATE INDEX IF NOT EXISTS idx_reviews_position_id ON reviews (position_id);
