// app/seasonal/page.tsx
import { callAirMcp, fmtKRW, type Period, type Granularity } from "@/lib/air-mcp"
import Link from "next/link"

interface SeasonalData {
  period: { start: string; end: string; days: number; label: string }
  granularity: string
  total_spend_krw: number
  currency: string
  bucket_count: number
  buckets: Array<{
    date: string
    total_spend_krw: number
    by_media?: Record<string, number>
  }>
}

export const revalidate = 3600
export const metadata = {
  title: "시즌 추이 | AIR Korean Ad Insights",
  description: "한국 디지털 광고 시즌 추이 — 30d/90d/180d 시계열 패턴."
}

const VALID_PERIODS: Period[] = ["30d", "90d", "180d"]
const VALID_GRANULARITIES: Granularity[] = ["day", "week"]

interface PageProps {
  searchParams: { period?: string; granularity?: string }
}

export default async function SeasonalPage({ searchParams }: PageProps) {
  const period: Period = VALID_PERIODS.includes(searchParams.period as Period)
    ? (searchParams.period as Period)
    : "30d"
  const granularity: Granularity = VALID_GRANULARITIES.includes(
    searchParams.granularity as Granularity
  )
    ? (searchParams.granularity as Granularity)
    : "day"

  let result
  try {
    result = await callAirMcp<SeasonalData>({
      tool: "get_seasonal_ad_spending_pattern",
      period,
      granularity
    })
  } catch (e) {
    return <div className="error-block">데이터 조회 실패: {(e as Error).message}</div>
  }
  const { data, _citation, _metadata } = result
  const maxSpend = Math.max(...data.buckets.map((b) => b.total_spend_krw), 1)

  return (
    <div>
      <div className="hero">
        <h1>한국 광고 시장 시즌 추이</h1>
        <p className="lead">시계열 광고비 변동 — 일별 / 주별 패턴으로 시즈널리티 탐색.</p>
        <p className="meta">
          기간: {data.period.start} ~ {data.period.end} ({data.period.days}일, label: {data.period.label}) · granularity: {data.granularity} · 총 광고비: {fmtKRW(data.total_spend_krw)}
        </p>
      </div>

      <section>
        <h2>조회 옵션</h2>
        <p className="desc">아래 옵션 클릭으로 기간·granularity 변경.</p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 16 }}>
          <div>
            <strong>기간:</strong>{" "}
            {VALID_PERIODS.map((p) => (
              <Link
                key={p}
                href={`/seasonal?period=${p}&granularity=${granularity}`}
                style={{
                  marginRight: 8,
                  padding: "4px 12px",
                  background: p === period ? "var(--accent)" : "var(--bg-card)",
                  color: p === period ? "#fff" : "var(--accent)",
                  border: "1px solid var(--accent)",
                  borderRadius: 4,
                  fontSize: 13
                }}
              >
                {p}
              </Link>
            ))}
          </div>
          <div>
            <strong>Granularity:</strong>{" "}
            {VALID_GRANULARITIES.map((g) => (
              <Link
                key={g}
                href={`/seasonal?period=${period}&granularity=${g}`}
                style={{
                  marginRight: 8,
                  padding: "4px 12px",
                  background: g === granularity ? "var(--accent)" : "var(--bg-card)",
                  color: g === granularity ? "#fff" : "var(--accent)",
                  border: "1px solid var(--accent)",
                  borderRadius: 4,
                  fontSize: 13
                }}
              >
                {g}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2>시계열 차트 ({data.bucket_count} buckets)</h2>
        <p className="desc">막대 길이 = 해당 구간 광고비 (최대값 기준 비율).</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>날짜 ({granularity})</th>
              <th className="right">광고비 (KRW)</th>
              <th style={{ minWidth: 300 }}>비율</th>
            </tr>
          </thead>
          <tbody>
            {data.buckets.map((b) => (
              <tr key={b.date}>
                <td className="text-mono">{b.date}</td>
                <td className="right">{b.total_spend_krw.toLocaleString("ko-KR")}</td>
                <td>
                  <span
                    className="bar"
                    style={{ width: `${(b.total_spend_krw / maxSpend) * 280}px` }}
                    aria-hidden
                  />
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
          <div style={{ marginTop: 12 }}>
            도구: <code>{_metadata.tool}</code> · 라이선스: {_citation.license}
          </div>
        </div>
      </section>
    </div>
  )
}
