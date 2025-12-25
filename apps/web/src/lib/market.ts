import { format } from "date-fns";

export const HOLIDAYS = {
  "2025-01-01": "신정",
  "2025-01-27": "임시공휴일",
  "2025-01-28": "설날",
  "2025-01-29": "설날",
  "2025-01-30": "설날",
  "2025-03-03": "삼일절(대체휴일)",
  "2025-05-01": "근로자의날",
  "2025-05-05": "석가탄신일",
  "2025-05-06": "어린이날(대체휴일)",
  "2025-06-03": "제21대 대통령 선거일",
  "2025-06-06": "현충일",
  "2025-08-15": "광복절",
  "2025-10-03": "개천절",
  "2025-10-06": "추석",
  "2025-10-07": "추석",
  "2025-10-08": "추석(대체휴일)",
  "2025-10-09": "한글날",
  "2025-12-25": "성탄절",
  "2025-12-31": "연말휴장일",
} as const;

export const isMarketOpenDay = (date: Date): boolean => {
  const day = date.getDay();
  if (day === 0 || day === 6) return false; // 일요일(0) 또는 토요일(6)

  const formatted = format(date, "yyyy-MM-dd"); // yyyy-MM-dd
  if (formatted in HOLIDAYS) return false; // 공휴일

  return true;
};
