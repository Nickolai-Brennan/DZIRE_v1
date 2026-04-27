# Workflow: Testing & Review

**Owner**: `testing-agent` | **Skill**: `eval-runner`

---

## Purpose
Run the full test suite and quality review checklist before a release or merge.

## Steps

1. **Run all tests**
   ```bash
   bash scripts/test-all.sh
   ```
   Or manually:
   ```bash
   pytest tests/backend/ tests/api/ tests/database/
   cd frontend && npm run test
   ```

2. **Run evals**
   - Review `evals/evals.json` for system-level eval definitions.
   - Run: `python scripts/benchmark.py`
   - Review output in `evals/results/`.

3. **Code review checklist**
   Use [`prompts/review-prompt.md`](../prompts/review-prompt.md) with these checks:
   - [ ] Stack rules followed
   - [ ] TypeScript types complete
   - [ ] Pydantic schemas on all endpoints
   - [ ] Auth guards present
   - [ ] No secrets in code
   - [ ] Tests exist for new logic
   - [ ] Docs updated

4. **Fix issues and re-run**
   - Address all `fail` items before merging.

5. **Mark PR ready**
   - All tests green.
   - Review checklist complete.

## Outputs
- Test results
- Eval results
- QA checklist (pass/fail)
- Clean PR
