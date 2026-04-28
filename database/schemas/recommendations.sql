-- database/schemas/recommendations.sql
-- Recommendations and saved posts tables for DZIRE_v1 Step 9

CREATE TABLE IF NOT EXISTS recommendations (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID,
    content_id          UUID NOT NULL,
    content_type        TEXT NOT NULL DEFAULT 'post',
    recommendation_type TEXT NOT NULL,
    score               FLOAT NOT NULL DEFAULT 0,
    reason              TEXT,
    shown_at            TIMESTAMPTZ,
    clicked_at          TIMESTAMPTZ,
    dismissed_at        TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS saved_posts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL,
    post_id         UUID NOT NULL REFERENCES cms_posts(id) ON DELETE CASCADE,
    collection_name TEXT NOT NULL DEFAULT 'default',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, post_id, collection_name)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id  ON recommendations (user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_type     ON recommendations (recommendation_type);
CREATE INDEX IF NOT EXISTS idx_saved_posts_user_id      ON saved_posts (user_id);
CREATE INDEX IF NOT EXISTS idx_saved_posts_collection   ON saved_posts (user_id, collection_name);
