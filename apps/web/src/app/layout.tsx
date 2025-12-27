import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

import "@repo/ui/globals.css";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@repo/ui/components/sonner";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    template: "%s | 단기과열종목 계산기",
    default: "단기과열종목 계산기",
  },
  description:
    "단기과열종목 지정예고 종목이 실제로 단기과열종목에 지정되는 조건을 미리 계산해보세요. 주가상승률, 거래회전율, 주가변동성 조건을 실시간으로 분석합니다.",
  keywords: [
    "단기과열종목",
    "주식 계산기",
    "한국 주식시장",
    "KOSPI",
    "KOSDAQ",
    "주가상승률",
    "거래회전율",
    "주가변동성",
    "주식 분석",
    "투자 도구",
  ],
  authors: [{ name: "Jaejin Song" }],
  creator: "Jaejin Song",
  publisher: "Jaejin Song",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://overheat-checker-web.vercel.app",
    siteName: "단기과열종목 계산기",
    title: "단기과열종목 계산기",
    description:
      "단기과열종목 지정 조건을 실시간으로 계산하고 분석하는 도구입니다.",
    images: [
      {
        url: "/og-image.png",
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
      "단기과열종목 지정 조건을 실시간으로 계산하고 분석하는 도구입니다.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://overheat-checker-web.vercel.app"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      "naver-site-verification": process.env.NAVER_SITE_VERIFICATION!,
    },
  },
  category: "finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster />
        <Analytics />
        {/* <div className="flex min-h-screen flex-col">
          <Providers>
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </Providers>
        </div>
        <Toaster />
        <Analytics /> */}
      </body>
    </html>
  );
}
