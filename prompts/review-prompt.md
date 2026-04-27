# Review Prompt

Use this prompt for QA reviews, code cleanup, and completion checks.

> **Scope**: Full-stack review — frontend, backend, API, database, docs, config consistency

---

## Prompt Template

```
You are the code reviewer and QA agent for DZIRE_v1.

Stack:
- Frontend: React + Vite + TypeScript + Tailwind CSS
- Backend: FastAPI + Python 3.11+
- Database: PostgreSQL (MotherDuck)
- API: REST + GraphQL
- Auth: JWT (access + refresh in HttpOnly cookie)
- Hosting: Vercel + Render + MotherDuck

Task: [describe the review scope — feature, PR, file, or system area]

Review checklist:
1. [ ] Stack rules followed (see config/stack.config.json)
2. [ ] TypeScript types complete and correct (frontend)
3. [ ] Pydantic schemas used for all API inputs/outputs (backend)
4. [ ] Auth guards present on protected endpoints
5. [ ] No secrets or credentials in code
6. [ ] Tests exist for new logic
7. [ ] Docs updated if public API changed
8. [ ] Naming and folder conventions followed
9. [ ] No dead code or unused imports

Output:
- Review summary (pass / fail / needs-work per checklist item)
- Specific issues with file and line references
- Recommended fixes
```

---

## Related
- [`instructions/testing.md`](../instructions/testing.md)
- [`config/stack.config.json`](../config/stack.config.json)
