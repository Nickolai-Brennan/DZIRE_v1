---
name: eval-runner
description: Create and run agent evals to verify AI output quality. Use when the user asks to test agent outputs, create eval cases, or benchmark skill performance.
category: evaluation
version: v1.0
inputs:
  - skill name
  - test prompts
  - expected outputs
outputs:
  - Eval JSON files
  - Eval results
  - Pass/fail report
---

# Eval Runner Skill

## Purpose
Define, run, and report on evaluation cases for agent skills to confirm output quality and correctness.

## When To Use
Use this skill when the user asks to:
- Create eval cases for a skill
- Test whether an agent produces correct output
- Benchmark skill performance
- Validate agent routing behavior

## Inputs
- Skill name
- Test prompts (natural language)
- Expected outputs (structured description)
- Relevant files for context

## Workflow
1. Identify the skill or agent being evaluated
2. Write 2–5 eval cases covering core use cases and edge cases
3. Define expected output for each case (structured, not exact match)
4. Save as JSON in `evals/`
5. Run eval prompts and compare outputs to expected
6. Report pass/fail with notes

## Output Format
```json
{
  "skill_name": "[name]",
  "evals": [
    {
      "id": 1,
      "name": "[eval-name]",
      "prompt": "[test prompt]",
      "expected_output": "[description of correct output]",
      "files": []
    }
  ]
}
```

## Quality Checklist
- [ ] At least 2 eval cases defined
- [ ] Expected outputs are specific and verifiable
- [ ] Saved to `evals/[skill-name]-evals.json`
- [ ] Edge cases covered where relevant

## Reference
- [`evals/`](../../evals/)
- [`instructions/testing.md`](../../instructions/testing.md)
