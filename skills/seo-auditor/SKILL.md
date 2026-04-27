---
name: seo-auditor
description: Run SEO audits on CMS posts, generate SEO reports, score content quality, and provide keyword and tag recommendations.
category: audit
version: v1.0
inputs:
  - post data from cms_posts table
  - SEO report schema from database/schemas/analytics.sql
outputs:
  - SEO score (0–100)
  - SEO report record
  - Improvement recommendations
---

# SEO Auditor Skill

## Purpose

Audit CMS posts for SEO quality, compute scores, and generate actionable recommendations.

## When To Use

Use this skill when the user asks to:
- Run an SEO audit on a post or all posts
- Generate SEO reports
- Improve SEO scores
- Review keyword density and meta fields
- Check for missing alt text or broken internal links

## Stack

- Backend: `backend/app/cms/seo.py`
- Database: `seo_reports` and `keyword_reports` tables (see `database/schemas/analytics.sql`)
- Admin view: `/admin/seo` and `/admin/keywords`

## SEO Score Rules

| Score | Rating |
|-------|--------|
| 90–100 | Excellent |
| 75–89 | Good |
| 60–74 | Needs Work |
| 0–59 | Poor |

## Scoring Checklist

- [ ] Title present (10 pts) + within 50–60 chars (5 pts)
- [ ] Meta description present (10 pts) + within 120–160 chars (5 pts)
- [ ] Body word count ≥ 300 (15 pts)
- [ ] At least 1 keyword defined (10 pts)
- [ ] At least 1 tag assigned (10 pts)
- [ ] At least 1 internal link in body (10 pts)
- [ ] No missing image alt text (10 pts)
- [ ] Featured image present (5 pts)
- [ ] Excerpt present (5 pts)
- [ ] Published_at set (5 pts)

## Workflow

1. Fetch post from `cms_posts`
2. Run `compute_seo_score(post)` in `backend/app/cms/seo.py`
3. Insert record into `seo_reports`
4. Return score + recommendations array
5. Surface in admin SEO dashboard

## Key Files

- `backend/app/cms/seo.py`
- `database/schemas/analytics.sql` (seo_reports, keyword_reports)
- `frontend/src/admin/SEOReports.tsx`
- `frontend/src/admin/KeywordTagReports.tsx`
