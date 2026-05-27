// app/contact/page.tsx — v0.2
import Link from "next/link"

export const metadata = {
  title: "Contact | AIR MCP",
  description: "AIR MCP client API key 발급 / Enterprise quote / 기술 문의."
}

export default function ContactPage() {
  return (
    <div>
      <div className="hero hero-compact">
        <h1>Contact</h1>
        <p className="lead">
          client API key 발급 / Enterprise 견적 / 기술 문의는 이메일 또는 GP 콘솔로 연락.
        </p>
      </div>

      <section>
        <h2>이메일 문의</h2>
        <div className="grid-cards">
          <div className="card">
            <div className="card-eyebrow">신규 발급</div>
            <h3 className="card-title">client API key</h3>
            <p className="card-desc">
              광고주 client API key 발급은 GP 콘솔(<a href="https://growthplatform.ai">growthplatform.ai</a>)에서 가능.
              가입 후 client 등록 → API 탭에서 발급.
            </p>
            <a href="mailto:contact@bizspring.co.kr?subject=AIR%20MCP%20client%20API%20key%20%EB%B0%9C%EA%B8%89%20%EB%AC%B8%EC%9D%98" className="btn btn-primary btn-block">contact@bizspring.co.kr</a>
          </div>

          <div className="card">
            <div className="card-eyebrow">대기업</div>
            <h3 className="card-title">Enterprise 견적</h3>
            <p className="card-desc">
              전용 SLA / SSO / 회계 인보이스 / 커스텀 매체 추가 / Real-time 갱신 등 Enterprise 옵션.
            </p>
            <a href="mailto:enterprise@bizspring.co.kr?subject=AIR%20MCP%20Enterprise%20%EA%B2%AC%EC%A0%81%20%EC%9A%94%EC%B2%AD" className="btn btn-primary btn-block">enterprise@bizspring.co.kr</a>
          </div>

          <div className="card">
            <div className="card-eyebrow">개발자</div>
            <h3 className="card-title">기술 문의</h3>
            <p className="card-desc">
              API 사용·rate limit·schema·integration 문의. MCP 호환 LLM client 연동 가이드.
            </p>
            <a href="mailto:dev@bizspring.co.kr?subject=AIR%20MCP%20%EA%B8%B0%EC%88%A0%20%EB%AC%B8%EC%9D%98" className="btn btn-primary btn-block">dev@bizspring.co.kr</a>
          </div>

          <div className="card">
            <div className="card-eyebrow">파트너십</div>
            <h3 className="card-title">매체사 / 대행사</h3>
            <p className="card-desc">
              새 매체 추가 제안 / 대행사 OEM / 데이터 공급 제휴 등.
            </p>
            <a href="mailto:partner@bizspring.co.kr?subject=AIR%20MCP%20%ED%8C%8C%ED%8A%B8%EB%84%88%EC%8B%AD" className="btn btn-primary btn-block">partner@bizspring.co.kr</a>
          </div>
        </div>
      </section>

      <section>
        <h2>본사 정보</h2>
        <div className="methodology-block">
          <dl>
            <dt>회사명:</dt><dd>주식회사 비즈스프링 (Bizspring Inc.)</dd>
            <dt>홈페이지:</dt><dd><a href="https://bizspring.co.kr">bizspring.co.kr</a></dd>
            <dt>운영 SaaS:</dt><dd><a href="https://growthplatform.ai">growthplatform.ai</a> (GP)</dd>
            <dt>도메인:</dt><dd>air.bmp.ai · dmp.bmp.ai · bizspring.co.kr</dd>
          </dl>
        </div>
      </section>

      <section>
        <h2>참고 자료</h2>
        <div className="cta-row">
          <Link href="/docs" className="btn btn-ghost">API 문서</Link>
          <Link href="/integrations" className="btn btn-ghost">9 매체 카탈로그</Link>
          <Link href="/pricing" className="btn btn-ghost">6 Tier 요금</Link>
          <Link href="/about" className="btn btn-ghost">About</Link>
        </div>
      </section>
    </div>
  )
}
