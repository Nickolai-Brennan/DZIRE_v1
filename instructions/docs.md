# instructions/docs.md

**Owner**: `documentation-agent` | **Skill**: `documentation-generator`

---

## Stack
- Format: Markdown
- Location: `docs/`
- Index: `docs/README.md`

## Required Doc Files
```
docs/
├── README.md           # Index / entry point
├── project-overview.md # What DZIRE_v1 is
├── architecture.md     # System layers and data flow
├── stack.md            # Stack choices (source of truth for humans)
├── frontend.md         # UI structure and patterns
├── backend.md          # Server structure and patterns
├── database.md         # Schema and migration notes
├── api.md              # Endpoint contracts summary
├── agents.md           # Agent map and responsibilities
├── skills.md           # Skill map and usage
├── workflows.md        # Repeatable workflows index
├── setup.md            # Install / run instructions
└── changelog.md        # Changes over time
```

## Rules
1. Every new feature that changes a public API must update the relevant doc.
2. Every new doc file must be linked from `docs/README.md`.
3. Use relative links between doc files.
4. Keep docs concise — use tables, bullet lists, and code blocks.
5. `docs/stack.md` must always match `config/stack.config.json`.

## Reference
- [`prompts/docs-prompt.md`](../prompts/docs-prompt.md)
- [`.github/copilot-instructions.md`](../.github/copilot-instructions.md)
