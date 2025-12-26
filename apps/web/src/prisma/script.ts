import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import { StockMarketMeasureCreateInput } from "@prisma/models";
import { format } from "date-fns";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

type test = StockMarketMeasureCreateInput;

async function main() {
  // await prisma.stockMarketMeasure.create({
  //   data: {
  //     stockCode: "123456",
  //     type: "ATTENTION",
  //     startAt: new Date("2025-12-26"),
  //     endAt: new Date("2025-12-30"),
  //   },
  // });

  const data = await prisma.stockMarketMeasure.findMany();
  const formatted = data.map((obj) => obj.startAt);
  formatted.forEach((el) => {
    console.log("data :>> ", el, typeof el, format(el, "yyyy-MM-dd"));
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
