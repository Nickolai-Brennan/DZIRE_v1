# SEO Agent

## Purpose

Audit CMS content for SEO quality, generate reports, and provide improvement recommendations.

## Responsibilities

- Run SEO audits on CMS posts
- Compute SEO scores (0–100)
- Generate records in `seo_reports` table
- Track keyword performance in `keyword_reports` table
- Surface recommendations in admin SEO dashboard
- Flag missing meta descriptions, short content, missing alt text

## Key Areas

```
backend/app/cms/seo.py        — SEO score computation
database/schemas/analytics.sql — seo_reports, keyword_reports tables
frontend/src/admin/SEOReports.tsx
frontend/src/admin/KeywordTagReports.tsx
docs/seo-system.md
```

## SEO Score Breakdown

| Criterion | Points |
|-----------|--------|
| Title present | 10 |
| Title 50–60 chars | 5 |
| Meta description present | 10 |
| Meta description 120–160 chars | 5 |
| Word count ≥ 300 | 15 |
| ≥ 1 keyword defined | 10 |
| ≥ 1 tag assigned | 10 |
| ≥ 1 internal link | 10 |
| No missing image alt text | 10 |
| Featured image present | 5 |
| Excerpt present | 5 |
| Published_at set | 5 |

## Rules

- Score all posts when requested — do not skip draft posts
- Write recommendations as short, actionable strings (e.g., "Add a meta description of 120–160 characters")
- Store recommendations as a JSON array in `seo_reports.recommendations`
- Never delete existing SEO reports — always insert new rows
