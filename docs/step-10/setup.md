# Step 10 — Setup Instructions

## Required Environment Variables

Add the following to your `.env` file (copy from `backend/.env.example`):

```bash
# Token encryption key (base64-encoded 32-byte Fernet key)
# Generate with: python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
FERNET_ENCRYPTION_KEY=your-base64-fernet-key-here

# Social platform credentials (only required when connecting real accounts)
# X / Twitter
TWITTER_API_KEY=
TWITTER_API_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_SECRET=

# Instagram / Meta
INSTAGRAM_APP_ID=
INSTAGRAM_APP_SECRET=
INSTAGRAM_ACCESS_TOKEN=

# Facebook
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
FACEBOOK_PAGE_TOKEN=

# TikTok
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=

# YouTube
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=

# Reddit
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=
REDDIT_USERNAME=
REDDIT_PASSWORD=

# Bluesky
BLUESKY_HANDLE=
BLUESKY_APP_PASSWORD=

# Mastodon
MASTODON_INSTANCE_URL=
MASTODON_ACCESS_TOKEN=

# Discord
DISCORD_WEBHOOK_URL=
DISCORD_BOT_TOKEN=
```

## Generating a Fernet Key

```bash
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

Copy the output and set it as `FERNET_ENCRYPTION_KEY`.

## Database Migration

After setting up the database connection, apply the migration:

```bash
cd backend
alembic upgrade head
```

This creates the following tables:
- `content_calendar`
- `campaigns`
- `social_accounts`
- `social_posts`
- `social_size_chart`

## Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

New dependencies added in Step 10:
- `apscheduler>=3.10.0` — background job scheduler
- `cryptography>=42.0.0` — Fernet token encryption
