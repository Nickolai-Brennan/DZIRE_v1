-- database/schemas/subscriptions.sql
-- VIP plan and subscription tables for DZIRE_v1

CREATE TABLE IF NOT EXISTS vip_plans (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name              TEXT NOT NULL,
    price             NUMERIC(10,2) NOT NULL,
    billing_interval  TEXT NOT NULL CHECK (billing_interval IN ('monthly','annual','lifetime')),
    description       TEXT,
    features          JSONB,
    status            TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','archived')),
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vip_subscriptions (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                 UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id                 UUID NOT NULL REFERENCES vip_plans(id) ON DELETE RESTRICT,
    status                  TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','canceled','past_due','trialing')),
    started_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    renews_at               TIMESTAMPTZ,
    canceled_at             TIMESTAMPTZ,
    payment_provider        TEXT,
    provider_subscription_id TEXT,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vip_payments (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id  UUID NOT NULL REFERENCES vip_subscriptions(id) ON DELETE CASCADE,
    amount           NUMERIC(10,2) NOT NULL,
    currency         TEXT NOT NULL DEFAULT 'USD',
    status           TEXT NOT NULL CHECK (status IN ('succeeded','failed','pending','refunded')),
    provider_payment_id TEXT,
    paid_at          TIMESTAMPTZ,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vip_subscriptions_user   ON vip_subscriptions (user_id);
CREATE INDEX IF NOT EXISTS idx_vip_subscriptions_plan   ON vip_subscriptions (plan_id);
CREATE INDEX IF NOT EXISTS idx_vip_subscriptions_status ON vip_subscriptions (status);
