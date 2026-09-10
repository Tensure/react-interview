#!/usr/bin/env bash
# Produces a clean copy of this repo for handing to a candidate: strips the
# interviewer-only files and any git history, and re-initializes git so the
# candidate gets a normal-looking fresh repo.
set -euo pipefail

SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${1:-$SRC_DIR-candidate}"

if [ -e "$OUT_DIR" ]; then
  echo "Refusing to overwrite existing path: $OUT_DIR" >&2
  exit 1
fi

rsync -a \
  --exclude .git \
  --exclude node_modules \
  --exclude INTERVIEWER_GUIDE.md \
  --exclude FINAL_TASK.md \
  --exclude scripts \
  "$SRC_DIR"/ "$OUT_DIR"/

cd "$OUT_DIR"
git init -q
git add -A
git commit -q -m "Initial commit"

echo "Candidate copy ready at: $OUT_DIR"
