#!/bin/bash
set -e

npm install
npm run db:generate
cd packages/db && npx prisma db push --accept-data-loss
