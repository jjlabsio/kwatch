import { NextRequest, NextResponse } from "next/server";
import { getKrxBaseInfo, getKrxTradeInfo } from "@/lib/krx";
import { toZonedTime } from "date-fns-tz";
import { format } from "date-fns";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { symbol } = await request.json();

    if (!symbol) {
      return NextResponse.json(
        { error: "종목 코드를 입력해주세요." },
        { status: 400 }
      );
    }

    const today = toZonedTime(new Date("2025-08-18"), "Asia/Seoul");
    console.log('format(today, "yyyyMMdd") :>> ', format(today, "yyyyMMdd"));
    // 길이가 0이면 아직 오늘 데이터는 조회가 불가능한거
    // 날짜를 변경해서 처리
    const kospiInfo = await getKrxBaseInfo("KOSPI", format(today, "yyyyMMdd"));
    console.log("symbol :>> ", symbol, typeof symbol);
    console.log(
      "kospiInfo.OutBlock_1 :>> ",
      kospiInfo.OutBlock_1.map((el) => el.ISU_SRT_CD)
    );
    const isKospi = kospiInfo.OutBlock_1.some((el) => el.ISU_SRT_CD === symbol);
    console.log("isKospi :>> ", isKospi);

    if (!isKospi) {
      const kosdaqInfo = await getKrxBaseInfo(
        "KOSDAQ",
        format(today, "yyyyMMdd")
      );
      const isKosdaq = kosdaqInfo.OutBlock_1.some(
        (el) => el.ISU_SRT_CD === symbol
      );

      if (!isKosdaq) {
        return NextResponse.json(
          { error: "해당 종목을 찾을 수 없습니다. 종목 코드를 확인해주세요." },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({});
  } catch (error) {
    console.error("Stock API Error:", error);
    return NextResponse.json(
      {
        error: "주식 데이터를 가져오는 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
