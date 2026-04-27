# Workflow Validation — DZIRE v1

This document summarises all 64 site user workflows defined in `dzire_full_user_workflows.json`, their implementation status, routes involved, mock assumptions, and verification steps.

> **Stack:** React + Vite  
> **Base branch:** `main`  
> **Auth:** Mock (in-memory via `AuthContext`)  
> **Backend:** No real API — all data served from `src/data/mock*.ts` files  
> **Mock services:** `src/context/PlaylistContext.tsx`, `src/context/AuthContext.tsx`, `src/context/FavoritesContext.tsx`

---

## Implementation Summary

| Status | Meaning |
|--------|---------|
| ✅ Implemented | Route exists, page renders, core actions work |
| 🔧 Stub | Page/route exists with mock UI, full backend logic not wired |
| ❌ Phase 2 | Workflow requires real-time backend features (notifications, email sends, etc.) |

---

## Workflows

### WF-001 · Discovery & Position Save to Playlist
- **Category:** positions | **Phase:** MVP
- **Route(s):** `/positions` → `/positions/:slug`
- **Implemented:** ✅
- **How it works:** User browses positions, opens detail page, clicks "Save to Playlist" button which opens `PlaylistModal`. User selects or creates a playlist.
- **Mocks:** Playlist state stored in React context (in-memory, resets on refresh)
- **Verify:** Go to `/positions`, click any position, click "Save to Playlist", select "My Favourites"

---

### WF-002 · Category-Filtered Browse
- **Category:** positions | **Phase:** MVP
- **Route(s):** `/positions`
- **Implemented:** ✅
- **How it works:** Filter chips (All/Partner/Advanced/Beginner) on `/positions` page filter the grid
- **Verify:** Visit `/positions`, click "Beginner" chip, confirm only low-difficulty positions show

---

### WF-003 · Keyword Search Discovery
- **Category:** positions | **Phase:** MVP
- **Route(s):** `/search`
- **Implemented:** ✅
- **How it works:** `/search` page has full-text search across positions, reviews, stories, articles
- **Verify:** Visit `/search`, type "beginner", confirm results appear

---

### WF-004 · Tag-Based Navigation
- **Category:** positions | **Phase:** MVP
- **Route(s):** `/tags/:tag`
- **Implemented:** ✅
- **How it works:** Clicking a keyword badge on `/positions/:slug` navigates to `/tags/:tag` showing matching positions and stories
- **Verify:** Open any position, click a keyword badge, see filtered results

---

### WF-005 · Explore Hub Entry
- **Category:** positions | **Phase:** MVP
- **Route(s):** `/explore`
- **Implemented:** ✅
- **How it works:** `/explore` page aggregates trending positions, reviews, stories, and DZIRE Dolls with a "Take the Quiz" CTA
- **Verify:** Visit `/explore`, scroll through all sections, click "Take the Quiz"

---

### WF-006 · Advanced Filter & Sort
- **Category:** positions | **Phase:** MVP
- **Route(s):** `/positions`
- **Implemented:** 🔧 (basic filter only)
- **Notes:** Current filter chips support category/difficulty. Sort by score not yet implemented.
- **Verify:** Visit `/positions`, use filter chips

---

### WF-007 · Position Detail Scroll & Attribute Explore
- **Category:** positions | **Phase:** MVP
- **Route(s):** `/positions/:slug`
- **Implemented:** ✅
- **How it works:** Score attribute boxes are clickable and fire a tracking event; full score breakdown visible with ScoreBar components
- **Verify:** Open any position, click on score boxes, scroll through all sections

---

### WF-008 · Position to Related Positions
- **Category:** positions | **Phase:** MVP
- **Route(s):** `/positions/:slug`
- **Implemented:** ✅
- **How it works:** "Try This Next" section shows related positions from `relatedPositions` field with save buttons
- **Verify:** Open a position, scroll to "Try This Next", click related position

---

### WF-009 · Playlist Create from Position
- **Category:** playlist | **Phase:** MVP
- **Route(s):** `/positions/:slug` → `PlaylistModal`
- **Implemented:** ✅
- **How it works:** "Save to Playlist" button opens modal; user can create a new playlist and save the item
- **Verify:** Go to `/positions/classic-missionary`, click "Save to Playlist", click "Create New Playlist", enter name, click Create

---

### WF-010 · Playlist Add Multiple Positions
- **Category:** playlist | **Phase:** MVP
- **Route(s):** `/positions`, `/positions/:slug`
- **Implemented:** ✅
- **How it works:** Each position card and detail page has a save button. Multiple items can be added to same playlist.
- **Verify:** Save 3 positions to "My Favourites", go to `/playlists`, open the playlist to see all 3

---

### WF-011 · Playlist Reorder
- **Category:** playlist | **Phase:** MVP
- **Route(s):** `/playlists/:id`
- **Implemented:** ✅
- **How it works:** Up/down arrow buttons on each item in the playlist detail page
- **Verify:** Go to `/playlists`, open a playlist with items, use ↑/↓ buttons to reorder

---

### WF-012 · Playlist Share
- **Category:** playlist | **Phase:** MVP
- **Route(s):** `/playlists`, `/playlists/:id`
- **Implemented:** 🔧 (copies URL to clipboard, no real share)
- **How it works:** Share button copies the playlist URL to clipboard
- **Verify:** Go to `/playlists`, click Share button, paste URL to confirm

---

### WF-013 · Playlist Start Mode
- **Category:** playlist | **Phase:** MVP
- **Route(s):** `/playlists/:id`
- **Implemented:** 🔧 (navigates to first item)
- **How it works:** "Start Mode" button navigates to the first item in the playlist
- **Verify:** Add positions to a playlist, open it, click "Start Mode"

---

### WF-014 · Playlist Delete Item
- **Category:** playlist | **Phase:** MVP
- **Route(s):** `/playlists/:id`
- **Implemented:** ✅
- **How it works:** Trash icon on each playlist item removes it from the playlist
- **Verify:** Open a playlist, click the trash icon on an item

---

### WF-015 · Playlist Return from Profile
- **Category:** playlist | **Phase:** MVP
- **Route(s):** `/profile` → `/playlists` → `/playlists/:id`
- **Implemented:** ✅
- **How it works:** Profile page shows recent playlists with links; full list at `/playlists`
- **Verify:** Log in, save items, go to `/profile`, click a playlist

---

### WF-016 · Playlist Export (Phase 2)
- **Category:** playlist | **Phase:** Phase 2
- **Status:** ❌ Not implemented — requires backend
- **Notes:** Export to PDF/shareable link requires server-side rendering

---

### WF-017 · Collaborative Playlist (Phase 2)
- **Category:** playlist | **Phase:** Phase 2
- **Status:** ❌ Not implemented — requires real-time backend

---

### WF-018 · Find Your Style Quiz
- **Category:** personalization | **Phase:** MVP
- **Route(s):** `/quiz`
- **Implemented:** ✅
- **How it works:** 3-step quiz on energy/difficulty/focus, generates personalised position list, offers "Save as Playlist"
- **Verify:** Visit `/quiz`, complete 3 questions, save results as playlist

---

### WF-019 · Homepage Recommendation Loop
- **Category:** personalization | **Phase:** MVP
- **Route(s):** `/`
- **Implemented:** ✅
- **How it works:** Homepage shows Featured Dolls, Trending Positions, Trophy Hall, Dictionary Preview, Stories
- **Verify:** Visit `/`, click items in each section, verify navigation works

---

### WF-020 · Continue Exploring Loop
- **Category:** personalization | **Phase:** MVP
- **Route(s):** `/explore`
- **Implemented:** 🔧 (no session persistence — items reset on refresh)
- **Notes:** "Continue exploring" is simulated via the Explore page; no persistent recently-viewed items without backend
- **Verify:** Visit `/explore`, click an item, return to `/explore`

---

### WF-021 · Article to Embedded Positions
- **Category:** content_editorial | **Phase:** MVP
- **Route(s):** `/magazine` → `/positions/:slug`
- **Implemented:** 🔧 (magazine links to positions)
- **Notes:** Magazine page lists articles; individual article pages link back to positions. No inline embedded cards yet.
- **Verify:** Visit `/magazine`, read an article, navigate to related position

---

### WF-022 · Magazine Experience
- **Category:** content_editorial | **Phase:** MVP
- **Route(s):** `/magazine`
- **Implemented:** ✅ (magazine listing page exists)
- **Verify:** Visit `/magazine`, browse issue sections

---

### WF-023 · Story to Related Positions
- **Category:** content_editorial | **Phase:** MVP
- **Route(s):** `/stories/:slug`
- **Implemented:** ✅
- **How it works:** Story detail page has "Inspired By This Story" section with related positions and save buttons
- **Verify:** Visit `/stories/midnight-in-paris`, scroll to "Inspired By This Story", save a position

---

### WF-024 · Chatbot Playlist Builder
- **Category:** chatbot | **Phase:** MVP
- **Route(s):** Any page (floating widget)
- **Implemented:** ✅
- **How it works:** Bottom-right chatbot widget. User types query (e.g. "beginner"), bot returns position suggestions, "Add All to Playlist" button saves them
- **Mocks:** Rule-based keyword matching, no real AI
- **Verify:** Click chat bubble, type "beginner", click "Add All to Playlist"

---

### WF-025 · Chatbot Exploration Loop
- **Category:** chatbot | **Phase:** MVP
- **Route(s):** Any page
- **Implemented:** ✅
- **How it works:** Each chatbot message generates new suggestions; conversation history persists in component state
- **Verify:** Open chatbot, send "beginner", then send "partner", verify different suggestions

---

### WF-026 · Signup to Onboarding
- **Category:** account_profile | **Phase:** MVP
- **Route(s):** `/signup` → `/onboarding`
- **Implemented:** ✅
- **How it works:** Signup form (email/displayName/password) creates mock user via AuthContext, redirects to `/onboarding`
- **Mocks:** Auth is fully mocked — any credentials accepted
- **Verify:** Go to `/signup`, fill form, submit, confirm redirect to `/onboarding`, select interests, click "Get Started"

---

### WF-027 · Profile Activity Tracking
- **Category:** account_profile | **Phase:** MVP
- **Route(s):** `/profile`
- **Implemented:** ✅
- **How it works:** Profile page shows playlists, favourites, and stats for the logged-in user
- **Verify:** Log in, save some items, visit `/profile`, see saved content

---

### WF-028 · Favorites System
- **Category:** account_profile | **Phase:** MVP
- **Route(s):** `/profile`, review/doll pages
- **Implemented:** ✅
- **How it works:** Heart/Bookmark toggle on review detail and doll profile pages saves to FavoritesContext; shown on `/profile`
- **Verify:** Go to a review, click "Save to Wishlist", go to `/profile`, see it in Favourites

---

### WF-029 · Free to VIP Upgrade
- **Category:** monetization | **Phase:** MVP
- **Route(s):** `/vip`
- **Implemented:** ✅
- **How it works:** VIP page shows plans. Logged-in users can click "Get Monthly/Annual" which calls `upgradeToVip()` mock. Locked content shows VIP gate.
- **Mocks:** No real payment — `upgradeToVip()` instantly sets `isVip: true` in context
- **Verify:** Log in, go to `/vip`, click "Get Annual", verify VIP state

---

### WF-030 · VIP Playlist Access
- **Category:** monetization | **Phase:** MVP
- **Route(s):** `/vip`, `/playlists`
- **Implemented:** 🔧 (VIP page shows locked content preview; VIP playlists not yet separated from free)
- **Verify:** Upgrade to VIP on `/vip`, see locked content unlocked

---

### WF-031 · Affiliate Product Integration
- **Category:** monetization | **Phase:** MVP
- **Route(s):** `/positions/:slug`, `/reviews/:slug`
- **Implemented:** ✅
- **How it works:** Position sidebar links to reviews. Review detail has "Buy Now" affiliate link with `buy_now_click` tracking event.
- **Verify:** Open any review, click "Buy Now", check console for `buy_now_click` event

---

### WF-032 · Model Profile Discovery
- **Category:** models | **Phase:** MVP
- **Route(s):** `/` → `/dzire-dolls` → `/dzire-dolls/:slug`
- **Implemented:** ✅
- **How it works:** Homepage shows Featured DZIRE Dolls section. Clicking leads to dolls page, then individual profile.
- **Verify:** Go to `/`, click a doll card, verify profile page loads with bio, platforms, recommended positions

---

### WF-033 · Model Recommended Playlist
- **Category:** models | **Phase:** MVP
- **Route(s):** `/dzire-dolls/:slug`
- **Implemented:** ✅
- **How it works:** Doll profile shows "Recommended by [Name]" section with save buttons on each position
- **Verify:** Open a doll profile, click "Save to Playlist" on a recommended position

---

### WF-034 · Notifications Return Loop (Phase 2)
- **Category:** retention | **Phase:** Phase 2
- **Status:** ❌ Not implemented — requires push notification service

---

### WF-035 · Email Capture Return Loop
- **Category:** retention | **Phase:** MVP
- **Route(s):** `/newsletter`, any page with NewsletterForm
- **Implemented:** 🔧 (form exists, no real email delivery)
- **Notes:** Newsletter form on homepage footer and doll profiles captures email. No real email service wired.
- **Verify:** Submit the newsletter form on the homepage, confirm no errors

---

### WF-036 · Article Read to Direct Share
- **Category:** article_engagement | **Phase:** MVP
- **Route(s):** `/stories/:slug`
- **Implemented:** ✅
- **How it works:** Story detail page has Share button that copies URL and fires `article_share_click` event
- **Verify:** Open a story, click "Share", confirm clipboard copy

---

### WF-037 · Article Inline Share Trigger
- **Category:** article_engagement | **Phase:** MVP
- **Route(s):** `/stories/:slug`
- **Implemented:** 🔧 (share button at top, no scroll-depth trigger)
- **Notes:** Inline CTA at 50% scroll requires IntersectionObserver. Share button present but not scroll-triggered.

---

### WF-038 · Article Comment Engagement
- **Category:** article_engagement | **Phase:** MVP
- **Status:** 🔧 (not yet implemented — requires auth + backend)
- **Notes:** No comment system exists. Would require backend API.

---

### WF-039 · Article Comment to Signup
- **Category:** article_engagement | **Phase:** MVP
- **Status:** 🔧 (signup page exists, but comment-gate flow not implemented)
- **Notes:** Signup flow works. Comment gating requires comment system.

---

### WF-040 · Article Like or Helpful Vote
- **Category:** article_engagement | **Phase:** MVP
- **Status:** 🔧 (not yet implemented — requires backend)

---

### WF-041 · Article Save for Later
- **Category:** article_engagement | **Phase:** MVP
- **Route(s):** `/stories/:slug`, `/profile`
- **Implemented:** 🔧 (use playlist save on story pages as workaround)
- **Notes:** Stories can be saved to playlists. A dedicated "save article" flow would need an articles detail page.

---

### WF-042 · Article Embedded CTA to Playlist
- **Category:** article_engagement | **Phase:** MVP
- **Route(s):** `/stories/:slug` → `/positions/:slug`
- **Implemented:** ✅
- **How it works:** "Inspired By This Story" section on story pages links to positions with save buttons
- **Verify:** Open a story, click a related position, save to playlist

---

### WF-043 · Shared Article New User Entry
- **Category:** article_engagement | **Phase:** MVP
- **Route(s):** `/stories/:slug` → `/signup`
- **Implemented:** ✅ (navigable)
- **How it works:** User opens shared story URL. Story renders publicly. Signup prompt via "Join DZIRE" in header.
- **Verify:** Open `/stories/midnight-in-paris`, click "Sign In" → "Sign up" in header

---

### WF-044 · Comment Thread Return Loop (Phase 2)
- **Category:** article_engagement | **Phase:** Phase 2
- **Status:** ❌ Not implemented — requires notification system

---

### WF-045 · Product Discovery to Review Page
- **Category:** product_reviews | **Phase:** MVP
- **Route(s):** `/` → `/reviews` → `/reviews/:slug`
- **Implemented:** ✅
- **How it works:** Homepage Trophy Hall shows review cards. Reviews page has full grid.
- **Verify:** From homepage, click a Trophy Hall card, verify review page loads with score breakdown

---

### WF-046 · Product Compare Options
- **Category:** product_reviews | **Phase:** MVP
- **Route(s):** `/reviews/:slug`
- **Implemented:** ✅ (Similar Products section shows alternatives)
- **How it works:** "Similar Products" section at bottom of review page shows 3 alternatives
- **Verify:** Open any review, scroll to "Similar Products", click to compare

---

### WF-047 · Best Value Product Filter
- **Category:** product_reviews | **Phase:** MVP
- **Route(s):** `/reviews`
- **Implemented:** 🔧 (reviews page has sort, but no Best Value specific sort)
- **Notes:** Filter chips exist. Value-score sort would need enhancement.

---

### WF-048 · Product Affiliate Click
- **Category:** product_reviews | **Phase:** MVP
- **Route(s):** `/reviews/:slug`
- **Implemented:** ✅
- **How it works:** "Buy Now" button fires `buy_now_click` tracking event and opens affiliate URL
- **Verify:** Open a review, click "Buy Now", verify outbound link opens

---

### WF-049 · Product Wishlist Save
- **Category:** product_reviews | **Phase:** MVP
- **Route(s):** `/reviews/:slug`, `/profile`
- **Implemented:** ✅
- **How it works:** "Save to Wishlist" toggle on review detail page uses FavoritesContext; visible on `/profile`
- **Verify:** Go to a review, click "Save to Wishlist", go to `/profile`, see it in Favourites

---

### WF-050 · Product Add to Playlist Cross-System
- **Category:** product_reviews | **Phase:** MVP
- **Route(s):** `/reviews/:slug`
- **Implemented:** ✅
- **How it works:** "Use With These Positions" section in review sidebar shows positions with SaveToPlaylist buttons for product-position combos
- **Verify:** Open a review, find "Use With These Positions", click save on a combo

---

### WF-051 · Product Decision Loop
- **Category:** product_reviews | **Phase:** MVP
- **Route(s):** `/reviews/:slug`
- **Implemented:** ✅ (navigable via Similar Products)
- **Verify:** Open two reviews via Similar Products, compare scores, click Buy Now on preferred

---

### WF-052 · Product Review Summary Shortcut
- **Category:** product_reviews | **Phase:** MVP
- **Route(s):** `/reviews/:slug`
- **Implemented:** ✅
- **How it works:** Score overview grid and "Best For" awards section at top of review detail provide quick verdict
- **Verify:** Open a review, look at the score breakdown and Best For section at top

---

### WF-053 · Product User Rating Input (Phase 2)
- **Category:** product_reviews | **Phase:** Phase 2
- **Status:** ❌ Not implemented — requires user ratings backend

---

### WF-054 · Article to Product Review
- **Category:** product_reviews | **Phase:** MVP
- **Route(s):** `/magazine` → `/reviews/:slug`
- **Implemented:** 🔧 (magazine links to reviews section; no inline product links in article body)
- **Verify:** Go to `/magazine`, find a product mention, navigate to reviews

---

### WF-055 · Model Discovery to Profile View
- **Category:** model_conversion | **Phase:** MVP
- **Route(s):** `/` → `/dzire-dolls/:slug`
- **Implemented:** ✅
- **Verify:** From homepage, click a Featured DZIRE Doll card, verify profile page loads

---

### WF-056 · Model Profile Content Exploration
- **Category:** model_conversion | **Phase:** MVP
- **Route(s):** `/dzire-dolls/:slug`
- **Implemented:** ✅
- **How it works:** Profile shows bio, vibe tags, platforms, recommended positions, featured products
- **Verify:** Open a doll profile, scroll through bio, tags, click tags/platform links

---

### WF-057 · Model Profile Promo CTA Click
- **Category:** model_conversion | **Phase:** MVP
- **Route(s):** `/dzire-dolls/:slug`
- **Implemented:** ✅
- **How it works:** "Exclusive Offer" section with promo description and external CTA button; fires `model_external_click` event
- **Verify:** Open a doll profile, scroll to "Exclusive Offer", click the CTA button

---

### WF-058 · Model External Platform Signup
- **Category:** model_conversion | **Phase:** MVP
- **Route(s):** `/dzire-dolls/:slug` → external URL
- **Implemented:** ✅ (external link with tracking)
- **Mocks:** External URLs are placeholder paths like `/external/luna-of`
- **Verify:** Click "Visit [Name]" button, confirm outbound link click tracked

---

### WF-059 · Model Conversion Tracking Funnel
- **Category:** model_conversion | **Phase:** MVP
- **Route(s):** `/dzire-dolls/:slug`
- **Implemented:** 🔧 (client-side tracking events only, no admin dashboard integration yet)
- **Notes:** `track()` utility fires events for `model_profile_view`, `model_external_click`. Analytics dashboard not yet real-time.

---

### WF-060 · Model Save for Later
- **Category:** model_conversion | **Phase:** MVP
- **Route(s):** `/dzire-dolls/:slug`, `/profile`
- **Implemented:** ✅
- **How it works:** Heart button on doll profile toggles favourite via FavoritesContext; visible on `/profile`
- **Verify:** Open a doll profile, click the heart button, go to `/profile`, see it in Favourites

---

### WF-061 · Model to Playlist Influence
- **Category:** model_conversion | **Phase:** MVP
- **Route(s):** `/dzire-dolls/:slug`
- **Implemented:** ✅
- **How it works:** "Recommended by [Name]" section has SaveToPlaylistButton on each position card
- **Verify:** Open a doll profile, click save on a recommended position

---

### WF-062 · Model Newsletter Funnel
- **Category:** model_conversion | **Phase:** MVP
- **Route(s):** `/dzire-dolls/:slug`
- **Implemented:** 🔧 (NewsletterForm present on doll profile, no model-segment tagging)
- **Notes:** Email capture works visually but no backend to tag by model segment
- **Verify:** Open a doll profile, scroll to "Get Exclusive Drops", submit email form

---

### WF-063 · Model VIP Content Gate
- **Category:** model_conversion | **Phase:** MVP
- **Route(s):** `/dzire-dolls/:slug` → `/vip`
- **Implemented:** ✅
- **How it works:** "VIP Gallery Preview" section shows blur gate for non-VIP users with upgrade button. VIP users see unlocked placeholder.
- **Verify:** Visit a doll profile without being VIP, click locked gallery → redirected to `/vip`

---

### WF-064 · Model Social Amplification Loop
- **Category:** model_conversion | **Phase:** MVP
- **Route(s):** `/dzire-dolls/:slug`
- **Implemented:** ✅
- **How it works:** Share button copies URL and fires `model_share` event
- **Verify:** Open doll profile, click Share, paste URL to verify

---

## Mock Services & Isolation

All mock data and state is isolated in the following locations:

| Service | File | Notes |
|---------|------|-------|
| Positions data | `src/data/mockPositions.ts` | 10 positions |
| Reviews data | `src/data/mockReviews.ts` | Trophy-enabled |
| Stories data | `src/data/mockStories.ts` | Multiple categories |
| DZIRE Dolls | `src/data/mockDolls.ts` | 6 profiles |
| Articles | `src/data/mockArticles.ts` | Multiple types |
| Dictionary | `src/data/mockDictionary.ts` | Terms with definitions |
| Playlist state | `src/context/PlaylistContext.tsx` | In-memory |
| Auth state | `src/context/AuthContext.tsx` | Mock — any login accepted |
| Favorites/Wishlist | `src/context/FavoritesContext.tsx` | In-memory |
| Analytics | `src/utils/track.ts` | Console logs only |
| Chatbot | `src/components/chatbot/ChatbotWidget.tsx` | Rule-based, no AI |

---

## What Is Not Implemented (and Why)

| Feature | Reason |
|---------|--------|
| Real authentication | No backend configured; mock accepts any credentials |
| Persistent playlists | No database; state resets on page refresh |
| Push notifications | Requires service worker + notification backend |
| Email delivery | No email service; forms accept input silently |
| User comments | Requires backend API + auth guard |
| User ratings | Requires backend storage |
| Real affiliate tracking | Tracking events fire but no analytics service connected |
| VIP payment | No payment gateway; `upgradeToVip()` is instant mock |
| Admin analytics | Admin dashboard uses mock data |
| AI chatbot | Rule-based keyword matching only |

---

## Running Locally

```bash
cd frontend
npm install
npm run dev
# Visit http://localhost:5173
```

## Build

```bash
cd frontend
npm run build
```

## Key Routes Reference

| Route | Page | Status |
|-------|------|--------|
| `/` | Home | ✅ |
| `/positions` | Positions list | ✅ |
| `/positions/:slug` | Position detail | ✅ |
| `/reviews` | Reviews list | ✅ |
| `/reviews/:slug` | Review detail | ✅ |
| `/dictionary` | Dictionary | ✅ |
| `/dictionary/:slug` | Term detail | ✅ |
| `/dzire-dolls` | Dolls list | ✅ |
| `/dzire-dolls/:slug` | Doll profile | ✅ |
| `/stories` | Stories list | ✅ |
| `/stories/:slug` | Story detail | ✅ |
| `/magazine` | Magazine | ✅ |
| `/search` | Search | ✅ |
| `/explore` | Explore Hub | ✅ |
| `/vip` | VIP page | ✅ |
| `/quiz` | Style quiz | ✅ |
| `/signup` | Signup | ✅ |
| `/login` | Login | ✅ |
| `/onboarding` | Onboarding | ✅ |
| `/profile` | User profile | ✅ |
| `/playlists` | Playlists list | ✅ |
| `/playlists/:id` | Playlist detail | ✅ |
| `/tags/:tag` | Tag results | ✅ |
| `/newsletter` | Newsletter | ✅ |
| `/contact` | Contact | ✅ |
| `/admin/login` | Admin login | ✅ |
| `/admin/dashboard` | Admin dashboard | ✅ |
