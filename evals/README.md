# evals/

Evaluation files for measuring agent, skill, and system quality.

## Structure

```
evals/
├── evals.json                    # Full system evals (project-level)
├── frontend-evals.json           # UI / component evals
├── backend-evals.json            # Route / service evals
├── database-evals.json           # Schema / migration evals
├── api-evals.json                # Endpoint / contract evals
├── skill-creator-evals.json      # Skill creation + improvement evals
├── eval-runner-evals.json        # Eval authoring and reporting evals
├── deployment-planner-evals.json # Dockerfile, CI/CD, deployment evals
├── benchmarks/                   # Benchmark run configs
└── results/                      # Eval results output
```

## Eval JSON Schema

Each eval file follows this structure:

```json
{
  "version": "1.0",
  "skill_name": "skill-name",
  "evals": [
    {
      "id": 1,
      "name": "descriptive-eval-name",
      "prompt": "Realistic user prompt",
      "expected_output": "Specific description of correct output",
      "files": ["path/to/relevant/file"],
      "assertions": [
        { "type": "contains", "value": "expected text" }
      ]
    }
  ]
}
```

## Running Evals

1. Activate the `eval-runner` skill
2. Point it at the eval file: `evals/[skill-name]-evals.json`
3. For each case, run the prompt against the skill
4. Compare against `expected_output` and check `assertions`
5. Record results in `evals/results/`

See [`skills/eval-runner/SKILL.md`](../skills/eval-runner/SKILL.md) for full instructions.  
See [`skills/eval-runner/references/eval-guide.md`](../skills/eval-runner/references/eval-guide.md) for writing good evals.  
See [`skills/eval-runner/assets/eval-template.json`](../skills/eval-runner/assets/eval-template.json) for a blank template.

## Owner
`testing-agent` → `eval-runner` skill

See [`config/stack.config.json`](../config/stack.config.json) for locked stack decisions.

