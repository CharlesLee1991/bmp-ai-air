// lib/air-mcp.ts
// AIR LLM-First MCP v0.7 — Server-side fetch helper
// EF endpoint은 env로 주입. anon JWT는 서버에서만 보관.

const EF_URL = process.env.AIR_LLM_MCP_URL ?? ""
const EF_KEY = process.env.AIR_LLM_MCP_KEY ?? ""

export type Tool =
  | "get_korean_ad_market_overview"
  | "get_media_market_share"
  | "get_seasonal_ad_spending_pattern"
  | "get_advertiser_count_by_media"

export type Verbosity = "compact" | "full"
export type Period = "30d" | "90d" | "180d"
export type Granularity = "day" | "week"

export interface CallOptions {
  tool: Tool
  verbosity?: Verbosity
  period?: Period
  granularity?: Granularity
}

export interface CitationBlock {
  source: string
  source_url: string
  license: string
  suggested_citation_ko: string
  suggested_citation_en: string
  doi: string | null
  data_authority: string
}

export interface MethodologyBlock {
  data_source: string
  aggregation: string
  anonymization: string
  exclusions: string
  batch_schedule: string
  media_name_source?: string
  cardinality_method?: string
}

export interface MetadataBlock {
  version: string
  tool: Tool
  tier: "anonymous"
  language: string
  verbosity: Verbosity
  generated_at: string
}

export interface AirMcpResponse<TData = unknown> {
  data: TData
  _citation: CitationBlock
  _methodology: MethodologyBlock
  _metadata: MetadataBlock
  _schema_org: Record<string, unknown>
}

export async function callAirMcp<TData = unknown>(
  opts: CallOptions
): Promise<AirMcpResponse<TData>> {
  if (!EF_URL || !EF_KEY) {
    throw new Error("AIR_LLM_MCP_URL / AIR_LLM_MCP_KEY env not configured")
  }
  const body: Record<string, unknown> = {
    tool: opts.tool,
    verbosity: opts.verbosity ?? "compact"
  }
  if (opts.period) body.period = opts.period
  if (opts.granularity) body.granularity = opts.granularity

  const res = await fetch(EF_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${EF_KEY}`
    },
    body: JSON.stringify(body),
    next: { revalidate: 3600 } // 1시간 ISR
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`AIR MCP ${res.status}: ${text}`)
  }
  return (await res.json()) as AirMcpResponse<TData>
}

export function fmtKRW(n: number): string {
  if (n >= 1_0000_0000_0000) return `${(n / 1_0000_0000_0000).toFixed(2)}조`
  if (n >= 1_0000_0000) return `${(n / 1_0000_0000).toFixed(2)}억`
  if (n >= 1_0000) return `${(n / 1_0000).toFixed(0)}만`
  return `${n.toLocaleString("ko-KR")}`
}

export function fmtPct(n: number): string {
  return `${n.toFixed(2)}%`
}
