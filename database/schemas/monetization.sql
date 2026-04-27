-- database/schemas/monetization.sql
-- Affiliate and sponsor tables for DZIRE_v1

CREATE TABLE IF NOT EXISTS affiliates (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT NOT NULL,
    website         TEXT,
    contact_email   TEXT,
    network         TEXT,
    commission_rate NUMERIC(5,4),
    status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','pending')),
    notes           TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS affiliate_links (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    affiliate_id        UUID NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
    post_id             UUID REFERENCES cms_posts(id) ON DELETE SET NULL,
    product_name        TEXT NOT NULL,
    destination_url     TEXT NOT NULL,
    tracking_url        TEXT,
    coupon_code         TEXT,
    click_count         INTEGER NOT NULL DEFAULT 0,
    conversion_count    INTEGER NOT NULL DEFAULT 0,
    estimated_revenue   NUMERIC(12,2) NOT NULL DEFAULT 0,
    status              TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive')),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS affiliate_clicks (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    affiliate_link_id UUID NOT NULL REFERENCES affiliate_links(id) ON DELETE CASCADE,
    session_id       TEXT,
    user_id          UUID REFERENCES users(id) ON DELETE SET NULL,
    referrer         TEXT,
    device_type      TEXT,
    country          TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sponsors (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name          TEXT NOT NULL,
    website       TEXT,
    contact_name  TEXT,
    contact_email TEXT,
    logo_url      TEXT,
    status        TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','pending')),
    notes         TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sponsor_campaigns (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sponsor_id     UUID NOT NULL REFERENCES sponsors(id) ON DELETE CASCADE,
    campaign_name  TEXT NOT NULL,
    placement_type TEXT NOT NULL CHECK (placement_type IN (
        'homepage_banner','sidebar_card','article_inline','newsletter_sponsor',
        'vip_area_sponsor','footer_sponsor','social_mention'
    )),
    start_date     DATE,
    end_date       DATE,
    budget         NUMERIC(12,2),
    impressions    INTEGER NOT NULL DEFAULT 0,
    clicks         INTEGER NOT NULL DEFAULT 0,
    ctr            NUMERIC(5,4),
    status         TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','active','paused','completed')),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sponsor_placements (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id  UUID NOT NULL REFERENCES sponsor_campaigns(id) ON DELETE CASCADE,
    post_id      UUID REFERENCES cms_posts(id) ON DELETE SET NULL,
    location     TEXT NOT NULL,
    content      JSONB,
    impressions  INTEGER NOT NULL DEFAULT 0,
    clicks       INTEGER NOT NULL DEFAULT 0,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sponsor_clicks (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    placement_id UUID NOT NULL REFERENCES sponsor_placements(id) ON DELETE CASCADE,
    session_id   TEXT,
    user_id      UUID REFERENCES users(id) ON DELETE SET NULL,
    referrer     TEXT,
    device_type  TEXT,
    country      TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_affiliates_status          ON affiliates (status);
CREATE INDEX IF NOT EXISTS idx_affiliate_links_affiliate  ON affiliate_links (affiliate_id);
CREATE INDEX IF NOT EXISTS idx_sponsors_status            ON sponsors (status);
CREATE INDEX IF NOT EXISTS idx_sponsor_campaigns_sponsor  ON sponsor_campaigns (sponsor_id);
