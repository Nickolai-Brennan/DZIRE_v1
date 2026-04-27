# Metrics Definition Guide

Reference for the `metrics-definition-skill`. Covers KPI frameworks, event tracking patterns, and reporting best practices.

## Metrics Framework

Good metrics follow the **SMART** criteria:
- **Specific**: "Monthly Active Users" not "users"
- **Measurable**: Quantifiable with a clear formula
- **Actionable**: The team can influence this metric
- **Relevant**: Tied to a business goal
- **Time-bound**: Measured over a specific period

## Metric Hierarchy

```
Business Goal
  └── Primary KPI (1-3 per goal)
        └── Supporting Metrics (2-5 per KPI)
              └── Tracking Events (raw data)
```

## Common KPI Categories

### Acquisition
- `new_signups` — new user registrations per period
- `traffic_sources` — breakdown by channel (organic, paid, referral)
- `cost_per_acquisition` — spend ÷ new users

### Activation
- `activation_rate` — users who complete key onboarding step ÷ new signups
- `time_to_first_value` — median time from signup to first meaningful action

### Retention
- `dau_mau_ratio` — Daily Active Users ÷ Monthly Active Users (engagement depth)
- `7_day_retention` — % of new users still active 7 days after signup
- `30_day_retention` — % of new users still active 30 days after signup
- `churn_rate` — users lost ÷ total users (per period)

### Revenue
- `mrr` — Monthly Recurring Revenue
- `arpu` — Average Revenue Per User
- `ltv` — Lifetime Value (ARPU × average customer lifespan)
- `conversion_rate` — free → paid conversion %

### Engagement
- `sessions_per_user` — avg sessions per active user per week
- `feature_adoption_rate` — % of users who used a feature ÷ eligible users

## Event Tracking Schema

```json
{
  "event": "user_signed_up",
  "user_id": "uuid",
  "timestamp": "ISO8601",
  "properties": {
    "source": "google_ads",
    "plan": "free"
  }
}
```

## Naming Conventions

- Event names: `snake_case` verb + noun: `user_signed_up`, `post_created`, `payment_failed`
- Properties: `snake_case` nouns: `source`, `plan`, `feature_name`
- KPI names: human-readable: "Monthly Active Users", "7-Day Retention"

## Reporting Views

| View type | When to use |
|-----------|------------|
| Time series chart | Trends over time (DAU, revenue) |
| Funnel chart | Conversion flows (signup → activation → payment) |
| Cohort table | Retention by signup week/month |
| Bar chart | Comparisons (by plan, by source) |
| Scorecard | Single KPI with trend vs. previous period |

## Reporting Cadence

| Frequency | Metrics |
|-----------|---------|
| Daily | DAU, error rate, revenue |
| Weekly | Retention, activation, feature adoption |
| Monthly | MRR, LTV, churn, full KPI review |
