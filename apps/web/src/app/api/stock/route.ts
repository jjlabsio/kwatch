import { type NextRequest, NextResponse } from "next/server";
import { subDays, format } from "date-fns";
import { isMarketOpenDay } from "@/lib/market";
import { getKrxBaseInfo } from "@/lib/krx";
import {
  DateString,
  isBusinessDay,
  previousBusinessDay,
} from "korea-business-day";
import { toZonedTime } from "date-fns-tz";

interface YahooFinanceData {
  chart: {
    result: Array<{
      meta: {
        symbol: string;
        longName?: string;
        shortName?: string;
        sharesOutstanding?: number;
      };
      timestamp: number[];
      indicators: {
        quote: Array<{
          close: (number | null)[];
          high: (number | null)[];
          low: (number | null)[];
          volume: (number | null)[];
        }>;
      };
    }>;
  };
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { symbol } = await request.json();

    console.log("symbol :>> ", symbol);

    if (!symbol) {
      return NextResponse.json(
        { error: "종목 코드를 입력해주세요." },
        { status: 400 }
      );
    }

    // 한국 주식의 경우 .KS 또는 .KQ 접미사 추가
    const koreanSymbol = `${symbol}.KS`;

    const daysToFetch = 60; // 주말과 공휴일을 고려하여 더 많이 가져옴
    const today = new Date();
    const startDay = subDays(today, daysToFetch);
    const period2 = Math.floor(today.getTime() / 1000);
    const period1 = Math.floor(startDay.getTime() / 1000);

    // Yahoo Finance API 호출
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${koreanSymbol}?period1=${period1}&period2=${period2}&interval=1d`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      }
    );

    // if (response.ok) {
    //   const data: YahooFinanceData = await response.json();

    //   // get korean name
    //   const koreanName = await getKoreanName("KOSPI", symbol);
    //   console.log("koreanName :>> ", koreanName);

    //   return processStockData(data, koreanSymbol, koreanName);
    // }

    // // .KS로 실패하면 .KQ로 시도
    // const kosdaq_response = await fetch(
    //   `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.KQ?period1=${period1}&period2=${period2}&interval=1d`,
    //   {
    //     headers: {
    //       "User-Agent":
    //         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    //     },
    //   }
    // );

    // if (kosdaq_response.ok) {
    //   const data: YahooFinanceData = await kosdaq_response.json();

    //   // get korean name
    //   const koreanName = await getKoreanName("KOSDAQ", symbol);

    //   return processStockData(data, `${symbol}.KQ`, koreanName);
    // }

    // return NextResponse.json(
    //   { error: "해당 종목을 찾을 수 없습니다. 종목 코드를 확인해주세요." },
    //   { status: 404 }
    // );

    if (!response.ok) {
      // .KS로 실패하면 .KQ로 시도
      const kosdaq_response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.KQ?period1=${period1}&period2=${period2}&interval=1d`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        }
      );

      if (!kosdaq_response.ok) {
        return NextResponse.json(
          { error: "해당 종목을 찾을 수 없습니다. 종목 코드를 확인해주세요." },
          { status: 404 }
        );
      }

      const data: YahooFinanceData = await kosdaq_response.json();
      const koreanName = await getKoreanName("KOSDAQ", symbol);
      return processStockData(data, `${symbol}.KQ`, koreanName);
    }

    const data: YahooFinanceData = await response.json();
    const koreanName = await getKoreanName("KOSPI", symbol);
    return processStockData(data, koreanSymbol, koreanName);
  } catch (error) {
    console.error("Stock API Error:", error);
    return NextResponse.json(
      { error: "주식 데이터를 가져오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

function processStockData(
  data: YahooFinanceData,
  symbol: string,
  koreanName: string | null
): NextResponse {
  const result = data.chart.result?.[0];
  if (!result) {
    return NextResponse.json(
      { error: "주식 데이터를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  const timestamps = result.timestamp;
  const quote = result.indicators.quote?.[0];

  if (!quote) {
    return NextResponse.json(
      { error: "주식 데이터를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  const closes = quote.close;
  const highs = quote.high;
  const lows = quote.low;
  const volumes = quote.volume;
  const meta = result.meta;

  const allStockData = timestamps
    .map((timestamp, index) => {
      const close = closes[index];
      const high = highs[index];
      const low = lows[index];
      const volume = volumes[index];

      if (close == null || high == null || low == null || volume == null) {
        return null;
      }

      return {
        date: new Date(timestamp * 1000).toISOString().split("T")[0],
        close: Math.round(close),
        high: Math.round(high),
        low: Math.round(low),
        volume: volume,
        timestamp: new Date(timestamp * 1000),
      };
    })
    .filter(
      (item): item is NonNullable<typeof item> =>
        item !== null &&
        !isNaN(item.close) &&
        !isNaN(item.high) &&
        !isNaN(item.low) &&
        !isNaN(item.volume)
    );

  let stockData;
  let baseDate;
  let targetDate;

  // Yahoo Finance API는 한국 장 종료 전에는 가격을 null로 처리
  // 종가가 정해지기 전에는 데이터가 넘어오지 않음
  stockData = allStockData.slice(-40);
  const lastItem = stockData[stockData.length - 1];
  if (!lastItem?.timestamp) {
    return NextResponse.json({ error: "데이터가 없습니다." }, { status: 404 });
  }
  baseDate = lastItem.timestamp;

  // 다음 영업일 계산
  const nextBusinessDay = new Date(baseDate);
  nextBusinessDay.setDate(nextBusinessDay.getDate() + 1);
  while (!isMarketOpenDay(nextBusinessDay)) {
    nextBusinessDay.setDate(nextBusinessDay.getDate() + 1);
  }
  targetDate = format(nextBusinessDay, "yyyy-MM-dd");

  // timestamp 제거하고 최종 데이터 생성
  const finalStockData = stockData.map(({ timestamp, ...rest }) => rest);

  if (finalStockData.length === 0) {
    return NextResponse.json(
      { error: "유효한 주가 데이터가 없습니다." },
      { status: 404 }
    );
  }

  // 통계 계산
  const prices = finalStockData.map((d) => d.close);
  const avgPrice = Math.round(
    prices.reduce((sum, price) => sum + price, 0) / prices.length
  );
  const highPrice = Math.max(...prices);
  const lowPrice = Math.min(...prices);

  const sharesOutstanding = meta.sharesOutstanding || 1000000000; // 기본값 10억주

  // 40거래일 거래회전율 평균 계산 (거래량 / 총주식수)
  const turnoverRates = finalStockData.map((d) => {
    return (d.volume / sharesOutstanding) * 100;
  });
  const avgTurnoverRate =
    turnoverRates.reduce((sum, rate) => sum + rate, 0) / turnoverRates.length;

  // 40거래일 주가변동성 평균 계산
  const volatilities = finalStockData.map((d) => {
    const midPrice = (d.high + d.low) / 2;
    return ((d.high - d.low) / midPrice) * 100;
  });
  const avgVolatility =
    volatilities.reduce((sum, vol) => sum + vol, 0) / volatilities.length;

  // 단기과열종목 지정 조건 계산
  const requiredPrice = Math.round(avgPrice * 1.3); // 130% 이상
  const requiredTurnoverRate = avgTurnoverRate * 6; // 600% 이상
  const requiredVolatility = avgVolatility * 1.5; // 150% 이상

  const todayTurnoverRate = turnoverRates[turnoverRates.length - 1] || 0;
  const minTomorrowTurnoverRate = Math.max(
    0,
    avgTurnoverRate * 6 * 2 - todayTurnoverRate
  );
  const minTradingVolume = Math.round(
    (minTomorrowTurnoverRate / 100) * sharesOutstanding
  );

  const stockInfo = {
    symbol: symbol.split(".")[0],
    name: koreanName || meta.shortName || meta.longName || symbol,
    data: finalStockData,
    stats: {
      avgPrice,
      highPrice,
      lowPrice,
      // 단기과열종목 지정 조건
      requiredPrice,
      requiredTurnoverRate: Number(requiredTurnoverRate.toFixed(3)),
      requiredVolatility: Number(requiredVolatility.toFixed(2)),
      // 현재 40거래일 평균값들
      avgTurnoverRate: Number(avgTurnoverRate.toFixed(3)),
      avgVolatility: Number(avgVolatility.toFixed(2)),
      minTomorrowTurnoverRate: Number(minTomorrowTurnoverRate.toFixed(3)),
      todayTurnoverRate: Number(todayTurnoverRate.toFixed(3)),
      sharesOutstanding,
      minTradingVolume,
      baseDate: format(baseDate, "yyyy-MM-dd"),
      targetDate,
    },
  };

  return NextResponse.json(stockInfo);
}

function dateToDateString(date: Date) {
  return format(date, "yyyy-MM-dd") as DateString;
}

// yahoo finance가 코스피, 코스닥 구분이 정확하지 않아서
// krx에서 코스피, 코스닥을 모두 불러오는 방식으로 구현
async function getKoreanName(
  market: "KOSPI" | "KOSDAQ",
  symbol: string
): Promise<null | string> {
  const today = toZonedTime(new Date(), "Asia/Seoul");
  const todayString = dateToDateString(today);

  const businessDay = previousBusinessDay(
    previousBusinessDay(previousBusinessDay(todayString))
  );

  const kospiList = await getKrxBaseInfo(
    "KOSPI",
    format(new Date(businessDay), "yyyyMMdd")
  );
  const kosdaqList = await getKrxBaseInfo(
    "KOSDAQ",
    format(new Date(businessDay), "yyyyMMdd")
  );
  const infoList = [...kospiList.OutBlock_1, ...kosdaqList.OutBlock_1];

  const matched = infoList.find((info) => info.ISU_SRT_CD === symbol);

  if (matched) {
    return matched.ISU_ABBRV;
  }

  return null;
}
