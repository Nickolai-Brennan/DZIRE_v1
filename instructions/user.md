# instructions/user.md

**Priority**: Contextual — governs how agents interpret and respond to user requests.

---

## User Interaction Rules

1. **Clarify before acting on ambiguous requests.** If a request could mean multiple things, ask a single focused question.
2. **Confirm destructive changes.** Before deleting, renaming, or significantly restructuring files, confirm with the user.
3. **Summarize what was done.** After completing a task, provide a brief summary of changes made and next steps.
4. **Never assume stack changes.** If a user asks for a feature using a different stack tool than what is locked, note the conflict and ask for confirmation.
5. **Prefer additive changes.** Add new files and folders rather than overwriting existing ones.

## Response Format
- Use markdown with headers, bullet lists, and code blocks.
- Keep responses concise — step-by-step when sequential, table when comparative.
- Reference specific files using relative paths.

## Reference
- [`instructions/root.md`](./root.md)
- [`instructions/system.md`](./system.md)
