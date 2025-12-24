import { StockChart } from "@/components/stock-chart";
import { StockStats } from "@/components/stock-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";

interface StockData {
  date: string;
  close: number;
  high: number;
  low: number;
  volume: number;
}

interface StockInfo {
  symbol: string;
  name: string;
  data: StockData[];
  stats: {
    avgPrice: number;
    highPrice: number;
    lowPrice: number;
    requiredPrice: number;
    requiredTurnoverRate: number;
    requiredVolatility: number;
    avgTurnoverRate: number;
    avgVolatility: number;
    minTomorrowTurnoverRate: number;
    todayTurnoverRate: number;
    sharesOutstanding: number;
    minTradingVolume: number;
    baseDate?: string;
    targetDate?: string;
  };
}

const fetchStock = async (code: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stock`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ symbol: code }),
  });

  if (!response.ok) {
    throw Error("error");
  }

  const data = (await response.json()) as StockInfo;

  return data;
};

export async function StockContent({ code }: { code: string }) {
  const data = await fetchStock(code);

  return (
    <>
      {data && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    {data.name} ({data.symbol})
                  </CardTitle>
                  <CardDescription>단기과열종목 지정 조건 분석</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <StockChart data={data.data} />
            </CardContent>
          </Card>

          <StockStats stats={data.stats} />
        </div>
      )}
    </>
  );
}
