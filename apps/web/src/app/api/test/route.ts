import { getTodayTradingDateUtc, utcDateToDateOnly } from "@/lib/date";
import { prisma } from "@/lib/prisma";
import type { GetTestResponse } from "@/types/api";

export async function GET(): Promise<Response> {
  const list = await prisma.stockMarketMeasure.findMany({
    orderBy: {
      startAt: "asc",
    },
  });

  // Prisma 결과를 API 응답 형식으로 변환
  const formattedList = list.map((el) => ({
    id: el.id,
    stockCode: el.stockCode,
    type: el.type,
    startAt: utcDateToDateOnly(new Date(el.startAt)),
    endAt: el.endAt ? utcDateToDateOnly(new Date(el.endAt)) : null,
    reason: el.reason,
  }));

  const today = getTodayTradingDateUtc();

  const filtered = await prisma.stockMarketMeasure.findMany({
    where: {
      startAt: today,
    },
  });
  const formattedFiltered = filtered.map((el) => ({
    id: el.id,
    stockCode: el.stockCode,
    type: el.type,
    startAt: utcDateToDateOnly(new Date(el.startAt)),
    endAt: el.endAt ? utcDateToDateOnly(new Date(el.endAt)) : null,
    reason: el.reason,
  }));

  const data: GetTestResponse = {
    today: today.toISOString(),
    list: formattedList,
    filtered: formattedFiltered,
  };

  return Response.json(data);
}
