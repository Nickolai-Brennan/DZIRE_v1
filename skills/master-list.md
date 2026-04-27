# SKILLS.md

Master list of reusable skills for the Project Agent Engine.

## Usage Rule

- Agents manage work.
- Skills execute reusable capabilities.
- Workflows sequence skills.
- Outputs should be saved to `/docs/agent-outputs/`.

---

## Active Skill Folders

The following skills have a full folder with SKILL.md and supporting files in skills/:

| Skill Folder | Category | Status |
|---|---|---|
| api-designer | build | Active |
| backend-builder | build | Active |
| database-designer | build | Active |
| deployment-planner | deployment | Active |
| documentation-generator | documentation | Active |
| eval-runner | evaluation | Active |
| frontend-builder | build | Active |
| metrics-definition-skill | analytics | Active |
| planning-agent-skill | planning | Active |
| project-planner | planning | Active |
| project-planning-skill | planning | Active |
| skill-creator | meta | Active |
| stack-verifier | verification | Active |
| webapp-testing | testing | Active |

> Skills below are **catalog entries** — documented and planned but do not yet have their own folder under skills/. To implement one, use skill-creator to scaffold the folder.

---

## Planning Skills

| Skill | Description |
|---|---|
| `project-breakdown-skill` | Breaks a raw idea into project scope, modules, features, and required outputs. |
| `mvp-definition-skill` | Defines the minimum viable product, core user flows, and must-have launch features. |
| `feature-prioritization-skill` | Ranks features by urgency, value, complexity, dependency, and launch impact. |
| `roadmap-generation-skill` | Creates phased project roadmaps from idea through launch and scale. |
| `idea-validation-skill` | Evaluates market fit, user need, feasibility, risks, and early validation steps. |

## Architecture Skills

| Skill | Description |
|---|---|
| `stack-selection-skill` | Recommends frontend, backend, database, hosting, and tooling based on project needs. |
| `system-design-skill` | Maps the full system architecture, modules, services, data flow, and boundaries. |
| `microservice-mapping-skill` | Identifies which features should become standalone services or modules. |
| `infra-planning-skill` | Plans hosting, environments, deployment targets, storage, monitoring, and service dependencies. |
| `scalability-planning-skill` | Prepares the architecture for growth, performance, queues, caching, and future scale. |

## Repository Skills

| Skill | Description |
|---|---|
| `repo-structure-generation-skill` | Creates the folder structure, repo layout, docs folders, and starter organization. |
| `copilot-instructions-generation-skill` | Creates repo-level Copilot instructions for coding style, stack, workflows, and rules. |
| `environment-setup-skill` | Defines local development setup, environment variables, scripts, and required tools. |
| `docker-setup-skill` | Creates Docker and Docker Compose plans for local and production-like environments. |
| `ci-cd-setup-skill` | Plans GitHub Actions or similar automation for testing, linting, building, and deployment. |

## Database Skills

| Skill | Description |
|---|---|
| `database-schema-design-skill` | Designs schemas, tables, fields, relationships, constraints, and naming conventions. |
| `table-relationship-mapping-skill` | Maps one-to-one, one-to-many, and many-to-many relationships between entities. |
| `index-optimization-skill` | Recommends indexes for search, filtering, joins, dashboards, and query performance. |
| `migration-planning-skill` | Plans database migrations, versioning, rollback strategy, and seed order. |
| `seed-data-generation-skill` | Creates realistic starter data for testing, demos, dashboards, and local development. |

## Backend Skills

| Skill | Description |
|---|---|
| `service-layer-design-skill` | Designs backend service modules, business logic boundaries, and reusable service patterns. |
| `auth-system-design-skill` | Plans authentication, authorization, roles, permissions, sessions, and token handling. |
| `business-logic-mapping-skill` | Maps feature requirements into backend logic, rules, validations, and service workflows. |
| `error-handling-patterns-skill` | Defines standard error responses, exception handling, logging, and recovery behavior. |
| `background-jobs-skill` | Plans scheduled jobs, queues, workers, async tasks, retries, and job monitoring. |

## API Skills

| Skill | Description |
|---|---|
| `api-contract-generation-skill` | Creates API contracts, endpoint maps, request/response shapes, and status behavior. |
| `graphql-schema-design-skill` | Designs GraphQL types, queries, mutations, resolvers, and schema relationships. |
| `rest-endpoint-design-skill` | Designs REST endpoints, route naming, parameters, payloads, and response formats. |
| `api-validation-skill` | Defines validation rules for API inputs, outputs, errors, and edge cases. |
| `rate-limiting-skill` | Plans rate limits, abuse protection, throttling, quotas, and API access controls. |

## Frontend Skills

| Skill | Description |
|---|---|
| `component-architecture-skill` | Breaks UI into reusable components, layouts, cards, forms, tables, and sections. |
| `page-generation-skill` | Creates page maps, route structure, templates, and page-level responsibilities. |
| `state-management-skill` | Plans frontend state, server-state fetching, caching, filters, and shared UI state. |
| `table-filtering-skill` | Designs sortable, searchable, filterable table systems for dashboards and data views. |
| `form-handling-skill` | Plans forms, validation, submission flows, errors, and success states. |

## Design Skills

| Skill | Description |
|---|---|
| `design-system-creation-skill` | Creates design tokens, typography, spacing, colors, components, and usage rules. |
| `ui-layout-generation-skill` | Creates wireframe-ready layouts, section structures, grids, and container patterns. |
| `component-library-skill` | Defines reusable UI components and documentation for consistent product design. |
| `responsive-design-skill` | Plans desktop, tablet, and mobile layout behavior across major screens. |
| `brand-guidelines-skill` | Creates brand rules for logo usage, colors, typography, imagery, and visual tone. |

## Content Skills

| Skill | Description |
|---|---|
| `content-generation-skill` | Generates structured articles, posts, descriptions, scripts, and content drafts. |
| `article-structure-skill` | Creates article outlines, headings, intro structure, sections, and call-to-action placement. |
| `longform-content-skill` | Builds deep-dive articles, guides, essays, reports, and pillar content. |
| `review-content-skill` | Creates product, tool, service, or media review structures and scoring logic. |
| `content-repurposing-skill` | Turns long content into short posts, emails, captions, summaries, and campaign assets. |

## SEO Skills

| Skill | Description |
|---|---|
| `seo-keyword-research-skill` | Finds keyword targets, search intent, topic clusters, and content opportunities. |
| `on-page-seo-skill` | Optimizes headings, structure, internal links, schema, readability, and search intent alignment. |
| `metadata-generation-skill` | Creates SEO titles, meta descriptions, slugs, Open Graph text, and social snippets. |
| `internal-linking-skill` | Plans internal link structure between articles, landing pages, categories, and hubs. |
| `seo-audit-skill` | Audits pages for technical SEO, content gaps, metadata, linking, and crawl issues. |

## Marketing Skills

| Skill | Description |
|---|---|
| `marketing-strategy-skill` | Creates growth strategy, channel mix, audience segments, positioning, and launch approach. |
| `funnel-design-skill` | Builds awareness, consideration, conversion, retention, and upsell funnels. |
| `offer-creation-skill` | Defines offers, lead magnets, bundles, pricing hooks, and promotion angles. |
| `landing-page-copy-skill` | Creates conversion-focused landing page headlines, sections, benefits, proof, and CTAs. |
| `conversion-optimization-skill` | Improves calls-to-action, forms, page flow, offers, and conversion tracking. |

## Social Skills

| Skill | Description |
|---|---|
| `social-post-generation-skill` | Creates social posts, captions, hooks, threads, carousels, and platform-specific copy. |
| `platform-formatting-skill` | Formats content for specific platforms, dimensions, post types, and text limits. |
| `engagement-strategy-skill` | Plans engagement loops, comments, community prompts, polls, and response workflows. |
| `hashtag-research-skill` | Finds hashtags, niche tags, branded tags, campaign tags, and discovery terms. |
| `social-scheduling-skill` | Plans posting cadence, publishing windows, queue logic, and channel scheduling. |

## Analytics Skills

| Skill | Description |
|---|---|
| `metrics-definition-skill` | Defines KPIs, events, dimensions, reporting views, and success measurements. |
| `dashboard-generation-skill` | Plans analytics dashboards, cards, charts, filters, and report layouts. |
| `event-tracking-skill` | Defines event names, payloads, user actions, conversion events, and logging rules. |
| `kpi-analysis-skill` | Interprets performance metrics, trends, bottlenecks, and optimization opportunities. |
| `ab-testing-skill` | Plans experiments, variants, success criteria, sample tracking, and result interpretation. |

## Monetization Skills

| Skill | Description |
|---|---|
| `pricing-strategy-skill` | Creates pricing tiers, packaging, value ladders, discounting, and monetization logic. |
| `subscription-model-skill` | Plans recurring membership tiers, benefits, access levels, billing states, and retention. |
| `affiliate-system-skill` | Designs affiliate tracking, partner pages, links, commissions, and reporting needs. |
| `ad-placement-skill` | Plans ad inventory, placements, sponsorship zones, frequency, and reporting structure. |
| `revenue-forecasting-skill` | Projects revenue scenarios using traffic, conversion rates, pricing, and retention assumptions. |

## Automation Skills

| Skill | Description |
|---|---|
| `workflow-automation-skill` | Automates repeated project, content, publishing, data, and operations workflows. |
| `task-generation-skill` | Converts plans into tasks, subtasks, dependencies, estimates, and priorities. |
| `prompt-optimization-skill` | Improves prompts for clarity, reusable execution, better outputs, and agent compatibility. |
| `agent-chaining-skill` | Defines how agents pass outputs, context, and handoff notes to each other. |
| `notification-system-skill` | Plans alerts, reminders, status notifications, errors, and workflow updates. |

## Data / AI Skills

| Skill | Description |
|---|---|
| `data-ingestion-skill` | Plans scraping, API ingestion, imports, source tracking, and raw data storage. |
| `api-integration-skill` | Connects external APIs, maps fields, handles credentials, and defines sync logic. |
| `data-cleaning-skill` | Normalizes raw data, fixes field inconsistencies, validates records, and prepares datasets. |
| `feature-engineering-skill` | Creates derived fields, model inputs, scoring variables, and transformed metrics. |
| `model-design-skill` | Designs scoring systems, prediction models, rankings, weights, and evaluation logic. |
| `scoring-system-skill` | Creates formulas, weighted grades, ranking methods, tiers, and validation checks. |

## Workflow Skills

| Skill | Description |
|---|---|
| `workflow-generation-skill` | Creates reusable workflows from repeated processes, project stages, and agent chains. |
| `workflow-optimization-skill` | Improves workflows by removing bottlenecks, duplication, unclear ownership, and weak handoffs. |
| `sop-generation-skill` | Creates standard operating procedures with steps, owners, inputs, outputs, and quality checks. |
| `task-breakdown-skill` | Breaks large goals into task trees, components, milestones, and implementation steps. |
| `process-mapping-skill` | Maps systems, decision points, dependencies, handoffs, and execution states. |

## System Skills

| Skill | Description |
|---|---|
| `content-calendar-schema-skill` | Creates database structure for content calendars, statuses, channels, dates, and campaigns. |
| `content-calendar-workflow-skill` | Defines editorial workflow from idea through draft, review, schedule, publish, and analytics. |
| `social-integration-schema-skill` | Creates schema for connected social accounts, provider modules, publishing logs, and metrics. |
| `campaign-structure-skill` | Defines campaign objects, goals, audiences, offers, channels, creative assets, and KPIs. |
| `campaign-scheduling-skill` | Builds promo timelines, launch windows, channel schedules, and campaign publishing queues. |
| `social-size-chart-skill` | Maintains platform image sizes, video specs, banner dimensions, text limits, and template rules. |
| `prompt-tagging-skill` | Tags prompts by use-case, agent, project phase, category, model, and output type. |
| `prompt-versioning-skill` | Tracks prompt versions, revisions, changelogs, outputs, and improvement history. |

---

## Recommended Next Files

- `AGENT_SYSTEM_INDEX.md`
- `WORKFLOW_LIBRARY.md`
- `PROMPT_LIBRARY.md`
- `BEST_PRACTICES.md`
- `/docs/agent-outputs/`
- 
