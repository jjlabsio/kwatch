import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { dateOnlyToUtc, utcDateToDateOnly } from "@/lib/date";
import type { Prisma } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
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

  await prisma.stockMarketMeasure.createMany({
    data: dummy,
  });

  const data = await prisma.stockMarketMeasure.findMany({
    orderBy: {
      startAt: "asc",
    },
  });
  data.forEach((el) => {
    console.log("data :>> ", el, utcDateToDateOnly(el.startAt));
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
