-- database/schemas/user_behavior.sql
-- User behavior events and preferences tables for DZIRE_v1 Step 9

CREATE TABLE IF NOT EXISTS user_behavior_events (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID,
    session_id       TEXT,
    event_type       TEXT NOT NULL,
    content_id       UUID,
    content_type     TEXT,
    category         TEXT,
    tags             TEXT[],
    duration_seconds INTEGER,
    scroll_depth     FLOAT,
    source           TEXT,
    event_metadata   JSONB,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_preferences (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                 UUID NOT NULL UNIQUE,
    favorite_categories     TEXT[],
    favorite_tags           TEXT[],
    preferred_content_types TEXT[],
    blocked_tags            TEXT[],
    vip_interest_score      FLOAT NOT NULL DEFAULT 0,
    personalization_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    last_updated            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_behavior_events_user_id    ON user_behavior_events (user_id);
CREATE INDEX IF NOT EXISTS idx_user_behavior_events_event_type ON user_behavior_events (event_type);
CREATE INDEX IF NOT EXISTS idx_user_behavior_events_created_at ON user_behavior_events (created_at);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id        ON user_preferences (user_id);
