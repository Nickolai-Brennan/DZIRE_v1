# Workflow: Skill Lifecycle

**Owner**: `skill-creator` skill  
**Related**: [`skill-creator/SKILL.md`](../skills/skill-creator/SKILL.md), [`eval-runner/SKILL.md`](../skills/eval-runner/SKILL.md)

---

## Overview

The skill lifecycle is the end-to-end process for creating, evaluating, benchmarking, and improving a skill. It has five phases: **Draft → Test → Evaluate → Iterate → Publish**.

```
Draft → Test → Evaluate → Iterate → Publish
  ↑                              |
  └──────────── loop ────────────┘
```

---

## Phase 1: Draft

**Skill**: `skill-creator`  
**Goal**: Write a working first version of the skill.

### Steps

1. **Capture intent** — What should this skill do? When should it trigger?
2. **Interview** — Clarify edge cases, input/output formats, success criteria
3. **Write `SKILL.md`** with:
   - YAML frontmatter: `name`, `description` (required)
   - `## Purpose` — what it does
   - `## When To Use` — specific trigger contexts
   - `## Inputs` — what the skill needs
   - `## Workflow` — step-by-step process
   - `## Output Format` — template for the output
   - `## Quality Checklist` — pass/fail criteria
   - `## References` — links to supporting files
4. **Add supporting folders** as needed:
   - `scripts/` — deterministic helpers
   - `references/` — detailed docs
   - `assets/` — templates, examples

**Output**: `skills/[skill-name]/SKILL.md` + supporting files

---

## Phase 2: Test

**Skill**: `skill-creator` + `eval-runner`  
**Goal**: Define 2–5 realistic test cases and run them.

### Steps

1. Write 2–5 test cases — realistic user prompts, not contrived ones
2. Save as `evals/[skill-name]-evals.json` (use `skills/eval-runner/assets/eval-template.json`)
3. Run each prompt against the skill (with-skill) **and** without the skill (baseline)
4. Save outputs to `[skill-name]-workspace/iteration-1/eval-[id]/`

**Output**: Eval JSON file + raw run outputs

---

## Phase 3: Evaluate

**Skill**: `eval-runner`  
**Goal**: Grade outputs and identify gaps.

### Steps

1. For each run, compare output to `expected_output`
2. Check assertions (`contains`, `not_contains`, `file_created`, etc.)
3. Grade each case: **pass** / **partial** / **fail**
4. Note qualitative observations (tone, format, completeness)
5. Generate pass/fail report

**Output**: `evals/results/[skill-name]-results-[date].md`

---

## Phase 4: Iterate

**Skill**: `skill-creator`  
**Goal**: Improve the skill based on eval findings.

### Common improvements

| Issue | Fix |
|-------|-----|
| Skill doesn't trigger | Make `description` more specific and pushy |
| Wrong output format | Add/tighten `## Output Format` section |
| Missing steps | Expand `## Workflow` |
| Over-triggers | Narrow `description` trigger contexts |
| Wrong tone | Add style guidance to body |
| Missing edge case handling | Add edge case notes to workflow |

### Steps

1. Review eval results and identify top 1–3 issues
2. Edit `SKILL.md` to address them
3. Re-run the same eval cases (increment iteration number)
4. Compare results to previous iteration
5. Repeat until quality gates are met

**Quality gates for "done":**
- ≥ 80% of eval cases pass
- No critical failures (completely wrong output type)
- At least one baseline comparison shows improvement

---

## Phase 5: Publish

**Skill**: `skill-creator` (description optimizer)  
**Goal**: Finalize the skill for production use.

### Steps

1. **Optimize description** — Run the description improver to maximize trigger accuracy
2. **Add to `skills/master-list.md`** — Add the skill to the appropriate category table
3. **Update `skills/skill-creator/references/schemas.json`** if new eval assertion types were used
4. **Final review** — Check against `skills/skills-spec.md` for compliance:
   - `name` matches directory name
   - `description` ≤ 1024 characters
   - Frontmatter uses `---` delimiters (not fenced code blocks)
5. **Commit with descriptive message**: `feat(skills): add [skill-name] skill`

**Output**: Published skill in `skills/[skill-name]/`

---

## Skill Quality Standards

Every published skill must have:

| Item | Required |
|------|---------|
| YAML frontmatter with `name` + `description` | ✅ Required |
| `## Purpose` section | ✅ Required |
| `## When To Use` section | ✅ Required |
| `## Inputs` section | ✅ Required |
| `## Workflow` section | ✅ Required |
| `## Output Format` section | Recommended |
| `## Quality Checklist` section | Recommended |
| `## References` section | Recommended |
| At least 2 eval cases in `evals/` | Recommended |
| `assets/`, `references/`, `scripts/` as needed | Optional |

---

## Quick Reference

```
skills/[skill-name]/
├── SKILL.md           ← Required
├── assets/            ← Templates, examples
├── references/        ← Detailed docs
└── scripts/           ← Executable helpers

evals/
└── [skill-name]-evals.json

workflows/
└── skill-lifecycle.md ← (this file)
```

---

## Related Workflows

- [`project-startup.md`](./project-startup.md) — Full project kickoff
- [`workflow_library.md`](./workflow_library.md) — All workflow chains
