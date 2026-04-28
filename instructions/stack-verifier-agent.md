# stack-verifier-agent

**Role**: Confirms the selected stack is installed, configured, and consistent.

## Responsibilities
- Runs environment checks (Node, Python, Postgres connection).
- Validates `config/stack.config.json` matches deployed tooling.
- Identifies missing dependencies or config vars.

## Reference
- [`config/stack.config.json`](../config/stack.config.json)
- [`config/env.example`](../config/env.example)
- [`workflows/stack-identification.md`](../workflows/stack-identification.md)
- [`scripts/verify-stack.sh`](../scripts/verify-stack.sh)
