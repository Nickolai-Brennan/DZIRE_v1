# evals/

Evaluation files for measuring agent, skill, and system quality.

## Structure

```
evals/
├── evals.json           # Full system evals
├── frontend-evals.json  # UI / component evals
├── backend-evals.json   # Route / service evals
├── database-evals.json  # Schema / migration evals
├── api-evals.json       # Endpoint / contract evals
├── benchmarks/          # Benchmark run configs
└── results/             # Eval results output
```

## Owner
`testing-agent` → `eval-runner` skill

See [`config/stack.config.json`](../config/stack.config.json) for locked stack decisions.
