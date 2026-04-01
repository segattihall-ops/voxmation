#!/usr/bin/env bash
# Run this script to apply the Prisma schema to the database.
# Safe to run multiple times (idempotent).
#
# Usage:
#   bash scripts/db-setup.sh            # development: uses prisma db push (no migration history)
#   bash scripts/db-setup.sh --migrate  # production: uses prisma migrate deploy (migration history kept)
#
# IMPORTANT: Use --migrate in production/staging environments.
# 'db push' is fast but does not track migration history and can be destructive.
# 'migrate deploy' applies only pending migrations from the migrations/ folder.
set -euo pipefail

MODE="${1:-}"
cd "$(dirname "$0")/../packages/db"

if [ "$MODE" = "--migrate" ]; then
  echo "=== Running prisma migrate deploy (production mode) ==="
  npx prisma migrate deploy
  echo "=== Migrations applied ==="
else
  echo "=== Running prisma db push (development mode) ==="
  npx prisma db push --accept-data-loss
  echo "=== Database schema is up to date ==="
fi

npx prisma generate
