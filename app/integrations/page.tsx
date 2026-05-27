// app/integrations/page.tsx — 매체 카탈로그
import Link from "next/link"

export const metadata = {
  title: "Integrations — 9 한국 광고 매체 | AIR MCP",
  description:
    "한국 광고 매체 9종 카탈로그 — NAVER SA, Kakao Moment, Kakao Keyword, Google Ads, Meta, Criteo, TikTok KR, RTB House, Mobion. 매체별 지표·MCP 호출 예시."
}

const MEDIA = [
  {
    code: "naver_sa",
    name: "NAVER SA",
    category: "Search",
    publisher: "NAVER",
    desc: "네이버 검색 광고 (키워드·파워링크). 한국 검색 시장 1위 매체.",
    refresh: "Daily (06:00 KST)"
  },
  {
    code: "kakao_moment",
    name: "Kakao Moment",
    category: "Display + Social",
    publisher: "Kakao",
    desc: "카카오톡 비즈보드 + 디스플레이 + 동영상. 한국 메신저 1위 트래픽.",
    refresh: "Daily (06:00 KST)"
  },
  {
    code: "kakao_keyword",
    name: "Kakao Keyword",
    category: "Search",
    publisher: "Kakao",
    desc: "카카오 키워드 광고 (다음 검색).",
    refresh: "Daily (06:00 KST)"
  },
  {
    code: "google_ads",
    name: "Google Ads",
    category: "Search + Display + Video",
    publisher: "Google",
    desc: "Google Search / PMax / Display / YouTube 광고. 글로벌 1위.",
    refresh: "Daily (06:00 KST)"
  },
  {
    code: "meta",
    name: "Meta Ads (FB / IG)",
    category: "Social",
    publisher: "Meta",
    desc: "Facebook / Instagram 광고. 광고 세트 단위 지표.",
    refresh: "Daily (06:00 KST)"
  },
  {
    code: "criteo",
    name: "Criteo",
    category: "Retargeting",
    publisher: "Criteo",
    desc: "리타겟팅·다이내믹 리마케팅. 상품 피드 기반.",
    refresh: "Daily (06:00 KST)"
  },
  {
    code: "tiktok",
    name: "TikTok KR",
    category: "Social Video",
    publisher: "TikTok",
    desc: "TikTok 한국 광고. 영상 광고·인플루언서 연동.",
    refresh: "Daily (06:00 KST)"
  },
  {
    code: "rtbhouse",
    name: "RTB House",
    category: "Retargeting",
    publisher: "RTB House",
    desc: "딥러닝 기반 리타겟팅 DSP.",
    refresh: "Daily (06:00 KST)"
  },
  {
    code: "mobion",
    name: "Mobion",
    category: "Display",
    publisher: "Mobion",
    desc: "한국 디스플레이 네트워크.",
    refresh: "Daily (06:00 KST)"
  }
]

export default function IntegrationsPage() {
  return (
    <div>
      <div className="hero hero-compact">
        <h1>Integrations — 9 한국 광고 매체</h1>
        <p className="lead">
          매체 1개 = 1 페이지. 지표·필드·MCP 호출 예시(curl 샘플)·응답 schema 포함.
        </p>
        <p className="meta">
          모든 매체 = <strong>일일 D-1 배치</strong> 갱신. client API key 1개로 호출.
        </p>
      </div>

      <section>
        <div className="grid-cards">
          {MEDIA.map((m) => (
            <Link key={m.code} href={`/integrations/${m.code}`} className="card card-link">
              <div className="card-eyebrow">{m.category}</div>
              <h3 className="card-title">{m.name}</h3>
              <p className="card-desc">{m.desc}</p>
              <div className="card-meta">
                <span className="text-muted">{m.publisher}</span>
                <span className="text-muted">·</span>
                <span className="text-muted">{m.refresh}</span>
              </div>
              <span className="card-cta">호출 예시 →</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2>매체별 통합 비교</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>매체</th>
              <th>카테고리</th>
              <th>사업자</th>
              <th>갱신 주기</th>
            </tr>
          </thead>
          <tbody>
            {MEDIA.map((m) => (
              <tr key={m.code}>
                <td>
                  <Link href={`/integrations/${m.code}`}>
                    <strong>{m.name}</strong>
                  </Link>
                </td>
                <td className="text-muted">{m.category}</td>
                <td className="text-muted">{m.publisher}</td>
                <td className="text-muted">{m.refresh}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
