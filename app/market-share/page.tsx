// app/market-share/page.tsx
import { callAirMcp, fmtKRW, fmtPct } from "@/lib/air-mcp"

interface MarketShareData {
  period: { start: string; end: string; days: number }
  total_spend_krw: number
  currency: string
  media_share: Array<{
    rank: number
    media_official_code: string
    media_name_ko: string
    media_name_en: string
    share_pct: number
    spend_krw: number
  }>
}

export const revalidate = 3600
export const metadata = {
  title: "매체 점유율 | AIR Korean Ad Insights",
  description: "한국 디지털 광고 매체별 점유율 — NAVER SA, Google, Kakao 등 30일 기준."
}

export default async function MarketSharePage() {
  let result
  try {
    result = await callAirMcp<MarketShareData>({
      tool: "get_media_market_share"
    })
  } catch (e) {
    return <div className="error-block">데이터 조회 실패: {(e as Error).message}</div>
  }
  const { data, _citation, _metadata } = result
  const maxShare = data.media_share[0]?.share_pct ?? 100

  return (
    <div>
      <div className="hero">
        <h1>한국 광고 매체 점유율</h1>
        <p className="lead">광고비 기준 매체별 점유율 (light projection). 단일 비교 시나리오에 최적화.</p>
        <p className="meta">
          기간: {data.period.start} ~ {data.period.end} ({data.period.days}일) · 총 시장: {fmtKRW(data.total_spend_krw)}
        </p>
      </div>

      <section>
        <h2>매체별 점유율</h2>
        <p className="desc">전체 {data.media_share.length}개 매체를 광고비 기준 내림차순으로 정렬.</p>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>Rank</th>
              <th>매체 (KO)</th>
              <th>Media (EN)</th>
              <th>Official Code</th>
              <th className="right">광고비 (KRW)</th>
              <th className="right" style={{ minWidth: 200 }}>점유율</th>
            </tr>
          </thead>
          <tbody>
            {data.media_share.map((row) => (
              <tr key={row.media_official_code}>
                <td><span className="rank-badge">{row.rank}</span></td>
                <td><strong>{row.media_name_ko}</strong></td>
                <td className="text-muted">{row.media_name_en}</td>
                <td className="text-mono text-muted">{row.media_official_code}</td>
                <td className="right">{row.spend_krw.toLocaleString("ko-KR")}</td>
                <td className="right">
                  <span
                    className="bar"
                    style={{ width: `${(row.share_pct / maxShare) * 180}px` }}
                    aria-hidden
                  />
                  <strong>{fmtPct(row.share_pct)}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>인용</h2>
        <div className="citation-block">
          <div><strong>KO:</strong></div>
          <code>{_citation.suggested_citation_ko}</code>
          <div style={{ marginTop: 12 }}><strong>EN:</strong></div>
          <code>{_citation.suggested_citation_en}</code>
          <div style={{ marginTop: 12 }}>
            도구: <code>{_metadata.tool}</code> · 라이선스: {_citation.license}
          </div>
        </div>
      </section>
    </div>
  )
}
