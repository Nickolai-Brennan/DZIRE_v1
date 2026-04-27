# Workflows Docs — DZIRE_v1

## Overview
Workflows define repeatable build and review processes. Each workflow lives in `workflows/[name].md`.

## Workflow Index

| Workflow | File | Purpose |
|---|---|---|
| Project Startup | `workflows/project-startup.md` | Full project intake and planning |
| Stack Identification | `workflows/stack-identification.md` | Verify and confirm tech stack |
| Database Build | `workflows/database-build.md` | Build schema, migrations, seeds |
| Backend Build | `workflows/backend-build.md` | Build routes, services, auth |
| API Build | `workflows/api-build.md` | Define routes and contracts |
| Frontend Build | `workflows/frontend-build.md` | Build pages, components, routes |
| Full-Stack Integration | `workflows/fullstack-integration.md` | Connect all layers end-to-end |
| Testing Review | `workflows/testing-review.md` | Run test suite and review results |
| Deployment | `workflows/deployment.md` | Deploy to production |
| Content Publishing | `workflows/content-publishing-workflow.md` | Publish content |

## Standard Development Loop

```
Plan → Build → Verify → Refactor → Document → Commit
```

## Each Loop Produces
- Updated files
- Test result
- Review notes
- Changelog entry
- Next task

## Reference
- [`workflows/`](../workflows/)
- [`workflows/workflow_library.md`](../workflows/workflow_library.md)
