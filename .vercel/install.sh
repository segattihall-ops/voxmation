#!/usr/bin/env bash
set -euo pipefail

PNPM_VERSION="10.13.1"

npx -y "pnpm@${PNPM_VERSION}" install --no-frozen-lockfile
