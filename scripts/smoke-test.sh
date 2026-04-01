#!/usr/bin/env bash
set -euo pipefail

BASE="${API_URL:-http://localhost:5000}"
PASS=0
FAIL=0

ok() { echo "[PASS] $1"; ((PASS++)) || true; }
fail() { echo "[FAIL] $1: $2"; ((FAIL++)) || true; }

check() {
  local label="$1" url="$2" method="${3:-GET}" data="${4:-}" auth="${5:-}"
  local args=(-s -o /tmp/smoke_body -w "%{http_code}" -X "$method" "$url")
  [ -n "$data" ] && args+=(-H "Content-Type: application/json" -d "$data")
  [ -n "$auth" ] && args+=(-H "Authorization: Bearer $auth")
  curl "${args[@]}"
}

extract() {
  node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{ try{ console.log(JSON.parse(d).$1 ?? '') }catch(e){ console.log('') } })" < /tmp/smoke_body
}

echo "=== Voxmation OS API Smoke Test ==="
echo "Target: $BASE"
echo ""

# ── Core routes ─────────────────────────────────────────────────────────────

STATUS=$(check "GET /" "$BASE/")
[ "$STATUS" = "200" ] && ok "GET / returns 200" || fail "GET /" "Expected 200, got $STATUS"

STATUS=$(check "GET /health" "$BASE/health")
[ "$STATUS" = "200" ] && ok "GET /health returns 200" || fail "GET /health" "Expected 200, got $STATUS"

STATUS=$(check "GET /docs" "$BASE/docs")
[ "$STATUS" = "200" ] && ok "GET /docs (Swagger) returns 200" || fail "GET /docs" "Expected 200, got $STATUS"

# ── Auth ─────────────────────────────────────────────────────────────────────

EMAIL="smoketest_$(date +%s)@example.com"
STATUS=$(check "POST /auth/register" "$BASE/auth/register" POST \
  "{\"email\":\"$EMAIL\",\"password\":\"smoketest123\",\"name\":\"Smoke Test\",\"role\":\"ADMIN\"}")
[ "$STATUS" = "201" ] && ok "POST /auth/register returns 201" || fail "POST /auth/register" "Expected 201, got $STATUS"

STATUS=$(check "POST /auth/login" "$BASE/auth/login" POST \
  "{\"email\":\"$EMAIL\",\"password\":\"smoketest123\"}")
[ "$STATUS" = "200" ] && ok "POST /auth/login returns 200" || fail "POST /auth/login" "Expected 200, got $STATUS"

JWT=$(extract "token")
[ -n "$JWT" ] && ok "JWT token returned" || fail "JWT token" "No token in login response"

# ── CRM ──────────────────────────────────────────────────────────────────────

STATUS=$(check "POST /v1/accounts" "$BASE/v1/accounts" POST \
  '{"name":"Smoke Test Corp","domain":"smoketest.com","industry":"Tech"}' "$JWT")
[[ "$STATUS" =~ ^2 ]] && ok "POST /v1/accounts returns 2xx" || fail "POST /v1/accounts" "Expected 2xx, got $STATUS"

ACC_ID=$(extract "id")
[ -n "$ACC_ID" ] && ok "Account ID returned" || fail "Account ID" "No id in create-account response"

STATUS=$(check "GET /v1/accounts" "$BASE/v1/accounts" GET "" "$JWT")
[ "$STATUS" = "200" ] && ok "GET /v1/accounts returns 200" || fail "GET /v1/accounts" "Expected 200, got $STATUS"

STATUS=$(check "POST /v1/leads" "$BASE/v1/leads" POST \
  "{\"accountId\":\"$ACC_ID\",\"source\":\"smoke_test\",\"channel\":\"api\"}" "$JWT")
[[ "$STATUS" =~ ^2 ]] && ok "POST /v1/leads returns 2xx" || fail "POST /v1/leads" "Expected 2xx, got $STATUS"

STATUS=$(check "GET /v1/leads" "$BASE/v1/leads" GET "" "$JWT")
[ "$STATUS" = "200" ] && ok "GET /v1/leads returns 200" || fail "GET /v1/leads" "Expected 200, got $STATUS"

# ── Billing ───────────────────────────────────────────────────────────────────
# Register/login as FINANCE user for billing routes

FINANCE_EMAIL="finance_$(date +%s)@example.com"
curl -s -o /dev/null -X POST "$BASE/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$FINANCE_EMAIL\",\"password\":\"smoketest123\",\"role\":\"FINANCE\"}"
STATUS=$(check "POST /auth/login (finance)" "$BASE/auth/login" POST \
  "{\"email\":\"$FINANCE_EMAIL\",\"password\":\"smoketest123\"}")
FIN_JWT=$(extract "token")

STATUS=$(check "POST /v1/plans" "$BASE/v1/plans" POST \
  '{"name":"Starter","priceCents":9900,"interval":"monthly"}' "$FIN_JWT")
[[ "$STATUS" =~ ^2 ]] && ok "POST /v1/plans returns 2xx" || fail "POST /v1/plans" "Expected 2xx, got $STATUS"

PLAN_ID=$(extract "id")

STATUS=$(check "POST /v1/invoices" "$BASE/v1/invoices" POST \
  "{\"accountId\":\"$ACC_ID\",\"planId\":\"$PLAN_ID\",\"amountCents\":9900}" "$FIN_JWT")
[[ "$STATUS" =~ ^2 ]] && ok "POST /v1/invoices returns 2xx" || fail "POST /v1/invoices" "Expected 2xx, got $STATUS"

# ── Delivery ──────────────────────────────────────────────────────────────────

DELIVERY_EMAIL="delivery_$(date +%s)@example.com"
curl -s -o /dev/null -X POST "$BASE/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$DELIVERY_EMAIL\",\"password\":\"smoketest123\",\"role\":\"DELIVERY\"}"
STATUS=$(check "POST /auth/login (delivery)" "$BASE/auth/login" POST \
  "{\"email\":\"$DELIVERY_EMAIL\",\"password\":\"smoketest123\"}")
DEL_JWT=$(extract "token")

STATUS=$(check "POST /v1/service-catalog" "$BASE/v1/service-catalog" POST \
  '{"name":"Basic Setup","description":"Smoke test catalog","template":{"tasks":[]}}' "$DEL_JWT")
[[ "$STATUS" =~ ^2 ]] && ok "POST /v1/service-catalog returns 2xx" || fail "POST /v1/service-catalog" "Expected 2xx, got $STATUS"

CATALOG_ID=$(extract "id")

STATUS=$(check "POST /v1/service-instances" "$BASE/v1/service-instances" POST \
  "{\"accountId\":\"$ACC_ID\",\"serviceCatalogId\":\"$CATALOG_ID\",\"projectName\":\"Smoke Project\"}" "$DEL_JWT")
[[ "$STATUS" =~ ^2 ]] && ok "POST /v1/service-instances returns 2xx" || fail "POST /v1/service-instances" "Expected 2xx, got $STATUS"

# ── Voice ─────────────────────────────────────────────────────────────────────

STATUS=$(check "POST /v1/calls/outbound" "$BASE/v1/calls/outbound" POST \
  "{\"fromNumber\":\"+15550001111\",\"toNumber\":\"+15550002222\",\"accountId\":\"$ACC_ID\"}" "$JWT")
[[ "$STATUS" =~ ^2 ]] && ok "POST /v1/calls/outbound returns 2xx" || fail "POST /v1/calls/outbound" "Expected 2xx, got $STATUS"

echo ""
echo "=== Results: $PASS passed, $FAIL failed ==="
[ "$FAIL" -eq 0 ] && exit 0 || exit 1
