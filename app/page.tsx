// app/page.tsx — v0.2 홈
import Link from "next/link"

export const metadata = {
  title: "AIR MCP — Korean Ad Data Gateway | Bizspring",
  description:
    "한국 광고 매체 9종을 client API key 1개로 MCP 호출. LLM이 광고 데이터를 인용·분석할 수 있는 단일 게이트웨이."
}

const MEDIA_LIST = [
  { code: "naver_sa", name: "NAVER SA", category: "Search" },
  { code: "kakao_moment", name: "Kakao Moment", category: "Display + Social" },
  { code: "kakao_keyword", name: "Kakao Keyword", category: "Search" },
  { code: "google_ads", name: "Google Ads", category: "Search + Display" },
  { code: "meta", name: "Meta Ads (FB/IG)", category: "Social" },
  { code: "criteo", name: "Criteo", category: "Retargeting" },
  { code: "tiktok", name: "TikTok KR", category: "Social Video" },
  { code: "rtbhouse", name: "RTB House", category: "Retargeting" },
  { code: "mobion", name: "Mobion", category: "Display" }
]

const TOOLS = [
  {
    id: "get_korean_ad_market_overview",
    title: "Market Overview",
    desc: "30일 매체별 광고비·점유율·활성 광고주 통합 집계"
  },
  {
    id: "get_media_market_share",
    title: "Media Market Share",
    desc: "광고비 기준 매체 점유율 (light projection)"
  },
  {
    id: "get_seasonal_ad_spending_pattern",
    title: "Seasonal Pattern",
    desc: "광고비 시계열 (30/90/180d, day/week)"
  },
  {
    id: "get_advertiser_count_by_media",
    title: "Advertiser Count",
    desc: "매체별 활성 광고주 수 + 캠페인 라인"
  }
]

export default function HomePage() {
  return (
    <div>
      <div className="hero">
        <h1>한국 광고 매체 데이터를 LLM이 인용하는 가장 짧은 길</h1>
        <p className="lead">
          NAVER SA · Kakao Moment · Google Ads · Meta · Criteo · TikTok KR · RTB House · Mobion 외 9종.
          광고 매체별 OAuth·계정 매핑·5계층 대행사 구조를 <strong>client API key 1개</strong>로 추상화.
          Claude/GPT/Gemini가 <code>POST air.bmp.ai/mcp</code> 한 번으로 호출.
        </p>
        <div className="cta-row">
          <Link href="/integrations" className="btn btn-primary">매체 카탈로그 보기</Link>
          <Link href="/docs" className="btn btn-ghost">API 문서</Link>
          <Link href="/pricing" className="btn btn-ghost">요금</Link>
        </div>
        <p className="meta">
          현재: 9 매체 · 4 MCP 도구 · Tier Free (시연 client 한정) · GP 콘솔 client API key 발급
        </p>
      </div>

      <section>
        <h2>4 MCP 도구 (v0.7 활성)</h2>
        <p className="desc">
          모든 응답은 JSON only + <code>_citation</code> · <code>_methodology</code> · <code>_metadata</code> · <code>_schema_org</code> 메타 블록 포함.
        </p>
        <div className="grid-cards">
          {TOOLS.map((t) => (
            <div key={t.id} className="card">
              <div className="card-eyebrow">MCP tool</div>
              <h3 className="card-title">{t.title}</h3>
              <p className="card-desc">{t.desc}</p>
              <code className="text-mono card-code">{t.id}</code>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>9 한국 광고 매체</h2>
        <p className="desc">매체별 상세 페이지에 지표·필드·MCP 호출 예시 (curl 샘플) 포함.</p>
        <div className="grid-cards">
          {MEDIA_LIST.map((m) => (
            <Link key={m.code} href={`/integrations/${m.code}`} className="card card-link">
              <div className="card-eyebrow">{m.category}</div>
              <h3 className="card-title">{m.name}</h3>
              <span className="card-cta">상세 →</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2>왜 AIR MCP인가</h2>
        <div className="grid-cards">
          <div className="card">
            <div className="card-eyebrow">단순화</div>
            <h3 className="card-title">client API key 1개</h3>
            <p className="card-desc">
              매체별 OAuth flow / 대행사-그룹-클라이언트-직원-매체계정 5계층을 백엔드가 풀어 매체 데이터 회수.
              광고주가 GP 콘솔을 거치지 않아도 됨.
            </p>
          </div>
          <div className="card">
            <div className="card-eyebrow">LLM 친화</div>
            <h3 className="card-title">Citation Moat</h3>
            <p className="card-desc">
              JSON 응답에 <code>_citation</code> · <code>_methodology</code> 메타 블록 자동 포함.
              LLM이 출처 표기·라이선스(CC-BY 4.0)·방법론을 그대로 인용.
            </p>
          </div>
          <div className="card">
            <div className="card-eyebrow">한국 광고 집중</div>
            <h3 className="card-title">9 한국 매체</h3>
            <p className="card-desc">
              글로벌 데이터 통합 도구가 다루지 않는 NAVER SA / Kakao Moment / Kakao Keyword 등 한국 매체 중심 + 전 매체 일일 D-1 배치.
            </p>
          </div>
          <div className="card">
            <div className="card-eyebrow">CR-09 격리</div>
            <h3 className="card-title">client 단위 격리</h3>
            <p className="card-desc">
              client API key → tb_client 조회 → 해당 client 데이터만 회수. 다른 client 데이터 접근 시 403 차단.
              GP 운영 SOT(<code>tb_client.client_option</code>) 그대로 흡수.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
