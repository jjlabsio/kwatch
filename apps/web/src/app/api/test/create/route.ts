import { dateOnlyToUtc } from "@/lib/date";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function GET() {
  const dummy: Prisma.StockMarketMeasureCreateInput[] = [
    {
      stockCode: "123456",
      type: "ATTENTION",
      startAt: dateOnlyToUtc("2025-12-26"),
      endAt: dateOnlyToUtc("2025-12-30"),
    },
    {
      stockCode: "123456",
      type: "OVERHEATED",
      startAt: dateOnlyToUtc("2025-12-27"),
      endAt: dateOnlyToUtc("2025-12-31"),
    },
    {
      stockCode: "123456",
      type: "OVERHEATED_NOTICE",
      startAt: dateOnlyToUtc("2025-12-30"),
      endAt: dateOnlyToUtc("2026-01-03"),
    },
    {
      stockCode: "123456",
      type: "RISK",
      startAt: dateOnlyToUtc("2026-01-02"),
      endAt: dateOnlyToUtc("2026-01-05"),
    },
  ];

  const created = await prisma.stockMarketMeasure.createMany({
    data: dummy,
  });

  return Response.json({
    count: created.count,
  });
}
