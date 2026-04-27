#!/usr/bin/env python3
"""benchmark.py — Run DZIRE_v1 eval benchmarks."""

import glob
import json
import os

EVALS_DIR = os.path.join(os.path.dirname(__file__), "..", "evals")

print("==> Running DZIRE_v1 benchmarks...")
for path in sorted(glob.glob(os.path.join(EVALS_DIR, "*-evals.json")) + [os.path.join(EVALS_DIR, "evals.json")]):
    fname = os.path.basename(path)
    if os.path.exists(path):
        with open(path) as f:
            data = json.load(f)
        print(f"  [{fname}] {len(data.get('evals', []))} evals defined.")
    else:
        print(f"  [{fname}] not found.")
print("==> Done. Results would be written to evals/results/")
