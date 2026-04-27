---
name: metrics-definition-skill
description: Define KPIs, metrics, events, dimensions, and reporting views for a project or feature. Use when the user asks to define success metrics, set up tracking events, create a measurement plan, or decide what to measure and how to report it.
category: analytics
version: v1.0
inputs:
  - project or feature description
  - business goals
outputs:
  - metrics definition doc
  - KPI list
  - event tracking plan
---

# Metrics Definition Skill

## Purpose
Define clear, measurable KPIs, tracking events, reporting dimensions, and success criteria so the team can measure and improve performance.

## When To Use
Use this skill when the user asks to:
- Define success metrics for a feature or product
- Create a KPI dashboard plan
- Set up event tracking and analytics
- Map business goals to measurable outcomes
- Produce a measurement framework

## Inputs
- Project or feature description
- Business goals and success criteria
- Reporting tool in use (e.g., Mixpanel, Amplitude, Datadog, custom)

## Workflow
1. Clarify business goals and what "success" looks like
2. Identify primary KPIs (the 3–5 numbers that matter most)
3. Define supporting metrics and dimensions
4. Map user actions to trackable events
5. Specify reporting views (dashboards, charts, alerts)
6. Document the full metrics plan

## Output Format
```
# Metrics Plan: [Feature/Project Name]
## Primary KPIs
| Metric | Definition | Target | Owner |
## Supporting Metrics
## Events
| Event Name | Trigger | Properties |
## Reporting Views
## Measurement Notes
```

## Quality Checklist
- [ ] At least 3 primary KPIs defined with clear definitions
- [ ] Each KPI has a target value or trend direction
- [ ] Events mapped to user actions
- [ ] Reporting views identified
- [ ] Metrics owner assigned

## References
- [Metrics Guide](references/metrics-guide.md)
- [Metrics Report Script](scripts/generate_metrics_report.py)
