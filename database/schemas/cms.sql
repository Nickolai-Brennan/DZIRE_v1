-- database/schemas/cms.sql
-- CMS content tables for DZIRE_v1

CREATE TABLE IF NOT EXISTS cms_authors (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
    name        TEXT NOT NULL,
    bio         TEXT,
    avatar_url  TEXT,
    social_links JSONB,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL UNIQUE,
    slug        TEXT NOT NULL UNIQUE,
    description TEXT,
    parent_id   UUID REFERENCES cms_categories(id) ON DELETE SET NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_tags (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name       TEXT NOT NULL UNIQUE,
    slug       TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_posts (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title                   TEXT NOT NULL,
    slug                    TEXT NOT NULL UNIQUE,
    subtitle                TEXT,
    excerpt                 TEXT,
    body_content            TEXT,
    content_type            TEXT NOT NULL DEFAULT 'blog_article' CHECK (content_type IN (
        'blog_article','editorial','review','guide','news_post','sponsor_post',
        'affiliate_post','vip_post','social_embed_post','newsletter_feature','landing_page'
    )),
    status                  TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','scheduled','published','archived')),
    visibility              TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public','members','vip','private')),
    author_id               UUID REFERENCES cms_authors(id) ON DELETE SET NULL,
    category_id             UUID REFERENCES cms_categories(id) ON DELETE SET NULL,
    featured_image          TEXT,
    seo_title               TEXT,
    seo_description         TEXT,
    keywords                TEXT[],
    affiliate_links         JSONB,
    sponsor_id              UUID,
    is_vip_only             BOOLEAN NOT NULL DEFAULT FALSE,
    published_at            TIMESTAMPTZ,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_post_tags (
    post_id UUID NOT NULL REFERENCES cms_posts(id) ON DELETE CASCADE,
    tag_id  UUID NOT NULL REFERENCES cms_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE IF NOT EXISTS cms_media (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename    TEXT NOT NULL,
    url         TEXT NOT NULL,
    mime_type   TEXT,
    size_bytes  INTEGER,
    alt_text    TEXT,
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_social_embeds (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform         TEXT NOT NULL CHECK (platform IN ('twitter','instagram','tiktok','youtube','reddit','bluesky','facebook','threads')),
    embed_url        TEXT NOT NULL,
    embed_code       TEXT,
    caption          TEXT,
    related_post_id  UUID REFERENCES cms_posts(id) ON DELETE SET NULL,
    click_count      INTEGER NOT NULL DEFAULT 0,
    display_location TEXT,
    status           TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive')),
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cms_posts_slug       ON cms_posts (slug);
CREATE INDEX IF NOT EXISTS idx_cms_posts_status     ON cms_posts (status);
CREATE INDEX IF NOT EXISTS idx_cms_posts_author     ON cms_posts (author_id);
CREATE INDEX IF NOT EXISTS idx_cms_posts_category   ON cms_posts (category_id);
CREATE INDEX IF NOT EXISTS idx_cms_categories_slug  ON cms_categories (slug);
CREATE INDEX IF NOT EXISTS idx_cms_tags_slug        ON cms_tags (slug);
