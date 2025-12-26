import type { StockMarketMeasure } from "@prisma/client";
import type { DateToString } from "../utils";

// ===== GET /api/test =====

/**
 * API 응답: StockMarketMeasure의 Date 필드를 string으로 변환
 * - startAt: Date → string ("YYYY-MM-DD")
 * - endAt: Date | null → string | null
 */
export type GetTestResponse = {
  today: string;
  list: MeasureList;
  filtered: MeasureList;
};

export type MeasureList = DateToString<
  Pick<
    StockMarketMeasure,
    "id" | "stockCode" | "type" | "startAt" | "endAt" | "reason"
  >
>[];

/**
 * 타입 가드: 응답 검증용 (옵션)
 */
export function isGetTestResponse(data: unknown): data is GetTestResponse {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item.id === "string" &&
        typeof item.stockCode === "string" &&
        typeof item.startAt === "string"
    )
  );
}
