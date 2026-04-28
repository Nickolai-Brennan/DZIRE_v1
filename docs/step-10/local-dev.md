# Step 10 — Local Development Notes

## Running the Backend

```bash
cd backend
pip install -r requirements.txt
# Set environment variables (copy backend/.env.example → backend/.env, fill in values)
uvicorn app.main:app --reload
```

API docs available at: `http://localhost:8000/docs`

The APScheduler background job starts automatically with the app. It checks every 60 seconds for social posts with `scheduled_at <= now()` and status `scheduled` or `ready`, then dispatches them through the appropriate provider.

## Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

Admin panel at: `http://localhost:5173/admin`

New Step 10 admin routes:
- `/admin/content-calendar`
- `/admin/social-scheduler`
- `/admin/campaigns`
- `/admin/publishing-queue`
- `/admin/social-integrations`
- `/admin/social-metrics`
- `/admin/social-size-chart`

## Working Without Real Credentials

When `FERNET_ENCRYPTION_KEY` is not set:
- `encrypt_token` logs a warning and stores the token with an `UNENCRYPTED:` prefix.
- `decrypt_token` raises a `ValueError`.

When a social provider has no real credentials configured, the `MockProvider` is used, which returns mock data and logs actions to the console.

## Smoke Testing Key Endpoints

```bash
BASE=http://localhost:8000

# Health check
curl $BASE/health

# Create a campaign
curl -X POST $BASE/api/campaigns \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Campaign","campaign_type":"brand","status":"draft"}'

# Create a calendar item
curl -X POST $BASE/api/content-calendar \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Post","content_type":"social"}'

# Create a social account
curl -X POST $BASE/api/social/accounts \
  -H "Content-Type: application/json" \
  -d '{"platform":"instagram","account_name":"Test Account"}'

# Create and schedule a social post (replace account_id with real UUID from above)
curl -X POST $BASE/api/social/posts \
  -H "Content-Type: application/json" \
  -d '{"platform":"instagram","account_id":"<account_id>","caption":"Hello world!"}'

# List size chart entries
curl $BASE/api/social-size-chart

# List platforms in size chart
curl $BASE/api/social-size-chart/platforms
```

## Template Assets

Social media template placeholder folders are at:
```
frontend/public/social-templates/
├── instagram/
├── facebook/
├── x-twitter/
├── tiktok/
├── youtube/
├── linkedin/
├── pinterest/
├── reddit/
├── bluesky/
├── threads/
├── mastodon/
└── discord/
```

Drop template files (PNG/PSD/Figma exports) into the appropriate folder. The `TemplateDownloadButton` component serves them from `/social-templates/<platform>/<filename>`.
