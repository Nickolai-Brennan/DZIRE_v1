# scripts/

Automation scripts for setup, development, testing, and deployment.

## Scripts

| File | Purpose |
|---|---|
| `setup.sh` | Create base folders and install starter dependencies |
| `verify-stack.sh` | Confirm tools are installed and environment is ready |
| `run-dev.sh` | Start all dev services (frontend + backend) |
| `test-all.sh` | Run the full test suite |
| `seed-database.py` | Insert starter / demo data into the database |
| `generate-docs.py` | Generate or refresh project documentation |
| `benchmark.py` | Run eval benchmarks |

## Owner
`deployment-agent` + `stack-verifier-agent`

See [`config/stack.config.json`](../config/stack.config.json) for locked stack decisions.
