#!/usr/bin/env python3
"""benchmark.py — Run DZIRE_v1 eval benchmarks."""

import json
import os

EVALS_DIR = os.path.join(os.path.dirname(__file__), "..", "evals")

print("==> Running DZIRE_v1 benchmarks...")
for fname in ["evals.json", "frontend-evals.json", "backend-evals.json", "database-evals.json", "api-evals.json"]:
    path = os.path.join(EVALS_DIR, fname)
    if os.path.exists(path):
        with open(path) as f:
            data = json.load(f)
        print(f"  [{fname}] {len(data.get('evals', []))} evals defined.")
    else:
        print(f"  [{fname}] not found.")
print("==> Done. Results would be written to evals/results/")
