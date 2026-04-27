-- database/schemas/analytics.sql
-- Analytics + SEO tables for DZIRE_v1

CREATE TABLE IF NOT EXISTS analytics_events (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type    TEXT NOT NULL CHECK (event_type IN (
        'page_view','post_view','affiliate_click','sponsor_click','newsletter_signup',
        'vip_signup','social_embed_click','search_query','tag_click','category_click'
    )),
    user_id       UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id    TEXT,
    post_id       UUID REFERENCES cms_posts(id) ON DELETE SET NULL,
    source        TEXT,
    referrer      TEXT,
    utm_source    TEXT,
    utm_medium    TEXT,
    utm_campaign  TEXT,
    device_type   TEXT,
    country       TEXT,
    region        TEXT,
    city          TEXT,
    event_metadata JSONB,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS page_views (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    path        TEXT NOT NULL,
    referrer    TEXT,
    session_id  TEXT,
    user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
    device_type TEXT,
    country     TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS click_events (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    element     TEXT NOT NULL,
    url         TEXT,
    post_id     UUID REFERENCES cms_posts(id) ON DELETE SET NULL,
    session_id  TEXT,
    user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS social_metrics (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform     TEXT NOT NULL,
    metric_type  TEXT NOT NULL,
    value        INTEGER NOT NULL DEFAULT 0,
    recorded_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seo_reports (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id                 UUID REFERENCES cms_posts(id) ON DELETE CASCADE,
    seo_score               INTEGER NOT NULL DEFAULT 0,
    word_count              INTEGER,
    title_length            INTEGER,
    meta_description_length INTEGER,
    keyword_count           INTEGER,
    tag_count               INTEGER,
    internal_links          INTEGER,
    external_links          INTEGER,
    missing_image_alt_count INTEGER,
    recommendations         JSONB,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS keyword_reports (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword      TEXT NOT NULL,
    post_id      UUID REFERENCES cms_posts(id) ON DELETE SET NULL,
    impressions  INTEGER NOT NULL DEFAULT 0,
    clicks       INTEGER NOT NULL DEFAULT 0,
    position     NUMERIC(5,2),
    recorded_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_type       ON analytics_events (event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events (created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_path             ON page_views (path);
CREATE INDEX IF NOT EXISTS idx_seo_reports_post_id         ON seo_reports (post_id);
