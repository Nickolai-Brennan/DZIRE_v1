-- database/schemas/newsletter.sql
-- Newsletter subscriber and campaign tables for DZIRE_v1

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email            TEXT NOT NULL UNIQUE,
    first_name       TEXT,
    source           TEXT,
    status           TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','unsubscribed','bounced')),
    tags             TEXT[],
    is_vip           BOOLEAN NOT NULL DEFAULT FALSE,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    unsubscribed_at  TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS newsletter_campaigns (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject       TEXT NOT NULL,
    preview_text  TEXT,
    body_content  TEXT,
    status        TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','scheduled','sent','archived')),
    scheduled_at  TIMESTAMPTZ,
    sent_at       TIMESTAMPTZ,
    open_rate     NUMERIC(5,4),
    click_rate    NUMERIC(5,4),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter_sends (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id     UUID NOT NULL REFERENCES newsletter_campaigns(id) ON DELETE CASCADE,
    subscriber_id   UUID NOT NULL REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,
    sent_at         TIMESTAMPTZ,
    opened_at       TIMESTAMPTZ,
    clicked_at      TIMESTAMPTZ,
    bounced         BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (campaign_id, subscriber_id)
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email    ON newsletter_subscribers (email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status   ON newsletter_subscribers (status);
CREATE INDEX IF NOT EXISTS idx_newsletter_campaigns_status     ON newsletter_campaigns (status);
