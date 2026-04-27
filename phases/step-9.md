# STEP 9 — SEARCH + FILTERING + PERSONALIZATION + RECOMMENDATION ENGINE

Step 9 adds discovery, user behavior intelligence, and personalized content delivery.

This step defines:
- Site search
- Advanced filters
- Tag/category discovery
- Personalized feeds
- Recommendation engine
- Related content logic
- User behavior tracking
- Saved content
- Search analytics
- Admin search insights

---

## STEP 9 OBJECTIVE

Help users find the right content faster and increase engagement.

```text
CMS + Users + Analytics
→ Search
→ Filters
→ Behavior Tracking
→ Personalization
→ Recommendations


---

STEP 9 FILE STRUCTURE ADDITIONS

backend/app/search/
├── models.py
├── schemas.py
├── routes.py
├── services.py
├── indexing.py
└── ranking.py

backend/app/recommendations/
├── models.py
├── schemas.py
├── routes.py
├── services.py
├── scoring.py
└── personalization.py

backend/app/user_behavior/
├── models.py
├── routes.py
└── services.py

frontend/src/search/
├── SearchPage.tsx
├── SearchResultsPage.tsx
├── AdvancedSearchPage.tsx

frontend/src/components/search/
├── SearchBar.tsx
├── SearchResults.tsx
├── SearchFilters.tsx
├── SortSelector.tsx
├── TagFilter.tsx
├── CategoryFilter.tsx

frontend/src/components/recommendations/
├── RecommendedPosts.tsx
├── RelatedPosts.tsx
├── TrendingNow.tsx
├── PersonalizedFeed.tsx
├── ContinueReading.tsx

api/contracts/search.json
api/contracts/recommendations.json
api/contracts/user-behavior.json

database/schemas/search.sql
database/schemas/recommendations.sql
database/schemas/user_behavior.sql

docs/search.md
docs/recommendations.md
docs/personalization.md

.github/agents/search-agent.md
.github/agents/recommendation-agent.md
.github/agents/personalization-agent.md

skills/search-builder/
skills/recommendation-engine-builder/
skills/personalization-builder/


---

1. SEARCH SYSTEM

Search Types

Basic keyword search
Advanced search
Tag search
Category search
Author search
VIP-only search
Sponsor/affiliate search
Date range search


---

Searchable Content

Posts
Pages
Categories
Tags
Authors
Affiliate products
Sponsor campaigns
VIP content
Social embed posts


---

2. SEARCH INDEX MODEL

id
content_id
content_type
title
slug
excerpt
body_text
category
tags
author
visibility
is_vip_only
seo_keywords
search_vector
published_at
updated_at


---

3. SEARCH QUERY MODEL

id
user_id
session_id
query
filters
result_count
clicked_result_id
created_at


---

4. SEARCH FILTERS

Keyword
Category
Tag
Author
Content Type
Date Range
Popularity
SEO Score
VIP Only
Free/Public
Sponsored
Affiliate


---

5. SORT OPTIONS

Relevance
Newest
Oldest
Most Viewed
Most Clicked
Most Shared
Highest Rated
Trending


---

6. SEARCH ROUTES

/api/search
/api/search/advanced
/api/search/suggestions
/api/search/trending
/api/search/tags
/api/search/categories
/api/admin/search-analytics


---

7. SEARCH RANKING LOGIC

Ranking signals:

Keyword match
Title match
Tag match
Category match
Recency
View count
Click count
SEO score
User interest match
VIP status
Sponsor priority optional


---

Ranking Score Example

ranking_score =
title_match * 3
+ tag_match * 2
+ category_match * 1.5
+ recency_score
+ popularity_score
+ personalization_score


---

8. SEARCH UI REQUIREMENTS

Public Search Page

Includes:

Search input
Filter sidebar
Sort dropdown
Result cards
Tag chips
Category chips
Pagination
No-results state

Admin Search Analytics

Shows:

Top search queries
Zero-result searches
Most clicked results
Search conversion rate
Popular tags
Popular categories
Search trends over time


---

9. PERSONALIZATION SYSTEM

Personalization Signals

Viewed posts
Clicked tags
Clicked categories
Search queries
Saved posts
VIP status
Newsletter clicks
Affiliate clicks
Time on page
Scroll depth


---

10. USER PREFERENCE MODEL

id
user_id
favorite_categories
favorite_tags
preferred_content_types
blocked_tags
vip_interest_score
last_updated


---

11. USER BEHAVIOR MODEL

id
user_id
session_id
event_type
content_id
content_type
category
tags
duration_seconds
scroll_depth
source
created_at


---

12. BEHAVIOR EVENT TYPES

post_view
post_click
tag_click
category_click
search
save_post
share_post
newsletter_click
affiliate_click
vip_click
time_on_page
scroll_depth


---

13. PERSONALIZED FEED LOGIC

Inputs:

User preferences
Recent behavior
Popular content
New content
VIP status
Content visibility

Output:

Personalized feed
Recommended posts
Related articles
Continue reading
Trending for you


---

14. RECOMMENDATION ENGINE

Recommendation Types

Related Posts
Trending Now
Recommended For You
Continue Reading
Popular In Category
More From Author
VIP Picks
Sponsor/Affiliate Picks


---

15. RECOMMENDATION MODEL

id
user_id
content_id
recommendation_type
score
reason
shown_at
clicked_at
dismissed_at


---

16. CONTENT SIMILARITY SIGNALS

Shared tags
Same category
Same author
Similar keywords
Similar content type
User co-view behavior
Recency
Popularity


---

17. RECOMMENDATION SCORING

recommendation_score =
tag_overlap
+ category_match
+ keyword_similarity
+ popularity
+ recency
+ user_interest


---

18. SAVED CONTENT SYSTEM

Saved Post Model

id
user_id
post_id
collection_name
created_at

Routes

/api/saved-posts
/api/saved-posts/add
/api/saved-posts/remove
/api/saved-posts/collections


---

19. FRONTEND RECOMMENDATION COMPONENTS

RecommendedPosts
RelatedPosts
TrendingNow
PersonalizedFeed
ContinueReading
PopularInCategory
MoreFromAuthor
SavedPosts


---

20. ADMIN INSIGHTS DASHBOARD

Recommendation Insights

Shows:

Recommendation impressions
Recommendation clicks
Click-through rate
Top recommended posts
Dismissed recommendations
Personalization performance

Search Insights

Shows:

Top queries
Top filters
No-result queries
Most clicked results
Trending tags
Trending categories


---

21. PRIVACY + USER CONTROL

Users should be able to:

View saved posts
Clear saved posts
Update preferences
Disable personalization optional
Clear search history optional


---

22. DATA RETENTION RULES

Search logs → keep as configured
Behavior logs → aggregate over time
Personal preferences → user controlled
Anonymous events → session based


---

23. NEW AGENTS FOR STEP 9

search-agent

Purpose:

Build search index, filters, ranking logic, and search UI.


recommendation-agent

Purpose:

Build recommendation scoring, related content logic, and feed systems.


personalization-agent

Purpose:

Build user preference tracking, personalized feeds, and behavior-based recommendations.



---

24. NEW SKILLS FOR STEP 9

skills/search-builder/
skills/recommendation-engine-builder/
skills/personalization-builder/


---

25. STEP 9 BUILD ORDER

1. Create search schema
2. Create behavior tracking schema
3. Create recommendation schema
4. Build search indexing service
5. Build search routes
6. Build search ranking logic
7. Build search UI
8. Build advanced filters
9. Build search analytics
10. Build user preference model
11. Build behavior tracking
12. Build recommendation scoring
13. Build personalized feed
14. Build saved posts
15. Build admin insights dashboard
16. Add docs and evals


---

26. STEP 9 TASK LIST

T-142 Create search index table
T-143 Create search query log table
T-144 Create user behavior table
T-145 Create user preferences table
T-146 Create recommendation table
T-147 Create saved posts table
T-148 Build search indexing service
T-149 Build search routes
T-150 Build search suggestions
T-151 Build advanced search filters
T-152 Build search ranking service
T-153 Build search page
T-154 Build search result cards
T-155 Build filter sidebar
T-156 Build personalized feed logic
T-157 Build recommendation scoring
T-158 Build related posts component
T-159 Build trending now component
T-160 Build saved posts feature
T-161 Build search analytics dashboard
T-162 Build recommendation insights dashboard
T-163 Add privacy controls
T-164 Add search docs
T-165 Run Step 9 review


---

STEP 9 COMPLETION CHECKLIST

[ ] Search index created
[ ] Basic search works
[ ] Advanced search works
[ ] Filters work
[ ] Sort options work
[ ] Search suggestions work
[ ] Search analytics tracked
[ ] User behavior tracked
[ ] User preferences stored
[ ] Personalized feed works
[ ] Related posts work
[ ] Trending posts work
[ ] Saved posts work
[ ] Recommendation scoring works
[ ] Admin search insights available
[ ] Privacy controls defined
[ ] Search agents added
[ ] Recommendation skills added
[ ] Docs created


---

STEP 9 COMPLETION STANDARD

Step 9 is complete when the system can:

Search all content
Filter and sort results
Track user behavior
Recommend relevant content
Personalize feeds
Save content
Analyze search performance
Improve discovery over time


---

NEXT STEP

Step 10 should define notifications, email automation, campaign scheduling, social publishing workflows, and audience engagement automation.
