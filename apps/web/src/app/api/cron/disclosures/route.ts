import { crawlDisclosures } from "@/lib/crawl/disclosure-crawler";
import { getTodayTradingDateUtc } from "@/lib/date";

export async function GET(request: Request) {
  const today = getTodayTradingDateUtc();

  const result = await crawlDisclosures(today, "OVERHEATED_NOTICE");

  return Response.json(result);
}
