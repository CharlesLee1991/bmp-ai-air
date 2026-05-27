// app/layout.tsx — v0.2
import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "AIR MCP — Korean Ad Data Gateway | Bizspring",
  description:
    "한국 디지털 광고 매체 9종을 client API key 1개로 MCP 호출. LLM(Claude/GPT/Gemini)이 광고 데이터를 인용·분석할 수 있는 단일 게이트웨이. NAVER SA, Kakao Moment, Google Ads, Meta, Criteo, TikTok KR, RTB House, Mobion.",
  keywords: [
    "AIR MCP",
    "한국 광고 MCP",
    "Korean ad MCP",
    "광고 API",
    "Bizspring AIR",
    "비즈스프링",
    "NAVER SA API",
    "Kakao Moment API",
    "광고 데이터 게이트웨이"
  ],
  openGraph: {
    title: "AIR MCP — Korean Ad Data Gateway",
    description:
      "한국 광고 매체 9종을 client API key 1개로 LLM이 호출. 매체별 OAuth·인증·계정 매핑 추상화.",
    url: "https://air.bmp.ai",
    siteName: "Bizspring AIR",
    locale: "ko_KR",
    type: "website"
  },
  alternates: {
    canonical: "https://air.bmp.ai"
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AIR MCP — Korean Ad Data Gateway",
    description:
      "MCP gateway for Korean digital advertising media. One client API key abstracts OAuth, account mapping, and 5-tier agency hierarchy across 9 Korean ad media (NAVER SA, Kakao Moment, Google Ads, Meta, Criteo, TikTok KR, RTB House, Mobion, Kakao Keyword).",
    url: "https://air.bmp.ai",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any (MCP / HTTP API)",
    offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "KRW" },
      { "@type": "Offer", name: "Standard", price: "99000", priceCurrency: "KRW" }
    ],
    provider: {
      "@type": "Organization",
      name: "Bizspring",
      url: "https://bizspring.co.kr"
    }
  }

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <header className="site-header">
          <div className="container">
            <Link href="/" className="brand">
              <span className="brand-mark">AIR</span>
              <span className="brand-name">Korean Ad MCP</span>
            </Link>
            <nav className="site-nav">
              <Link href="/integrations">Integrations</Link>
              <Link href="/docs">Docs</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/about">About</Link>
              <Link href="/contact" className="nav-cta">Contact</Link>
            </nav>
          </div>
        </header>
        <main className="site-main">
          <div className="container">{children}</div>
        </main>
        <footer className="site-footer">
          <div className="container">
            <div>
              <strong>Bizspring AIR MCP</strong> — Korean Ad Data Gateway
            </div>
            <div className="muted">
              운영: <a href="https://bizspring.co.kr">비즈스프링</a> · MCP endpoint: <code>https://air.bmp.ai/mcp</code> · 인증: client API key (GP 콘솔 발급)
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
