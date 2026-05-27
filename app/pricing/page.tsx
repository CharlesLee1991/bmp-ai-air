// app/pricing/page.tsx — 6 Tier (windsor.ai 패턴 미러)
import Link from "next/link"

export const metadata = {
  title: "Pricing — 요금 | AIR MCP",
  description: "AIR MCP 6 Tier 요금. Free / Basic / Standard / Plus / Professional / Enterprise. windsor.ai 패턴."
}

const TIERS = [
  {
    name: "Free",
    price: "₩0",
    period: "/월",
    users: "1",
    mediaConnect: "1",
    accounts: "3",
    calls: "1,000",
    refresh: "Daily",
    badge: null,
    desc: "30일 trial / Citation Moat 검증 / 시연 client 5명",
    cta: "GP 콘솔 client API key 발급"
  },
  {
    name: "Basic",
    price: "₩29,000",
    period: "/월",
    users: "∞",
    mediaConnect: "3",
    accounts: "15",
    calls: "10,000",
    refresh: "Daily",
    badge: null,
    desc: "소규모 광고주 / Tier 1 시연용",
    cta: "Standard 권장"
  },
  {
    name: "Standard",
    price: "₩99,000",
    period: "/월",
    users: "∞",
    mediaConnect: "7",
    accounts: "50",
    calls: "50,000",
    refresh: "Daily · Hourly",
    badge: "Most Popular",
    desc: "중견 광고주 / 다중 매체 통합",
    cta: "가장 인기"
  },
  {
    name: "Plus",
    price: "₩249,000",
    period: "/월",
    users: "∞",
    mediaConnect: "9 (전체)",
    accounts: "200",
    calls: "200,000",
    refresh: "Hourly",
    badge: null,
    desc: "전 매체 통합 + 전환·예산 분석",
    cta: "전 매체 통합"
  },
  {
    name: "Professional",
    price: "₩499,000",
    period: "/월",
    users: "∞",
    mediaConnect: "9",
    accounts: "500",
    calls: "1,000,000",
    refresh: "Hourly · 15-min",
    badge: null,
    desc: "대행사 / 전용 지원",
    cta: "대규모 운영"
  },
  {
    name: "Enterprise",
    price: "별도 견적",
    period: "",
    users: "∞",
    mediaConnect: "9 + 커스텀",
    accounts: "∞",
    calls: "∞",
    refresh: "Real-time + 커스텀",
    badge: null,
    desc: "전용 SLA / SSO / 회계 인보이스",
    cta: "문의"
  }
]

export default function PricingPage() {
  return (
    <div>
      <div className="hero hero-compact">
        <h1>Pricing — 6 Tier</h1>
        <p className="lead">
          모든 plan에 MCP 기본 포함. Citation Moat (CC-BY 4.0) 전 tier 동일.
        </p>
        <p className="meta">
          windsor.ai 패턴 미러 + 한국 광고 매체 9종 집중. 6월 정식 가격 확정 예정 (현재 Free Beta).
        </p>
      </div>

      <section>
        <div className="pricing-grid">
          {TIERS.map((t) => (
            <div key={t.name} className={`pricing-card ${t.badge ? "pricing-card-featured" : ""}`}>
              {t.badge && <div className="pricing-badge">{t.badge}</div>}
              <h3 className="pricing-name">{t.name}</h3>
              <div className="pricing-price">
                <span className="pricing-amount">{t.price}</span>
                <span className="pricing-period">{t.period}</span>
              </div>
              <p className="pricing-desc">{t.desc}</p>
              <ul className="pricing-features">
                <li><span className="muted">사용자</span> <strong>{t.users}</strong></li>
                <li><span className="muted">매체 연결</span> <strong>{t.mediaConnect}</strong></li>
                <li><span className="muted">광고 계정</span> <strong>{t.accounts}</strong></li>
                <li><span className="muted">월간 호출</span> <strong>{t.calls}</strong></li>
                <li><span className="muted">갱신 주기</span> <strong>{t.refresh}</strong></li>
              </ul>
              <Link href="/contact" className="btn btn-primary btn-block">{t.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>volume overage (추가 호출 단가)</h2>
        <table className="data-table">
          <thead>
            <tr><th>Tier</th><th>추가 1,000 호출</th></tr>
          </thead>
          <tbody>
            <tr><td>Free</td><td className="text-muted">불가 (한도 초과 시 429)</td></tr>
            <tr><td>Basic</td><td>₩2,000</td></tr>
            <tr><td>Standard</td><td>₩1,000</td></tr>
            <tr><td>Plus</td><td>₩800</td></tr>
            <tr><td>Professional</td><td>₩400</td></tr>
            <tr><td>Enterprise</td><td>별도 견적</td></tr>
          </tbody>
        </table>
        <p className="desc">windsor.ai 벤치마크: tier 올라갈수록 단가 저렴 ($20 → $4/1M). 동일 구조.</p>
      </section>

      <section>
        <h2>FAQ</h2>
        <div className="methodology-block">
          <dl>
            <dt>Free 영구 무료?</dt>
            <dd>현재 Free Beta 기간. 시연 client 5명은 영구 무료 약정. 일반 사용자는 6월부터 30일 trial.</dd>
            <dt>plan 변경?</dt>
            <dd>월 단위 변경 가능. 다운그레이드는 다음 billing cycle부터 적용.</dd>
            <dt>Enterprise SSO?</dt>
            <dd>Google Workspace / Azure AD 지원. 자세한 사항은 <Link href="/contact">/contact</Link>.</dd>
            <dt>refund 정책?</dt>
            <dd>월 단위 결제 / 환불 불가. Enterprise 연 단위 계약은 별도 협의.</dd>
          </dl>
        </div>
      </section>

      <section>
        <div className="cta-row">
          <Link href="/contact" className="btn btn-primary">client API key 발급 문의</Link>
          <Link href="/docs" className="btn btn-ghost">API 문서</Link>
        </div>
      </section>
    </div>
  )
}
