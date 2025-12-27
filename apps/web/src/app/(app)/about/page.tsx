import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Info, Search, AlertCircle, MoveLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서비스 소개",
  description:
    "단기과열 종목 계산기 서비스에 대한 소개와 사용 방법을 알아보세요. 단기과열 지정 조건 계산 결과를 쉽게 확인할 수 있는 무료 도구입니다.",
  openGraph: {
    title: "서비스 소개 | 단기과열종목 계산기",
    description:
      "단기과열 종목 계산기 서비스에 대한 소개와 사용 방법을 알아보세요.",
    url: "https://overheat-checker-web.vercel.app/about",
    images: [
      {
        url: "/og-about.png",
        width: 1200,
        height: 630,
        alt: "서비스 소개 - 단기과열종목 계산기",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "서비스 소개 | 단기과열종목 계산기",
    description:
      "단기과열 종목 계산기 서비스에 대한 소개와 사용 방법을 알아보세요.",
    images: ["/og-about.png"],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-background p-4 pt-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-foreground">서비스 소개</h1>
          <p className="text-lg text-muted-foreground">
            단기과열종목 계산기가 무엇인지, 어떻게 사용하는지 알아보세요
          </p>
        </div>

        {/* 서비스 소개 카드 */}
        <Card className="border-blue-200 dark:border-blue-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-2xl text-blue-900 dark:text-blue-100">
                서비스 소개
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              <strong className="text-blue-900 dark:text-blue-100">
                "단기과열 종목 계산기"
              </strong>
              는 단기과열 예고 종목을 검색하면, 해당 종목이 단기과열 지정 조건을
              만족하는지 계산 결과를 바로 확인할 수 있는 서비스입니다.
            </p>
          </CardContent>
        </Card>

        {/* 사용 방법 카드 */}
        <Card className="border-emerald-200 dark:border-emerald-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Search className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <CardTitle className="text-2xl text-emerald-900 dark:text-emerald-100">
                사용 방법
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                    단기과열 예고 종목을 검색합니다.
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    종목 코드를 입력하여 해당 종목의 데이터를 불러옵니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                    서비스가 단기과열 지정 조건을 계산하여 결과를 보여줍니다.
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    주가상승률, 거래회전율, 주가변동성 조건을 자동으로 계산하고
                    분석합니다.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 알아두세요 카드 */}
        <Card className="border-amber-200 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              <CardTitle className="text-2xl text-amber-900 dark:text-amber-100">
                알아두세요
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-600 dark:bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-amber-800 dark:text-amber-200">
                  가격 괴리율로 인한 단기과열 예고 종목은 계산에서 제외됩니다.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-600 dark:bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-amber-800 dark:text-amber-200">
                  실제 단기과열 예고 여부는 공시를 통해 확인해야 합니다.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-600 dark:text-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-amber-800 dark:text-amber-200">
                  서비스는 계산된 조건값만 제공하며, 예고 여부 판단은 제공하지
                  않습니다.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-100/70 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                ⚠️ 투자 유의사항: 본 서비스는 참고용 정보 제공 목적이며, 투자
                권유나 매매 추천을 하지 않습니다. 모든 투자 결정은 본인의 판단과
                책임하에 이루어져야 합니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 메인 페이지로 돌아가기 */}
        <div className="text-center py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
          >
            <MoveLeft className="h-4 w-4" />
            메인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
