#!/usr/bin/env python3
"""
Scans the backend source tree for FastAPI route decorators and writes
a Markdown summary to docs/backend-routes.md.

Usage: python3 scripts/generate-routes.py
"""

import ast
import pathlib

HTTP_METHODS = {"get", "post", "put", "patch", "delete", "options", "head"}

BACKEND_ROOT = pathlib.Path("backend/app")
OUTPUT_FILE = pathlib.Path("docs/backend-routes.md")

routes: list[str] = []

for path in sorted(BACKEND_ROOT.rglob("*.py")):
    try:
        src = path.read_text(encoding="utf-8")
        tree = ast.parse(src, filename=str(path))
    except Exception as exc:
        print(f"[WARN] Could not parse {path}: {exc}")
        continue

    for node in ast.walk(tree):
        if not isinstance(node, ast.FunctionDef):
            continue
        for decorator in node.decorator_list:
            if not isinstance(decorator, ast.Call):
                continue
            func = decorator.func
            if not (isinstance(func, ast.Attribute) and func.attr in HTTP_METHODS):
                continue
            if not decorator.args:
                continue
            arg = decorator.args[0]
            route_path = arg.value if isinstance(arg, ast.Constant) else "?"
            routes.append(
                f"- `{func.attr.upper()} {route_path}` — `{path}:{node.name}`"
            )

if routes:
    content = "# Backend API Routes\n\n" + "\n".join(routes) + "\n"
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(content, encoding="utf-8")
    print(f"Wrote {len(routes)} route(s) to {OUTPUT_FILE}")
else:
    print("No routes found.")
