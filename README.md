# bmp-ai-air

**AIR Copilot Tier 1** — 한국 디지털 광고 시장 통합 데이터 게이트웨이.

- 도메인: https://air.bmp.ai
- 소속: BIZACTIONER 방 / Track K
- 본방 단독 운영 (AIR 운영팀·DATA_ENG·GP 앱 팀 협의 ❌)

## 데이터 소스

Supabase EF `air-llm-mcp-v2` → ES bizspring-es `bmp_media_v1`

## 활성 도구 (Tier 1, anonymous)

1. `get_korean_ad_market_overview` — 30일 매체별 광고비 + 점유율
2. `get_media_market_share` — 매체 점유율 light
3. `get_seasonal_ad_spending_pattern` — 시즌 추이 (30d/90d/180d)
4. `get_advertiser_count_by_media` — 매체별 활성 광고주 수

## 빌드

```bash
npm install
npm run build
npm start
```

## 환경변수

- `AIR_LLM_MCP_URL` — Supabase EF endpoint
- `AIR_LLM_MCP_KEY` — Supabase anon JWT
