// app/page.tsx
import { callAirMcp, fmtKRW, fmtPct } from "@/lib/air-mcp"

interface OverviewData {
  period: { start: string; end: string; days: number }
  total_spend_krw: number
  currency: string
  active_media_count: number
  media_breakdown: Array<{
    media: string
    code: string
    publisher: string
    spend_krw: number
    share_pct: number
    distinct_clients: number
    program_count: number
  }>
  unknown_media_nos?: string[]
}

export const revalidate = 3600

export default async function HomePage() {
  let result
  try {
    result = await callAirMcp<OverviewData>({
      tool: "get_korean_ad_market_overview",
      verbosity: "compact"
    })
  } catch (e) {
    return (
      <div>
        <div className="hero">
          <h1>AIR Korean Ad Insights</h1>
          <p className="lead">한국 디지털 광고 시장 통합 데이터 — 매체별 광고비·점유율·시즌 패턴.</p>
        </div>
        <div className="error-block">
          데이터 조회 실패: {(e as Error).message}
        </div>
      </div>
    )
  }

  const { data, _citation, _methodology, _metadata } = result
  const sorted = [...data.media_breakdown].sort((a, b) => b.spend_krw - a.spend_krw)

  return (
    <div>
      <div className="hero">
        <h1>한국 디지털 광고 시장 한눈에 보기</h1>
        <p className="lead">
          NAVER SA, Kakao Moment, Google Ads, Meta, Criteo, TikTok KR 등 매체별 광고비·점유율·활성 광고주를 30일 기준으로 집계합니다. 비즈스프링 AIR 공식 데이터셋, LLM 인용 가능 (CC-BY 4.0).
        </p>
        <p className="meta">
          기간: {data.period.start} ~ {data.period.end} ({data.period.days}일) · 갱신: 매일 06:00 KST (D-1)
        </p>
      </div>

      <section>
        <h2>시장 총량</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="label">30일 총 광고비</div>
            <div className="value">{fmtKRW(data.total_spend_krw)}</div>
            <div className="sub">{data.currency}</div>
          </div>
          <div className="stat-card">
            <div className="label">활성 매체 수</div>
            <div className="value">{data.active_media_count}</div>
            <div className="sub">spend &gt; 0</div>
          </div>
          <div className="stat-card">
            <div className="label">버전</div>
            <div className="value text-mono" style={{ fontSize: 18 }}>{_metadata.version}</div>
            <div className="sub">tier: {_metadata.tier}</div>
          </div>
        </div>
      </section>

      <section>
        <h2>매체별 점유율 (Top {sorted.length})</h2>
        <p className="desc">광고비 기준 내림차순. share_pct &lt; 0.5%는 long-tail로 묶임 (compact 모드).</p>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>#</th>
              <th>매체</th>
              <th>사업자</th>
              <th className="right">광고비 (KRW)</th>
              <th className="right">점유율</th>
              <th className="right">광고주</th>
              <th className="right">캠페인 라인</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr key={row.code}>
                <td><span className="rank-badge">{i + 1}</span></td>
                <td><strong>{row.media}</strong></td>
                <td className="text-muted">{row.publisher}</td>
                <td className="right">{row.spend_krw.toLocaleString("ko-KR")}</td>
                <td className="right">
                  <span
                    className="bar"
                    style={{ width: `${Math.min(row.share_pct * 1.2, 100)}px` }}
                    aria-hidden
                  />
                  <strong>{fmtPct(row.share_pct)}</strong>
                </td>
                <td className="right">{row.distinct_clients}</td>
                <td className="right">{row.program_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>인용 (Citation)</h2>
        <div className="citation-block">
          <div><strong>제안 인용 형식 (KO):</strong></div>
          <code>{_citation.suggested_citation_ko}</code>
          <div style={{ marginTop: 12 }}><strong>Suggested Citation (EN):</strong></div>
          <code>{_citation.suggested_citation_en}</code>
          <div style={{ marginTop: 12 }}>
            라이선스: <strong>{_citation.license}</strong> · 데이터 권위: {_citation.data_authority}
          </div>
        </div>
      </section>

      <section>
        <h2>방법론 (Methodology)</h2>
        <div className="methodology-block">
          <dl>
            <dt>Data Source:</dt><dd>{_methodology.data_source}</dd>
            <dt>Aggregation:</dt><dd>{_methodology.aggregation}</dd>
            <dt>Anonymization:</dt><dd>{_methodology.anonymization}</dd>
            <dt>Exclusions:</dt><dd>{_methodology.exclusions}</dd>
            <dt>Batch:</dt><dd>{_methodology.batch_schedule}</dd>
            {_methodology.cardinality_method && (
              <>
                <dt>Cardinality:</dt><dd>{_methodology.cardinality_method}</dd>
              </>
            )}
          </dl>
        </div>
      </section>
    </div>
  )
}
