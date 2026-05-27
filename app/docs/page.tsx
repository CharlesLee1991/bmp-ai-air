// app/docs/page.tsx — API 문서
import Link from "next/link"

export const metadata = {
  title: "Docs — API 문서 | AIR MCP",
  description: "AIR MCP 4 도구 명세 + 인증 (client API key) + rate limit + 응답 schema."
}

export default function DocsPage() {
  const authSample = `Authorization: Bearer YOUR_CLIENT_API_KEY
Content-Type: application/json`

  const overviewSample = `POST https://air.bmp.ai/mcp
{
  "tool": "get_korean_ad_market_overview",
  "verbosity": "compact" | "full",
  "filter": { "media": "naver_sa" }   // optional
}`

  const shareSample = `POST https://air.bmp.ai/mcp
{
  "tool": "get_media_market_share"
}`

  const seasonalSample = `POST https://air.bmp.ai/mcp
{
  "tool": "get_seasonal_ad_spending_pattern",
  "period": "30d" | "90d" | "180d",
  "granularity": "day" | "week"
}`

  const advertiserSample = `POST https://air.bmp.ai/mcp
{
  "tool": "get_advertiser_count_by_media",
  "verbosity": "compact" | "full"
}`

  return (
    <div>
      <div className="hero hero-compact">
        <h1>AIR MCP — API 문서</h1>
        <p className="lead">
          4 MCP 도구 명세 + 인증 + rate limit + 응답 schema. v0.7 ACTIVE.
        </p>
      </div>

      <section>
        <h2>1. 인증 — client API key</h2>
        <div className="methodology-block">
          <p>모든 호출에 <strong>client API key</strong> 필수 (Bearer 헤더).</p>
          <pre className="code-block"><code>{authSample}</code></pre>
          <dl style={{ marginTop: 12 }}>
            <dt>발급:</dt>
            <dd>GP 콘솔 (<code>tb_client.client_option.api</code>) — 광고주별 단일 키, 만료일 별도 관리.</dd>
            <dt>격리:</dt>
            <dd>키 → tb_client 조회 → 해당 client_seq 데이터만 반환. 다른 client 접근 시 <code>403 Forbidden</code>.</dd>
            <dt>발급 문의:</dt>
            <dd><Link href="/contact">/contact</Link> 또는 GP 콘솔 운영팀.</dd>
          </dl>
        </div>
      </section>

      <section>
        <h2>2. Rate Limit</h2>
        <table className="data-table">
          <thead>
            <tr><th>Tier</th><th>월간 호출</th><th>분당</th><th>일당</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Free</strong></td><td>1,000</td><td>10</td><td>100</td></tr>
            <tr><td><strong>Basic</strong></td><td>10,000</td><td>30</td><td>500</td></tr>
            <tr><td><strong>Standard</strong></td><td>50,000</td><td>60</td><td>2,000</td></tr>
            <tr><td><strong>Plus</strong></td><td>200,000</td><td>120</td><td>10,000</td></tr>
            <tr><td><strong>Professional</strong></td><td>1,000,000</td><td>500</td><td>50,000</td></tr>
            <tr><td><strong>Enterprise</strong></td><td>∞</td><td>커스텀</td><td>커스텀</td></tr>
          </tbody>
        </table>
        <p className="desc">초과 시 <code>429 Too Many Requests</code> + Retry-After 헤더.</p>
      </section>

      <section>
        <h2>3. MCP 도구 4종 (v0.7 ACTIVE)</h2>

        <div className="doc-block">
          <h3><code className="text-mono">get_korean_ad_market_overview</code> <span className="badge">default</span></h3>
          <p className="desc">30일 매체별 광고비 + share + distinct_clients 통합.</p>
          <pre className="code-block"><code>{overviewSample}</code></pre>
        </div>

        <div className="doc-block">
          <h3><code className="text-mono">get_media_market_share</code></h3>
          <p className="desc">광고비 기준 매체 점유율 (light projection: share_pct + rank).</p>
          <pre className="code-block"><code>{shareSample}</code></pre>
        </div>

        <div className="doc-block">
          <h3><code className="text-mono">get_seasonal_ad_spending_pattern</code></h3>
          <p className="desc">광고비 시계열. period (30d/90d/180d) × granularity (day/week).</p>
          <pre className="code-block"><code>{seasonalSample}</code></pre>
        </div>

        <div className="doc-block">
          <h3><code className="text-mono">get_advertiser_count_by_media</code></h3>
          <p className="desc">매체별 활성 광고주 수 (distinct_clients + rank). full 모드는 program_count 포함.</p>
          <pre className="code-block"><code>{advertiserSample}</code></pre>
        </div>
      </section>

      <section>
        <h2>4. 응답 메타 블록</h2>
        <div className="methodology-block">
          <dl>
            <dt><code className="text-mono">_citation</code></dt>
            <dd>제안 인용 형식 (KO/EN) + 라이선스 (CC-BY 4.0) + data_authority</dd>
            <dt><code className="text-mono">_methodology</code></dt>
            <dd>data_source · aggregation · anonymization · batch_schedule · cardinality_method</dd>
            <dt><code className="text-mono">_metadata</code></dt>
            <dd>tool · tier · version · client_id (격리 검증용 echo)</dd>
            <dt><code className="text-mono">_schema_org</code></dt>
            <dd>schema.org Dataset JSON-LD (LLM 인용 friendly)</dd>
          </dl>
        </div>
      </section>

      <section>
        <h2>5. 오류 코드</h2>
        <table className="data-table">
          <thead>
            <tr><th>코드</th><th>의미</th><th>처리</th></tr>
          </thead>
          <tbody>
            <tr><td><code>401 Unauthorized</code></td><td>API key 누락 또는 만료</td><td>GP 콘솔에서 키 재발급</td></tr>
            <tr><td><code>403 Forbidden</code></td><td>다른 client 데이터 접근 시도 (CR-09 격리)</td><td>본인 client_seq 확인</td></tr>
            <tr><td><code>404 Not Found</code></td><td>존재하지 않는 tool</td><td>tool 명칭 확인</td></tr>
            <tr><td><code>422 Unprocessable</code></td><td>잘못된 파라미터</td><td>schema 참조</td></tr>
            <tr><td><code>429 Too Many Requests</code></td><td>rate limit 초과</td><td>Retry-After 헤더 대기 또는 tier 업그레이드</td></tr>
            <tr><td><code>500 Internal</code></td><td>서버 오류</td><td>30초 후 재시도, 지속 시 문의</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>6. 다음 단계</h2>
        <div className="cta-row">
          <Link href="/integrations" className="btn btn-primary">9 매체 카탈로그</Link>
          <Link href="/pricing" className="btn btn-ghost">요금</Link>
          <Link href="/contact" className="btn btn-ghost">API key 발급 문의</Link>
        </div>
      </section>
    </div>
  )
}
