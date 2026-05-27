// app/advertisers/page.tsx
import { callAirMcp } from "@/lib/air-mcp"

interface AdvertiserData {
  period: { start: string; end: string; days: number }
  active_media_count: number
  total_advertiser_seats: number
  media_advertiser_count: Array<{
    rank: number
    media_official_code: string
    media_name_ko: string
    media_name_en: string
    distinct_clients: number
    program_count?: number
  }>
  note?: string
}

export const revalidate = 3600
export const metadata = {
  title: "광고주 수 | AIR Korean Ad Insights",
  description: "한국 디지털 광고 매체별 활성 광고주 수 — 30일 기준 cardinality 집계."
}

export default async function AdvertisersPage() {
  let result
  try {
    result = await callAirMcp<AdvertiserData>({
      tool: "get_advertiser_count_by_media",
      verbosity: "full"
    })
  } catch (e) {
    return <div className="error-block">데이터 조회 실패: {(e as Error).message}</div>
  }
  const { data, _citation, _methodology, _metadata } = result
  const maxClients = data.media_advertiser_count[0]?.distinct_clients ?? 1

  return (
    <div>
      <div className="hero">
        <h1>한국 광고 매체 활성 광고주 수</h1>
        <p className="lead">30일 동안 각 매체에 광고를 집행한 distinct client 수 — Elasticsearch cardinality 집계.</p>
        <p className="meta">
          기간: {data.period.start} ~ {data.period.end} ({data.period.days}일) · 활성 매체: {data.active_media_count}개
        </p>
      </div>

      <section>
        <h2>매체별 광고주 수</h2>
        <p className="desc">광고주 수 기준 내림차순. program_count = 해당 매체 내 광고 program 수.</p>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>Rank</th>
              <th>매체</th>
              <th>Code</th>
              <th className="right">광고주 (distinct_clients)</th>
              <th className="right">Program 수</th>
              <th style={{ minWidth: 200 }}>비율</th>
            </tr>
          </thead>
          <tbody>
            {data.media_advertiser_count.map((row) => (
              <tr key={row.media_official_code}>
                <td><span className="rank-badge">{row.rank}</span></td>
                <td>
                  <strong>{row.media_name_ko}</strong>
                  <div className="text-muted" style={{ fontSize: 12 }}>{row.media_name_en}</div>
                </td>
                <td className="text-mono text-muted">{row.media_official_code}</td>
                <td className="right"><strong>{row.distinct_clients}</strong></td>
                <td className="right">{row.program_count ?? "—"}</td>
                <td>
                  <span
                    className="bar"
                    style={{ width: `${(row.distinct_clients / maxClients) * 180}px` }}
                    aria-hidden
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {data.note && (
        <section>
          <div className="methodology-block">
            <strong>참고:</strong> {data.note}
          </div>
        </section>
      )}

      <section>
        <h2>방법론</h2>
        <div className="methodology-block">
          <dl>
            <dt>Data Source:</dt><dd>{_methodology.data_source}</dd>
            <dt>Aggregation:</dt><dd>{_methodology.aggregation}</dd>
            <dt>Anonymization:</dt><dd>{_methodology.anonymization}</dd>
            <dt>Cardinality:</dt><dd>{_methodology.cardinality_method ?? "—"}</dd>
          </dl>
        </div>
      </section>

      <section>
        <h2>인용</h2>
        <div className="citation-block">
          <div><strong>KO:</strong></div>
          <code>{_citation.suggested_citation_ko}</code>
          <div style={{ marginTop: 12 }}>
            도구: <code>{_metadata.tool}</code> · 라이선스: {_citation.license}
          </div>
        </div>
      </section>
    </div>
  )
}
