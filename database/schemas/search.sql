-- database/schemas/search.sql
-- Search index and query log tables for DZIRE_v1 Step 9

CREATE TABLE IF NOT EXISTS search_index (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id      UUID NOT NULL,
    content_type    TEXT NOT NULL DEFAULT 'post',
    title           TEXT NOT NULL,
    slug            TEXT NOT NULL,
    excerpt         TEXT,
    body_text       TEXT,
    category        TEXT,
    tags            TEXT[],
    author          TEXT,
    visibility      TEXT NOT NULL DEFAULT 'public',
    is_vip_only     BOOLEAN NOT NULL DEFAULT FALSE,
    seo_keywords    TEXT[],
    view_count      INTEGER NOT NULL DEFAULT 0,
    click_count     INTEGER NOT NULL DEFAULT 0,
    seo_score       FLOAT,
    published_at    TIMESTAMPTZ,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS search_query_logs (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID,
    session_id          TEXT,
    query               TEXT NOT NULL,
    filters             JSONB,
    result_count        INTEGER NOT NULL DEFAULT 0,
    clicked_result_id   UUID,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_search_index_content_id   ON search_index (content_id);
CREATE INDEX IF NOT EXISTS idx_search_index_content_type ON search_index (content_type);
CREATE INDEX IF NOT EXISTS idx_search_index_category     ON search_index (category);
CREATE INDEX IF NOT EXISTS idx_search_index_published_at ON search_index (published_at);
CREATE INDEX IF NOT EXISTS idx_search_query_logs_user_id ON search_query_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_search_query_logs_query   ON search_query_logs (query);
CREATE INDEX IF NOT EXISTS idx_search_query_logs_created ON search_query_logs (created_at);
