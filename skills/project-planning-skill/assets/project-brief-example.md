
# Project Brief: Strik3Zone STORM Dashboard

## Description
A data-driven dashboard focused on evaluating MLB relief pitchers using advanced metrics (STORM model). Designed for fantasy players, bettors, and analysts.

## Audience
- Fantasy baseball players
- Sports bettors
- Baseball analysts

## Problem
Relief pitchers are difficult to evaluate due to inconsistent roles and misleading traditional stats (ERA, saves). Users lack a reliable system to measure true bullpen performance.

## Solution
Create a dashboard powered by the STORM model combining leverage index, WPA, SIERA, CSW%, and usage patterns to rank and categorize relievers.

## Core Features
- STORM Score leaderboard
- Role classification (Closer, Setup, High Relief, etc.)
- Time filters (7, 14, 30 days, YTD)
- Team bullpen matrix
- Trend indicators (movement vs prior period)

## Extended Features
- Fantasy value integration (A$V)
- Tier-based rankings
- Alerts for role changes
- Player comparison tool

## Monetization
- Subscription (premium analytics dashboard)
- Affiliate partnerships (sportsbooks, fantasy tools)
- Sponsored content

## Traffic Strategy
- SEO (reliever rankings, bullpen analysis)
- Social media clips + graphics
- Newsletter (weekly bullpen report)
- Community engagement (Discord)

## Competitive Landscape
### Competitors
- FanGraphs
- Baseball Savant
- FantasyPros

### Gaps
- No unified reliever scoring system
- Poor UX for bullpen visualization
- Lack of fantasy + analytics crossover

## Tech Stack
- Frontend: React + Vite + TypeScript
- Backend: FastAPI
- Database: PostgreSQL
- Data Source: FanGraphs API + scraping

## Data Requirements
- Player stats (K%, BB%, CSW%, SIERA)
- Leverage Index (gmLI, pLI)
- WPA / WPA/LI
- Usage patterns
- Inherited runners

## Success Metrics
- Monthly active users
- Conversion to paid users
- Engagement time per session
- SEO rankings for target keywords

## Risks
- Data reliability
- API limitations
- User education curve

## Opportunities
- Expand into full pitching analytics
- Integrate betting insights
- Add predictive modeling

## Notes
This project integrates into the larger Strik3Zone ecosystem and feeds data into fantasy tools like A$V and tier rankings.
