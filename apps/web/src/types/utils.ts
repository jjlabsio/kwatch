import type { Prisma } from "@prisma/client";

/**
 * Date 타입을 string으로 변환하는 유틸리티 타입
 * JSON.stringify() 동작을 타입 레벨에서 표현
 */
export type JsonSerialize<T> = T extends Date
  ? string
  : T extends object
    ? { [K in keyof T]: JsonSerialize<T[K]> }
    : T;

/**
 * Prisma 모델을 API 응답용 DTO로 변환
 * - Date → string (ISO 8601)
 * - DateTime → string (ISO 8601)
 */
export type ToApiResponse<T> = JsonSerialize<T>;

/**
 * 날짜 필드만 YYYY-MM-DD 형식으로 변환
 * @example
 * type User = { createdAt: Date }
 * type ApiUser = DateToString<User> // { createdAt: string }
 */
export type DateToString<T> = {
  [K in keyof T]: T[K] extends Date | null
    ? string | (null extends T[K] ? null : never)
    : T[K] extends Date
      ? string
      : T[K];
};
