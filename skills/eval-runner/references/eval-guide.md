# Eval Writing Guide

Reference for the `eval-runner` skill. Covers how to write, structure, run, and interpret evaluation cases for agent skills in DZIRE_v1.

## What Makes a Good Eval

A good eval case:
1. **Realistic**: Uses a prompt a real user would actually write
2. **Specific**: Has a clear, verifiable expected output (not "a good response")
3. **Targeted**: Tests one behavior per case (not multiple things at once)
4. **Minimal**: Uses only the files needed, not the whole repo

## Eval JSON Schema

```json
{
  "version": "1.0",
  "skill_name": "skill-name",
  "evals": [
    {
      "id": 1,
      "name": "descriptive-eval-name",
      "prompt": "The exact user prompt to test",
      "expected_output": "Specific description of what correct output looks like",
      "files": ["path/to/relevant/file.py"],
      "assertions": [
        {
          "type": "contains",
          "value": "text that must appear in output"
        },
        {
          "type": "not_contains",
          "value": "text that must NOT appear"
        }
      ]
    }
  ]
}
```

## Assertion Types

| Type | Description | Example |
|------|-------------|---------|
| `contains` | Output must include this text | `{"type": "contains", "value": "def create_user"}` |
| `not_contains` | Output must not include this text | `{"type": "not_contains", "value": "TODO"}` |
| `starts_with` | Output starts with this prefix | `{"type": "starts_with", "value": "# "}` |
| `matches_regex` | Output matches regex pattern | `{"type": "matches_regex", "value": "\\d{4}-\\d{2}-\\d{2}"}` |
| `file_created` | A specific file was created | `{"type": "file_created", "value": "docs/api-reference.md"}` |

## Good vs. Poor Expected Outputs

**Poor** (too vague):
```
"expected_output": "A good API design"
```

**Good** (specific and verifiable):
```
"expected_output": "A FastAPI router file with at least GET, POST, and DELETE routes for the 'users' resource, using Pydantic v2 schemas, and the router registered in main.py"
```

## Naming Conventions

- `id`: Sequential integer starting from 1
- `name`: Kebab-case descriptive name: `create-user-happy-path`, `invalid-input-rejection`
- Files: `evals/[skill-name]-evals.json`

## Running Evals

1. Open the skill in context
2. For each eval case, run the prompt against the skill
3. Compare output to `expected_output` and check `assertions`
4. Record pass/fail in `evals/results/`

## Number of Cases

| Skill complexity | Recommended cases |
|-----------------|------------------|
| Simple (1 output type) | 2–3 |
| Medium (2–3 output types) | 4–6 |
| Complex (many paths) | 6–10 |

Always include:
- At least 1 "happy path" (typical use)
- At least 1 edge case (unusual input)
- At least 1 validation case (what should the skill reject or handle gracefully)
