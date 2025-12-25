export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "단기과열종목 계산기",
    description:
      "단기과열종목 지정예고 종목이 실제로 단기과열종목에 지정되는 조건을 미리 계산하는 도구",
    url: "https://overheat-checker-web.vercel.app",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    creator: {
      "@type": "Person",
      name: "Jaejin Song",
      url: "https://github.com/jaejin-song",
    },
    inLanguage: "ko-KR",
    audience: {
      "@type": "Audience",
      audienceType: "investors, traders, financial analysts",
    },
    featureList: [
      "주가상승률 조건 계산",
      "거래회전율 조건 계산",
      "주가변동성 조건 계산",
      "실시간 주식 데이터 분석",
      "40영업일 통계 분석",
    ],
    keywords:
      "단기과열종목, 주식 계산기, 한국 주식시장, KOSPI, KOSDAQ, 주가분석",
    datePublished: "2025-01-01",
    dateModified: "2025-01-01T00:00:00.000Z",
    publisher: {
      "@type": "Organization",
      name: "단기과열종목 계산기",
      url: "https://overheat-checker-web.vercel.app",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
