import { Suspense } from "react";
import { StockContent } from "./content";
import { Spinner } from "@repo/ui/components/spinner";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;

  const title = `${code} 단기과열종목 계산기`;
  const description = `${code} 종목의 단기과열종목 지정 조건을 실시간으로 계산합니다. 주가상승률, 거래회전율, 주가변동성 조건 분석 및 필요 수치 제공.`;

  return {
    title,
    description,
    keywords: [
      "단기과열종목",
      "단기과열",
      "과열종목",
      code,
      "주식",
      "KOSPI",
      "KOSDAQ",
      "주가상승률",
      "거래회전율",
      "주가변동성",
      "주식계산기",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/stock/${code}`,
    },
  };
}

export default async function StockPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <div className="bg-background p-4 pt-20">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            단기과열종목 계산기
          </h1>
          <p className="text-muted-foreground">
            단기과열종목 지정예고 종목이 실제로 단기과열종목에 지정되는 조건을
            미리 계산해보세요
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex h-100 w-full items-center justify-center">
              <Spinner className="size-16 text-muted-foreground" />
            </div>
          }
        >
          <StockContent code={code} />
        </Suspense>

        <div className="max-w-4xl mx-auto mt-12 py-8 border-t border-border">
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              투자 유의사항
            </h3>
            <div className="text-xs text-muted-foreground space-y-2 leading-relaxed">
              <p>
                본 서비스는 단기과열종목 지정 조건 계산을 위한 참고 정보를
                제공하며, 투자 권유나 매매 추천을 목적으로 하지 않습니다.
              </p>
              <p>
                가격괴리율로 인한 단기과열종목 지정예고는 계산 대상에서
                제외됩니다.
              </p>
              <p>
                모든 투자 결정은 이용자 본인의 판단과 책임하에 이루어져야 하며,
                본 정보를 바탕으로 한 투자 결과에 대해 당사는 어떠한 책임도 지지
                않습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
