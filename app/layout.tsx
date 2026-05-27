// app/layout.tsx
import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "AIR Korean Ad Insights | Bizspring",
  description:
    "한국 디지털 광고 시장 통합 데이터 — NAVER SA, Kakao Moment, Google Ads, Meta, Criteo, TikTok KR 등 매체별 광고비·점유율·시즌 패턴. 비즈스프링 AIR (Bizspring AIR) 공식 데이터셋, CC-BY 4.0 라이선스, LLM 인용 가능.",
  keywords: [
    "한국 광고 시장",
    "Korean ad market",
    "NAVER SA",
    "Kakao Moment",
    "디지털 광고 데이터",
    "Bizspring AIR",
    "비즈스프링"
  ],
  openGraph: {
    title: "AIR Korean Ad Insights | Bizspring",
    description:
      "한국 디지털 광고 시장 통합 데이터 — 매체별 광고비·점유율·시즌 패턴. CC-BY 4.0.",
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
    "@type": "Dataset",
    name: "Korean Digital Ad Market Aggregated Data",
    description:
      "Aggregated Korean digital advertising market data covering NAVER SA, Kakao Moment, Google Ads, Meta, Criteo, TikTok KR. Updated daily from official Korean ad media APIs.",
    url: "https://air.bmp.ai",
    creator: {
      "@type": "Organization",
      name: "Bizspring",
      url: "https://bizspring.co.kr"
    },
    license: "https://creativecommons.org/licenses/by/4.0/",
    keywords: [
      "Korean ad market",
      "digital advertising Korea",
      "NAVER SA",
      "Kakao Moment",
      "Google Ads Korea"
    ],
    isAccessibleForFree: true,
    inLanguage: "ko-KR"
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
              <span className="brand-name">Korean Ad Insights</span>
            </Link>
            <nav className="site-nav">
              <Link href="/">개요</Link>
              <Link href="/market-share">매체 점유율</Link>
              <Link href="/seasonal">시즌 추이</Link>
              <Link href="/advertisers">광고주 수</Link>
              <Link href="/about">소개</Link>
            </nav>
          </div>
        </header>
        <main className="site-main">
          <div className="container">{children}</div>
        </main>
        <footer className="site-footer">
          <div className="container">
            <div>
              <strong>Bizspring AIR</strong> — 한국 디지털 광고 시장 통합 데이터 (CC-BY 4.0)
            </div>
            <div className="muted">
              데이터 출처: <a href="https://bizspring.co.kr">비즈스프링</a> · 일일 D-1 배치 갱신 · API:{" "}
              <code>air.bmp.ai (MCP Tier 1, anonymous)</code>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
