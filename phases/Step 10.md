# STEP 10 — FULL CONTENT CALENDAR + SOCIAL PUBLISHING SYSTEM

Step 10 creates the publishing operations system for scheduled content, campaigns, social platform integrations, publishing queues, social analytics, and platform-specific creative requirements.

Sources for current sizing/limit reference include Hootsuite’s April 1, 2026 social image-size guide, which states most platforms still work best with 1080px-wide images and that vertical 4:5 and 9:16 formats now outperform square on many networks. Mastodon’s official docs list a default 500-character post limit, Discord’s webhook docs list message content up to 2,000 characters, and AP’s Bluesky explainer confirms Bluesky posts are limited to 300 characters. 0

---

## STEP 10 OBJECTIVE

```text
CMS
→ Content Calendar
→ Campaign Planner
→ Social Scheduler
→ Publishing Queue
→ Social Integrations
→ Social Metrics
→ Size Chart Reference

```


## OVERVIEW
Build a full-scale content distribution and social publishing engine.


This system includes:
- Content calendar
- Campaign planner
- Social scheduler
- Publishing queue
- Social integrations
- Metrics dashboard
- Social media size chart system

---

## OBJECTIVE

```
Plan → Schedule → Publish → Track → Optimize → Scale
```

## TASK LIST


```
T-166 Create content calendar schema  
T-167 Create social integrations schema  
T-168 Create campaign schema  
T-169 Build calendar backend routes  
T-170 Build social account routes  
T-171 Build social post scheduler  
T-172 Build campaign planner  
T-173 Build content calendar page  
T-174 Build publishing queue  
T-175 Build social metrics dashboard  
T-176 Add social provider modules  
T-177 Add social integration docs  
T-178 Run social publishing review  

```
---

## DATABASE SCHEMA

### content_calendar

```sql

CREATE TABLE content_calendar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content_type VARCHAR(80) NOT NULL,
    related_post_id UUID NULL,
    campaign_id UUID NULL,
    platform VARCHAR(80) NULL,
    status VARCHAR(40) NOT NULL DEFAULT 'idea',
    scheduled_at TIMESTAMP NULL,
    published_at TIMESTAMP NULL,
    assigned_to UUID NULL,
    priority INTEGER DEFAULT 3,
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

```


```
id  
title  
content_type  
campaign_id  
platform  
status  
scheduled_at  
published_at  
assigned_to  
priority  
notes  

```
---

### social_accounts

```sql
CREATE TABLE social_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform VARCHAR(80) NOT NULL,
    account_name VARCHAR(255) NOT NULL,
    account_handle VARCHAR(255),
    external_account_id VARCHAR(255),
    auth_type VARCHAR(80),
    access_token_encrypted TEXT,
    refresh_token_encrypted TEXT,
    webhook_url TEXT,
    status VARCHAR(40) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE social_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform VARCHAR(80) NOT NULL,
    account_id UUID REFERENCES social_accounts(id),
    related_content_id UUID NULL,
    campaign_id UUID NULL,
    caption TEXT,
    media_url TEXT,
    post_url TEXT,
    hashtags TEXT[],
    status VARCHAR(40) DEFAULT 'draft',
    scheduled_at TIMESTAMP NULL,
    published_at TIMESTAMP NULL,
    external_post_id VARCHAR(255),
    platform_specific_data JSONB DEFAULT '{}',
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

```


```
id  
platform  
account_name  
account_handle  
auth_type  
access_token  
refresh_token  
webhook_url  
status  

```
---

### social_posts

```
id  
platform  
account_id  
content_id  
campaign_id  
caption  
media_url  
status  
scheduled_at  
published_at  
metrics  

```
---

### campaigns

---
```sql
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    campaign_type VARCHAR(80),
    goal TEXT,
    start_date DATE,
    end_date DATE,
    status VARCHAR(40) DEFAULT 'draft',
    budget NUMERIC(12,2),
    target_platforms TEXT[],
    primary_cta VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

```
id  
name  
goal  
budget  
start_date  
end_date  
status  
platforms  
cta  

```
---

## ADMIN ROUTES
```
/admin/content-calendar
/admin/campaigns
/admin/social-scheduler
/admin/publishing-queue
/admin/social-integrations
/admin/social-metrics
/admin/social-size-chart
```
## BACKEND ROUTES
```
/api/content-calendar
/api/content-calendar/{id}
/api/content-calendar/schedule
/api/content-calendar/publish
/api/content-calendar/status

/api/social/accounts
/api/social/accounts/{id}
/api/social/posts
/api/social/posts/schedule
/api/social/posts/publish
/api/social/metrics
/api/social/webhooks

/api/campaigns
/api/campaigns/{id}
/api/campaigns/{id}/calendar
/api/campaigns/{id}/metrics

/api/social-size-chart
/api/social-size-chart/platforms
/api/social-size-chart/assets
```
---

## FRONTEND PAGES

```
/admin/content-calendar  
/admin/social-scheduler  
/admin/campaigns  
/admin/publishing-queue  
/admin/social-metrics  
/admin/social-size-chart  

---

## CONTENT CALENDAR FEATURES

- Drag and drop scheduling  
- Multi-platform assignment  
- Campaign linking  
- Priority tagging  
- Status tracking  

```
---

## CONTENT CALENDAR VIEWS

```
Monthly Calendar
Weekly Calendar
Daily Publishing Queue
Kanban Pipeline
Campaign Timeline
Platform Schedule
Sponsor Campaign View
Affiliate Promo View
VIP Content Drop View
```

## SOCIAL SCHEDULER FEATURES

```
- Platform selector  
- Caption editor  
- Media uploader  
- Hashtag manager  
- Time scheduling  
- Preview per platform  

```
---

## PUBLISHING QUEUE

```
States:
- Draft  
- Scheduled  
- Ready  
- Publishing  
- Published  
- Failed  

```
---

## SOCIAL INTEGRATIONS

Platforms supported:

```
X / Twitter  
Instagram  
Facebook  
TikTok  
YouTube  
Reddit  
Bluesky  
Threads  
Mastodon  
Discord  
LinkedIn  
Pinterest  

```
---

## SOCIAL PROVIDER MODULES

Each provider must support:

```
connect_account  
schedule_post  
publish_post  
fetch_metrics  
handle_webhook  

```
---

## SOCIAL METRICS

```
Impressions  
Clicks  
Likes  
Shares  
Comments  
CTR  
Follower Growth  

```
---

## SOCIAL MEDIA SIZE CHART

### Universal Sizes

```
Square — 1080x1080  
Landscape — 1200x628  
Vertical — 1080x1350  
Story — 1080x1920  
Thumbnail — 1280x720  

```
---

### Platform Sizes

```
Instagram — 1080x1080 / 1080x1350  
Facebook — 1200x630  
X — 1200x675  
TikTok — 1080x1920  
YouTube — 1280x720  
LinkedIn — 1200x627  
Pinterest — 1000x1500  
Bluesky — 1200x627  
Threads — 1080x1350  
Mastodon — 1200x675  
Discord — 1200x628  

```
---

## WORKFLOW

```
1. Create content  
2. Assign campaign  
3. Select platforms  
4. Apply sizing  
5. Add caption  
6. Schedule  
7. Publish  
8. Track metrics  
9. Optimize  

```
---

## ADMIN DASHBOARD

```
Calendar View  
Campaign View  
Scheduler  
Publishing Queue  
Metrics Dashboard  
Size Chart  

```
---

## FILE STRUCTURE

```
backend/app/content_calendar  
backend/app/social_integrations  
backend/app/campaigns  

frontend/src/admin/content-calendar  
frontend/src/admin/social  
frontend/src/admin/campaigns  

docs/step-10  

```
---

## SOCIAL PUBLISHING WORKFLOWS 
```
Create content idea
→ Assign campaign
→ Draft article or social post
→ Select platforms
→ Apply platform size rules
→ Generate captions
→ Add hashtags
→ Attach media
→ Schedule post
→ Publish through provider
→ Track metrics
→ Review performance
```
## 11. SOCIAL MEDIA SIZE CHART

Use this as the default design reference for the content calendar and social publishing system.
Universal Creative Defaults
Asset
Size
Ratio
Square Post
1080 × 1080
1:1
Landscape Post
1200 × 628
1.91:1
Vertical Post
1080 × 1350
4:5
Story / Reel
1080 × 1920
9:16
YouTube Thumbnail
1280 × 720
16:9
Blog Social Preview
1200 × 630
1.91:1
Profile Photo Base
400 × 400
1:1
Banner Base
1500 × 500
3:1
Platform Size Chart
Platform
Profile
Banner
Text
Instagram
320 × 320
N/A
2,200
Facebook Page
196 × 196
851 × 315
63,206
X / Twitter
400 × 400
1500 × 500
280
TikTok
20 × 20 min
N/A
varies
YouTube
800 × 800
2560 × 1440
100 title
LinkedIn Page
400 × 400
1128 × 191
3,000
Pinterest
165 × 165
800 × 450
500 desc
Reddit
256 × 256
1920 × 384
varies
Bluesky
400 × 400
1500 × 500
300
Threads
320 × 320+
N/A
500
Mastodon
400 × 400
1500 × 500
500 default
Discord User
256 × 256
600 × 240
2,000
Discord Server
512 × 512
960 × 540
short
Feed / Post Sizes
Platform
Square
Landscape
Vertical
Instagram
1080 × 1080
1080 × 566
1080 × 1350
Facebook
1080 × 1080
1200 × 630
1080 × 1359
X / Twitter
720 × 720
1280 × 720
720 × 1280
TikTok
640 × 640 ad
1920 × 1080 ad
1080 × 1920
LinkedIn
1200 × 1200
1200 × 627
720 × 900
Pinterest
1000 × 1000
N/A
1000 × 1500
Bluesky
1080 × 1080
1200 × 627
vertical OK
Threads
1080 × 1080
1200 × 628
1080 × 1350
Mastodon
1080 × 1080
1200 × 675
optional
Discord
N/A
1200 × 628
N/A
12. PLATFORM-SPECIFIC NOTES
Instagram
Asset
Size
Square Feed
1080 × 1080
Portrait Feed
1080 × 1350
Landscape Feed
1080 × 566
Story
1080 × 1920
Reel Cover
1080 × 1920
Profile Photo
320 × 320
Keep important text away from the top and bottom of Reels and Stories because native UI buttons can cover captions and calls to action.
Facebook
Asset
Size
Page Profile
196 × 196
Cover Photo
851 × 315
Link Share
1200 × 630
Square Post
1080 × 1080
Story / Reel
1080 × 1920
Event Cover
1920 × 1005
Use 1200 × 630 as the default Open Graph image size for shared blog links.
X / Twitter
Asset
Size
Profile Photo
400 × 400
Header
1500 × 500
Landscape Image
1280 × 720
Square Image
720 × 720
Vertical Image
720 × 1280
Link Card
1200 × 628
Keep banner text centered because profile images and mobile crops can hide side content.
TikTok
Asset
Size
Profile Photo
20 × 20 min
Vertical Video
1080 × 1920
Story
1080 × 1920
Landscape Ad
1920 × 1080
Square Ad
640 × 640
Use 1080 × 1920 for TikTok-first creative. Keep text away from the right-side UI and bottom caption area.
YouTube
Asset
Size
Profile Photo
800 × 800
Channel Banner
2560 × 1440
Safe Area
1546 × 423
Thumbnail
1280 × 720
Shorts
1080 × 1920
Use 1280 × 720 thumbnails for normal videos and 1080 × 1920 vertical assets for Shorts.
LinkedIn
Asset
Size
Profile Photo
400 × 400
Personal Banner
1584 × 396
Company Logo
400 × 400
Company Cover
1128 × 191
Link Post
1200 × 627
Square Post
1200 × 1200
Use LinkedIn for editorial, sponsor, founder, hiring, and business-side campaign posts.
Pinterest, 
Asset, Size
Profile Photo 
165 × 165
Standard Pin
1000 × 1500
Square Pin
1000 × 1000
Long Pin
1000 × 2100
Board Cover
800 × 450
Use 1000 × 1500 for evergreen content, guides, checklists, and visual article promotions.
Bluesky
Asset
Size
Profile Photo
400 × 400
Banner
1500 × 500
Landscape Post
1200 × 627
Square Post
1080 × 1080
Post Text
300 chars
Bluesky is best for short commentary, article links, community engagement, and concise campaign posts.
Threads
Asset
Size
Profile Photo
320 × 320+
Square Post
1080 × 1080
Portrait Post
1080 × 1350
Vertical Asset
1080 × 1920
Post Text
500 chars
Use Threads for conversational posts, quotes, story-based promos, and soft CTAs.
Mastodon
Asset
Size
Avatar
400 × 400
Header
1500 × 500
Landscape Post
1200 × 675
Square Post
1080 × 1080
Post Text
500 default
Mastodon limits can vary by instance, so store instance_url and instance_character_limit per connected account.
Discord
Asset
Size
User Avatar
256 × 256
Server Icon
512 × 512
Profile Banner
600 × 240
Server Banner
960 × 540
Invite Splash
1920 × 1080
Embed Image
1200 × 628
Message Text
2,000 chars
Use Discord for community announcements, VIP drops, sponsor alerts, live events, and automated content notifications.

## 13. SOCIAL SCHEMA SIZE CHART 
```
CREATE TABLE social_size_chart (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform VARCHAR(80) NOT NULL,
    asset_type VARCHAR(120) NOT NULL,
    recommended_width INTEGER NOT NULL,
    recommended_height INTEGER NOT NULL,
    aspect_ratio VARCHAR(40),
    text_limit INTEGER,
    caption_limit INTEGER,
    hashtag_limit INTEGER,
    safe_zone_notes TEXT,
    file_type VARCHAR(120),
    max_file_size VARCHAR(80),
    template_path TEXT,
    status VARCHAR(40) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```
## 14. CONTENT CALENDAR FIELDS 
```
platform
asset_type
recommended_width
recommended_height
aspect_ratio
text_limit
caption_limit
hashtag_limit
safe_zone_notes
file_type
max_file_size
template_path
status
scheduled_at
published_at
```
## 15. SOCIAL SIZE CHART ADMIN PAGE 
```
/admin/social-size-chart
```
### COMPONENTS 
```
SocialSizeChartPage.tsx
PlatformSizeTable.tsx
PlatformFilter.tsx
AssetTypeFilter.tsx
TemplateDownloadButton.tsx
SafeZoneNotes.tsx
SizeChartEditor.tsx
## COMPLETION CHECKLIST
```
### FEATURES 
```
Platform filter
Asset type filter
Editable size records
Template path field
Safe-zone notes
Export CSV
Copy template size
Mark outdated specs
Last verified date
```
16. TEMPLATE FOLDER 📁
```
    frontend/public/social-templates/
```
```
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
## SOCIAL METRICS DASHBOARD
```
Scheduled Posts
Published Posts
Failed Posts
Total Impressions
Total Clicks
Engagement Rate
Top Platform
Top Post
Follower Growth
Campaign CTR
Affiliate Clicks
Sponsor Clicks
VIP Conversions
```

## 18. SOCIAL PROVIDER MODULES
```
x_twitter.py
instagram.py
facebook.py
tiktok.py
youtube.py
reddit.py
bluesky.py
threads.py
mastodon.py
discord.py
```
*Each Provider Should Support*
```
connect_account
validate_credentials
schedule_post
publish_post
fetch_metrics
handle_webhook
```

[ ] Calendar system working  
[ ] Scheduler working  
[ ] Campaign system working  
[ ] Queue system working  
[ ] Social integrations connected  
[ ] Metrics dashboard live  
[ ] Size chart implemented  

```
---

## COMPLETION STANDARD

System must:

```
Plan content  
Schedule posts  
Publish automatically  
Track performance  
Support multiple platforms  
Scale campaigns

```
