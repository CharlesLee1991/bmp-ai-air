// app/integrations/[media]/page.tsx — 매체별 상세 (schema only, Q3=C)
import Link from "next/link"
import { notFound } from "next/navigation"

interface MediaDetail {
  code: string
  name: string
  category: string
  publisher: string
  desc: string
  metrics: string[]
  responseFields: { field: string; type: string; desc: string }[]
  refresh: string
}

const MEDIA_MAP: Record<string, MediaDetail> = {
  naver_sa: {
    code: "naver_sa", name: "NAVER SA", category: "Search", publisher: "NAVER",
    desc: "네이버 검색 광고 (키워드·파워링크). 한국 검색 시장 1위 매체. 키워드 단위 입찰·매칭타입·캠페인 그룹 구조.",
    metrics: ["광고비 (KRW)", "노출수", "클릭수", "CTR", "CPC", "전환수", "전환액", "캠페인 라인 수", "활성 키워드 수"],
    responseFields: [
      { field: "spend_krw", type: "number", desc: "30일 광고비 (KRW, integer)" },
      { field: "impressions", type: "number", desc: "노출수" },
      { field: "clicks", type: "number", desc: "클릭수" },
      { field: "ctr", type: "number", desc: "CTR (%)" },
      { field: "campaign_count", type: "number", desc: "활성 캠페인 라인 수" },
      { field: "distinct_keywords", type: "number", desc: "활성 키워드 수" }
    ],
    refresh: "Daily 06:00 KST (D-1)"
  },
  kakao_moment: {
    code: "kakao_moment", name: "Kakao Moment", category: "Display + Social", publisher: "Kakao",
    desc: "카카오톡 비즈보드 + 디스플레이 + 동영상 광고. 한국 메신저 1위 트래픽. 디바이스·관심사·리타겟팅 타깃팅.",
    metrics: ["광고비 (KRW)", "노출수", "클릭수", "CTR", "CPM", "전환수", "비즈보드 ↔ 디스플레이 ↔ 동영상 분리"],
    responseFields: [
      { field: "spend_krw", type: "number", desc: "광고비" },
      { field: "impressions", type: "number", desc: "노출수" },
      { field: "clicks", type: "number", desc: "클릭수" },
      { field: "ctr", type: "number", desc: "CTR (%)" },
      { field: "ad_format_breakdown", type: "object", desc: "비즈보드/디스플레이/동영상 split" }
    ],
    refresh: "Daily 06:00 KST (D-1)"
  },
  kakao_keyword: {
    code: "kakao_keyword", name: "Kakao Keyword", category: "Search", publisher: "Kakao",
    desc: "다음(Daum) 검색 키워드 광고. NAVER SA와 유사 구조.",
    metrics: ["광고비", "노출수", "클릭수", "CTR", "CPC", "전환수", "키워드 매칭타입"],
    responseFields: [
      { field: "spend_krw", type: "number", desc: "광고비" },
      { field: "impressions", type: "number", desc: "노출수" },
      { field: "clicks", type: "number", desc: "클릭수" },
      { field: "ctr", type: "number", desc: "CTR (%)" }
    ],
    refresh: "Daily 06:00 KST (D-1)"
  },
  google_ads: {
    code: "google_ads", name: "Google Ads", category: "Search + Display + Video", publisher: "Google",
    desc: "Google Search / Performance Max / Display / YouTube 광고. customer_id 단위 다중 캠페인.",
    metrics: ["광고비 (KRW 환산)", "노출수", "클릭수", "CTR", "CPC", "전환수", "전환액", "Search / PMax / Display / Video 분리"],
    responseFields: [
      { field: "spend_krw", type: "number", desc: "광고비 (KRW, integer, 환율 D-1 기준)" },
      { field: "impressions", type: "number", desc: "노출수" },
      { field: "clicks", type: "number", desc: "클릭수" },
      { field: "campaign_type_breakdown", type: "object", desc: "캠페인 유형별 split" }
    ],
    refresh: "Daily 06:00 KST (D-1)"
  },
  meta: {
    code: "meta", name: "Meta Ads (FB / IG)", category: "Social", publisher: "Meta",
    desc: "Facebook + Instagram 광고. 광고 세트 단위 입찰·예산·타깃팅.",
    metrics: ["광고비", "노출수", "도달수 (unique reach)", "클릭수", "CTR", "CPM", "전환수", "광고 세트 수"],
    responseFields: [
      { field: "spend_krw", type: "number", desc: "광고비" },
      { field: "impressions", type: "number", desc: "노출수" },
      { field: "reach", type: "number", desc: "도달 (unique)" },
      { field: "clicks", type: "number", desc: "클릭수" },
      { field: "platform_breakdown", type: "object", desc: "FB / IG split" }
    ],
    refresh: "Daily 06:00 KST (D-1)"
  },
  criteo: {
    code: "criteo", name: "Criteo", category: "Retargeting", publisher: "Criteo",
    desc: "리타겟팅·다이내믹 리마케팅. 상품 피드 + 머신러닝 입찰.",
    metrics: ["광고비", "노출수", "클릭수", "CTR", "CPC", "전환수", "전환액", "매칭 광고주 수"],
    responseFields: [
      { field: "spend_krw", type: "number", desc: "광고비" },
      { field: "impressions", type: "number", desc: "노출수" },
      { field: "clicks", type: "number", desc: "클릭수" },
      { field: "feed_matching_rate", type: "number", desc: "피드 매칭률 (%)" }
    ],
    refresh: "Daily 06:00 KST (D-1)"
  },
  tiktok: {
    code: "tiktok", name: "TikTok KR", category: "Social Video", publisher: "TikTok",
    desc: "TikTok 한국 광고. 영상 광고 + 인플루언서 연동.",
    metrics: ["광고비", "노출수", "조회수", "CTR", "VTR (Video Through Rate)", "전환수"],
    responseFields: [
      { field: "spend_krw", type: "number", desc: "광고비" },
      { field: "impressions", type: "number", desc: "노출수" },
      { field: "video_views", type: "number", desc: "동영상 조회수" },
      { field: "vtr", type: "number", desc: "VTR (%)" }
    ],
    refresh: "Daily 06:00 KST (D-1)"
  },
  rtbhouse: {
    code: "rtbhouse", name: "RTB House", category: "Retargeting", publisher: "RTB House",
    desc: "딥러닝 기반 리타겟팅 DSP. CPA 보장형 입찰.",
    metrics: ["광고비", "노출수", "클릭수", "CTR", "CPC", "전환수", "ROAS"],
    responseFields: [
      { field: "spend_krw", type: "number", desc: "광고비" },
      { field: "impressions", type: "number", desc: "노출수" },
      { field: "clicks", type: "number", desc: "클릭수" }
    ],
    refresh: "Daily 06:00 KST (D-1)"
  },
  mobion: {
    code: "mobion", name: "Mobion", category: "Display", publisher: "Mobion",
    desc: "한국 디스플레이 네트워크.",
    metrics: ["광고비", "노출수", "클릭수", "CTR", "CPM"],
    responseFields: [
      { field: "spend_krw", type: "number", desc: "광고비" },
      { field: "impressions", type: "number", desc: "노출수" },
      { field: "clicks", type: "number", desc: "클릭수" }
    ],
    refresh: "Daily 06:00 KST (D-1)"
  }
}

export function generateStaticParams() {
  return Object.keys(MEDIA_MAP).map((media) => ({ media }))
}

export function generateMetadata({ params }: { params: { media: string } }) {
  const m = MEDIA_MAP[params.media]
  if (!m) return { title: "Not Found" }
  return {
    title: `${m.name} — Integration | AIR MCP`,
    description: `${m.name} 광고 데이터 MCP 호출 가이드. 지표: ${m.metrics.slice(0, 3).join(", ")} 외. ${m.refresh}.`
  }
}

export default function MediaDetailPage({ params }: { params: { media: string } }) {
  const m = MEDIA_MAP[params.media]
  if (!m) notFound()

  const curlSample = `curl -X POST https://air.bmp.ai/mcp \\
  -H "Authorization: Bearer YOUR_CLIENT_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tool": "get_korean_ad_market_overview",
    "filter": { "media": "${m.code}" },
    "verbosity": "compact"
  }'`

  const responseSchema = `{
  "data": {
    "media": "${m.name}",
    "code": "${m.code}",
    "period": { "start": "YYYY-MM-DD", "end": "YYYY-MM-DD", "days": 30 },
${m.responseFields.map((f) => `    "${f.field}": <${f.type}>`).join(",\n")}
  },
  "_citation": {
    "suggested_citation_ko": "비즈스프링 AIR (2026). ${m.name} 광고 데이터. https://air.bmp.ai",
    "license": "CC-BY 4.0",
    "data_authority": "Bizspring"
  },
  "_methodology": {
    "data_source": "${m.name} 공식 API → Bizspring AIR 배치",
    "aggregation": "client 단위 집계 (CR-09 격리)",
    "batch_schedule": "${m.refresh}"
  },
  "_metadata": {
    "tool": "get_korean_ad_market_overview",
    "tier": "free | basic | standard | plus | professional | enterprise",
    "version": "v0.7"
  }
}`

  return (
    <div>
      <div className="hero hero-compact">
        <div className="breadcrumb">
          <Link href="/integrations">← Integrations</Link>
        </div>
        <h1>{m.name}</h1>
        <p className="lead">{m.desc}</p>
        <div className="meta-row">
          <span className="badge">{m.category}</span>
          <span className="text-muted">{m.publisher}</span>
          <span className="text-muted">·</span>
          <span className="text-muted">{m.refresh}</span>
        </div>
      </div>

      <section>
        <h2>제공 지표</h2>
        <ul className="bullet-list">
          {m.metrics.map((mt) => (<li key={mt}>{mt}</li>))}
        </ul>
      </section>

      <section>
        <h2>응답 필드 (Schema)</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>필드</th>
              <th>타입</th>
              <th>설명</th>
            </tr>
          </thead>
          <tbody>
            {m.responseFields.map((f) => (
              <tr key={f.field}>
                <td><code className="text-mono">{f.field}</code></td>
                <td className="text-muted">{f.type}</td>
                <td className="text-muted">{f.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>MCP 호출 예시 (curl)</h2>
        <pre className="code-block"><code>{curlSample}</code></pre>
        <p className="desc">
          <code>YOUR_CLIENT_API_KEY</code> = GP 콘솔에서 발급받는 client API key.
          하나의 키로 client에 연결된 모든 매체 데이터 회수 (5계층 추상화).
        </p>
      </section>

      <section>
        <h2>응답 Schema 예시</h2>
        <pre className="code-block"><code>{responseSchema}</code></pre>
        <p className="desc">
          실데이터는 호출 시점에 반환. 이 페이지에는 schema만 표시 (사이트는 정적, 실데이터 없음).
        </p>
      </section>

      <section>
        <h2>다음 단계</h2>
        <div className="cta-row">
          <Link href="/docs" className="btn btn-primary">전체 API 문서</Link>
          <Link href="/pricing" className="btn btn-ghost">요금 보기</Link>
          <Link href="/contact" className="btn btn-ghost">client API key 발급 문의</Link>
        </div>
      </section>
    </div>
  )
}
