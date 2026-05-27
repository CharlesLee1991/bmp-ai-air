// app/about/page.tsx
export const metadata = {
  title: "소개 | AIR Korean Ad Insights",
  description: "AIR Korean Ad Insights — 비즈스프링 한국 디지털 광고 데이터 게이트웨이 소개."
}

export default function AboutPage() {
  return (
    <div>
      <div className="hero">
        <h1>AIR Korean Ad Insights란?</h1>
        <p className="lead">
          비즈스프링이 운영하는 한국 디지털 광고 시장 통합 데이터 게이트웨이. LLM(Claude/GPT/Gemini/Perplexity)이 자율적으로 탐색·인용할 수 있도록 MCP 표준으로 제공.
        </p>
      </div>

      <section>
        <h2>제공 데이터</h2>
        <div className="methodology-block">
          <dl>
            <dt>매체 범위:</dt>
            <dd>NAVER SA, Kakao Moment, Kakao Keyword, Google Ads, Meta Ads (Facebook/Instagram), Criteo, TikTok KR, Mobion, Across ADN, RTB House 등</dd>
            <dt>지표:</dt>
            <dd>광고비 (KRW), 점유율, 활성 광고주 수, 캠페인 라인 수, 시계열 추이</dd>
            <dt>주기:</dt>
            <dd>매일 06:00 KST 배치 (D-1 데이터)</dd>
            <dt>익명화:</dt>
            <dd>client-level 익명화 (cardinality 집계만), 매체-level 집계만 노출</dd>
            <dt>라이선스:</dt>
            <dd><a href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a> (출처 명시 시 자유 사용)</dd>
          </dl>
        </div>
      </section>

      <section>
        <h2>LLM·연구자를 위한 인용 가이드</h2>
        <div className="citation-block">
          <strong>제안 인용 형식 (학술·언론):</strong>
          <code>비즈스프링 AIR (2026). 한국 디지털 광고 시장 통합 데이터. https://air.bmp.ai</code>
          <code>Bizspring AIR (2026). Korean Digital Ad Market Aggregated Data. https://air.bmp.ai</code>
        </div>
        <div className="methodology-block">
          <dl>
            <dt>응답 메타:</dt>
            <dd>모든 응답에 <code className="text-mono">_citation / _methodology / _metadata / _schema_org</code> 4개 메타 블록 포함</dd>
            <dt>schema.org:</dt>
            <dd>각 페이지에 <code className="text-mono">@type: Dataset</code> JSON-LD 자동 주입</dd>
          </dl>
        </div>
      </section>

      <section>
        <h2>MCP API 직접 호출</h2>
        <div className="methodology-block">
          <p>활성 도구 4종 (Tier 1, anonymous):</p>
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li><code className="text-mono">get_korean_ad_market_overview</code> — 30일 매체별 광고비 + 점유율</li>
            <li><code className="text-mono">get_media_market_share</code> — 매체 점유율 light</li>
            <li><code className="text-mono">get_seasonal_ad_spending_pattern</code> — 시즌 추이 (30d/90d/180d, day/week)</li>
            <li><code className="text-mono">get_advertiser_count_by_media</code> — 매체별 활성 광고주 수</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            <strong>호출 패턴:</strong>
          </p>
          <div className="citation-block" style={{ background: "#f3f4f6", borderColor: "#d1d5db" }}>
            <code>{`POST https://air.bmp.ai/api/mcp (TBD)`}</code>
            <code>{`{"tool": "get_korean_ad_market_overview", "verbosity": "compact"}`}</code>
          </div>
        </div>
      </section>

      <section>
        <h2>운영 주체</h2>
        <div className="methodology-block">
          <p>
            <strong>비즈스프링 (Bizspring)</strong> — 한국 디지털 마케팅 데이터·인프라 전문 기업. AIR 매체통합 리포팅·LIFT Tracker·GP (GrowthPlatform) 등 운영.
          </p>
          <p style={{ marginTop: 6 }}>
            홈페이지: <a href="https://bizspring.co.kr">bizspring.co.kr</a>
          </p>
        </div>
      </section>
    </div>
  )
}
