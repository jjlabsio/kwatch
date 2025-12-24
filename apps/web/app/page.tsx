import type { Metadata } from "next";
import HomeContent from "@/components/home-content";

export const metadata: Metadata = {
  title: "단기과열종목 계산기",
  description:
    "단기과열종목 지정예고 종목이 실제로 단기과열종목에 지정되는 조건을 미리 계산해보세요. 주가상승률, 거래회전율, 주가변동성 조건을 실시간으로 분석하는 무료 도구입니다.",
  keywords: [
    "단기과열종목 계산기",
    "주식 계산기",
    "한국 주식시장",
    "KOSPI 계산기",
    "KOSDAQ 계산기",
    "주가상승률 계산",
    "거래회전율 계산",
    "주가변동성 계산",
    "주식 분석 도구",
    "투자 도구",
    "삼성전자",
    "SK하이닉스",
    "무료 주식 도구",
  ],
  openGraph: {
    title: "단기과열종목 계산기",
    description:
      "단기과열종목 지정 조건을 실시간으로 계산하고 분석하는 무료 도구입니다. KOSPI/KOSDAQ 종목의 주가상승률, 거래회전율, 주가변동성을 한번에 확인하세요.",
    url: "https://overheat-checker-web.vercel.app",
    type: "website",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "단기과열종목 계산기",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "단기과열종목 계산기",
    description:
      "단기과열종목 지정 조건을 실시간으로 계산하는 무료 도구입니다.",
    images: ["/og-home.png"],
  },
  alternates: {
    canonical: "/",
  },
  other: {
    "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function Home() {
  return <HomeContent />;
}
