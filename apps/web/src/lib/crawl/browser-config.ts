import type { LaunchOptions } from "@playwright/test";

/**
 * Playwright 브라우저 실행 옵션
 */
export const BROWSER_CONFIG: LaunchOptions = {
  headless: true,
  // 향후 추가 설정을 위한 확장 가능한 구조
  // timeout: 30000,
  // slowMo: 0,
  // devtools: false,
} as const;
