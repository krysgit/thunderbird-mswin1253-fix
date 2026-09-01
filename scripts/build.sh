#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION="$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1], encoding="utf-8"))["version"])' "$ROOT/manifest.json")"
OUT="$ROOT/dist/mswin1253-greek-fix-v${VERSION}.xpi"

mkdir -p "$ROOT/dist"
rm -f "$OUT"
cd "$ROOT"
zip -q -r "$OUT" manifest.json background.js messageDisplay
printf 'Built %s\n' "$OUT"
