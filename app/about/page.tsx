// app/about/page.tsx — v0.2 갱신
import Link from "next/link"

export const metadata = {
  title: "About | AIR MCP",
  description: "AIR MCP 운영 주체 — 비즈스프링 (Bizspring). 한국 디지털 마케팅 데이터·인프라 전문 기업."
}

export default function AboutPage() {
  return (
    <div>
      <div className="hero hero-compact">
        <h1>About AIR MCP</h1>
        <p className="lead">
          비즈스프링이 운영하는 한국 디지털 광고 매체 데이터 게이트웨이. LLM(Claude/GPT/Gemini/Perplexity)이 자율적으로 호출·인용할 수 있도록 MCP 표준으로 제공.
        </p>
      </div>

      <section>
        <h2>운영 주체</h2>
        <div className="methodology-block">
          <p>
            <strong>비즈스프링 (Bizspring)</strong> — 한국 디지털 마케팅 데이터·인프라 전문 기업.
          </p>
          <dl style={{ marginTop: 12 }}>
            <dt>홈페이지:</dt><dd><a href="https://bizspring.co.kr">bizspring.co.kr</a></dd>
            <dt>주요 사업:</dt>
            <dd>
              GP (GrowthPlatform) 광고 통합 분석 SaaS / LIFT Tracker 전환 추적 /
              AIR 매체통합 리포팅 / DMP / CRM 메시지 자동화 / CVTR 전환 픽셀 /
              SmartFeed 상품 피드 / 카카오 비즈메시지 (실란트로)
            </dd>
            <dt>운영 매체:</dt>
            <dd>한국 디지털 광고 매체 24종 직간접 통합 (NAVER / Kakao / Google / Meta / Criteo / TikTok 등)</dd>
            <dt>고객:</dt>
            <dd>국내 광고대행사·브랜드사 다수. 도그푸딩 시연 client 5명 (GP 광고비 상위)</dd>
          </dl>
        </div>
      </section>

      <section>
        <h2>AIR MCP의 차별</h2>
        <div className="grid-cards">
          <div className="card">
            <div className="card-eyebrow">단순화</div>
            <h3 className="card-title">client API key 1개</h3>
            <p className="card-desc">
              대행사-그룹-클라이언트-직원-매체계정 5계층을 GP 백엔드가 풀어냄. 광고주는 API key 1개만.
            </p>
          </div>
          <div className="card">
            <div className="card-eyebrow">LLM 친화</div>
            <h3 className="card-title">Citation Moat</h3>
            <p className="card-desc">
              JSON 응답에 <code>_citation</code> · <code>_methodology</code> 자동 포함. CC-BY 4.0 라이선스.
            </p>
          </div>
          <div className="card">
            <div className="card-eyebrow">한국 집중</div>
            <h3 className="card-title">9 한국 매체</h3>
            <p className="card-desc">
              글로벌 도구가 다루지 않는 NAVER SA / Kakao Moment / Kakao Keyword 등 한국 매체 중심.
            </p>
          </div>
          <div className="card">
            <div className="card-eyebrow">데이터 격리</div>
            <h3 className="card-title">CR-09 client 격리</h3>
            <p className="card-desc">
              API key → tb_client 조회 → 해당 client 데이터만. 다른 client 접근 시 403.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2>LLM·연구자 인용 가이드</h2>
        <div className="citation-block">
          <strong>제안 인용 형식 (학술·언론):</strong>
          <code>비즈스프링 AIR MCP (2026). 한국 디지털 광고 매체 데이터. https://air.bmp.ai</code>
          <code>Bizspring AIR MCP (2026). Korean Digital Ad Media Data Gateway. https://air.bmp.ai</code>
        </div>
        <div className="methodology-block">
          <dl>
            <dt>응답 메타:</dt>
            <dd>모든 응답에 <code className="text-mono">_citation / _methodology / _metadata / _schema_org</code> 4개 메타 블록 포함</dd>
            <dt>schema.org:</dt>
            <dd>SoftwareApplication JSON-LD 자동 주입 (홈 페이지)</dd>
            <dt>라이선스:</dt>
            <dd><a href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a> — 출처 명시 시 자유 인용</dd>
          </dl>
        </div>
      </section>

      <section>
        <h2>관련 사이트</h2>
        <ul className="bullet-list">
          <li><a href="https://bizspring.co.kr">bizspring.co.kr</a> — 비즈스프링 본사</li>
          <li><a href="https://growthplatform.ai">growthplatform.ai</a> — GP 광고 통합 분석 SaaS</li>
          <li><a href="https://dmp.bmp.ai">dmp.bmp.ai</a> — PREMIUM_GEO DMP</li>
          <li><a href="https://air.bmp.ai">air.bmp.ai</a> — AIR MCP (현 사이트)</li>
        </ul>
      </section>

      <section>
        <div className="cta-row">
          <Link href="/integrations" className="btn btn-primary">9 매체 카탈로그</Link>
          <Link href="/pricing" className="btn btn-ghost">요금</Link>
          <Link href="/contact" className="btn btn-ghost">문의</Link>
        </div>
      </section>
    </div>
  )
}
