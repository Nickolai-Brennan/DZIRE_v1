# Workflow: Stack Identification

**Owner**: `stack-verifier-agent` | **Skill**: `stack-verifier`

---

## Purpose
Verify the selected stack is installed, configured, and ready for development.

## Steps

1. **Check frontend tooling**
   ```bash
   node --version     # 18+
   npm --version
   cd frontend && npm install
   ```

2. **Check backend tooling**
   ```bash
   python --version   # 3.11+
   pip --version
   cd backend && pip install -r requirements.txt
   ```

3. **Check database connection**
   - Confirm `DATABASE_URL` in `.env` points to MotherDuck or local Postgres.
   - Run a connection test: `psql $DATABASE_URL -c "SELECT 1;"`.

4. **Check environment variables**
   - Copy `config/env.example` → `.env` if not present.
   - Verify all required vars are set.

5. **Confirm config consistency**
   - Ensure `config/stack.config.json`, `docs/stack.md`, and `.github/copilot-instructions.md` all reflect the same stack.

## Outputs
- Stack verification report
- List of missing tools or config
- Environment ready for `run-dev.sh`
