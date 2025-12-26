import { formatInTimeZone } from "date-fns-tz";

export function dateOnlyToUtc(dateStr: string) {
  // "2025-12-26" → 2025-12-26T00:00:00.000Z
  return new Date(`${dateStr}T00:00:00.000Z`);
}

export function utcDateToDateOnly(date: Date) {
  // 항상 UTC 기준으로 날짜만 추출
  return date.toISOString().slice(0, 10);
}

export function getTodayKstDateOnly() {
  // 지금 시각을 KST로 본 날짜
  return formatInTimeZone(new Date(), "Asia/Seoul", "yyyy-MM-dd");
}

export function getTodayTradingDateUtc() {
  const kstDate = getTodayKstDateOnly(); // "2025-12-26"
  return new Date(`${kstDate}T00:00:00.000Z`);
}
