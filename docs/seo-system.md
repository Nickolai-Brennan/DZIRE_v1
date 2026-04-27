# SEO System Documentation

## Overview

The DZIRE SEO system provides per-post SEO scoring, keyword tracking, and recommendations to improve content visibility.

## SEO Score Tiers

| Score | Rating |
|-------|--------|
| 90–100 | Excellent |
| 75–89 | Good |
| 60–74 | Needs Work |
| 0–59 | Poor |

## SEO Report Fields

| Field | Description |
|-------|-------------|
| `seo_score` | Overall score 0–100 |
| `word_count` | Total body word count |
| `title_length` | Character count of post title |
| `meta_description_length` | Character count of SEO description |
| `keyword_count` | Number of unique keywords |
| `tag_count` | Number of tags assigned |
| `internal_links` | Count of internal links in body |
| `external_links` | Count of external links in body |
| `missing_image_alt_count` | Images without alt text |
| `recommendations` | JSON array of improvement suggestions |

## SEO Post Fields

Each CMS post supports:

```text
seo_title         — Override page title for search engines (50–60 chars ideal)
seo_description   — Meta description for search snippets (120–160 chars ideal)
keywords          — Array of target keywords to include
```

## SEO Scoring Logic (`backend/app/cms/seo.py`)

The `compute_seo_score` function evaluates:

1. **Title** — Present and within 50–60 characters
2. **Meta description** — Present and within 120–160 characters
3. **Word count** — Minimum 300 words for a meaningful score
4. **Keywords** — At least one keyword defined
5. **Tags** — At least one tag assigned
6. **Internal links** — At least one internal link in body
7. **Alt text** — No missing image alt text

## Keyword Reports

Stored in `keyword_reports` table:

| Field | Description |
|-------|-------------|
| `keyword` | The keyword string |
| `post_id` | Associated post |
| `impressions` | Search impression count |
| `clicks` | Click count from search |
| `position` | Average SERP position |

## Admin Dashboard

SEO reports are accessible at `/admin/seo`. Keyword and tag data is accessible at `/admin/keywords`.
