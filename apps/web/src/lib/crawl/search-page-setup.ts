import type { BrowserContext, Browser, Page } from "@playwright/test";
import { chromium } from "@playwright/test";
import { CRAWL_CONFIG } from "./constants";

export type SearchPageSetupResult = {
  page: Page;
  paginationText: string;
  totalPageCount: number;
  context: BrowserContext;
  browser: Browser;
};

/**
 * 페이지네이션 텍스트에서 전체 페이지 수 추출
 * @param paginationText "1 / 10" 형식의 텍스트
 * @returns 전체 페이지 수
 * @throws {Error} 유효하지 않은 페이지네이션 형식인 경우
 */
export function parseTotalPageCount(paginationText: string): number {
  const match = paginationText.match(/\d+\s*\/\s*(\d+)/);
  if (!match || !match[1]) {
    throw new Error(`Invalid pagination format: ${paginationText}`);
  }
  return parseInt(match[1], 10);
}

/**
 * 페이지네이션 텍스트에서 현재 페이지 번호 추출
 * @param paginationText "1 / 10" 형식의 텍스트
 * @returns 현재 페이지 번호
 * @throws {Error} 유효하지 않은 페이지네이션 형식인 경우
 */
export function parseCurrentPageNumber(paginationText: string): number {
  const match = paginationText.match(/(\d+)\s*\/\s*\d+/);
  if (!match || !match[1]) {
    throw new Error(`Invalid pagination format: ${paginationText}`);
  }
  return parseInt(match[1], 10);
}

/**
 * 공시 상세검색 페이지 설정 및 초기화
 * @param targetDate 검색할 날짜
 * @param marketActionType 시장조치 유형 (예: "단기과열종목")
 * @returns 페이지, 페이지네이션 정보, 브라우저 컨텍스트
 */
export const setupDisclosureSearchPage = async (
  targetDate: Date,
  marketActionType: string
): Promise<SearchPageSetupResult> => {
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({});
  const page = await context.newPage();

  await page.goto(CRAWL_CONFIG.URL.DISCLOSURE_SEARCH);
  await page.waitForTimeout(CRAWL_CONFIG.TIMEOUT.PAGE_LOAD);

  // 날짜 선택
  const year = targetDate.getFullYear().toString();
  const month = targetDate.getMonth().toString();
  const day = targetDate.getDate().toString();

  await page
    .getByRole("textbox", { name: CRAWL_CONFIG.LABEL.DATE_PICKER_START })
    .click();
  await page
    .locator(CRAWL_CONFIG.SELECTOR.DATEPICKER)
    .getByRole("combobox")
    .first()
    .selectOption(month);
  await page
    .locator(CRAWL_CONFIG.SELECTOR.DATEPICKER)
    .getByRole("combobox")
    .nth(1)
    .selectOption(year);
  await page
    .getByRole("cell", { name: day, exact: true })
    .getByRole("link")
    .click();

  await page
    .getByRole("textbox", { name: CRAWL_CONFIG.LABEL.DATE_PICKER_END })
    .click();
  await page
    .locator(CRAWL_CONFIG.SELECTOR.DATEPICKER)
    .getByRole("combobox")
    .first()
    .selectOption(month);
  await page
    .locator(CRAWL_CONFIG.SELECTOR.DATEPICKER)
    .getByRole("combobox")
    .nth(1)
    .selectOption(year);
  await page
    .getByRole("cell", { name: day, exact: true })
    .getByRole("link")
    .click();

  // 시장조치 체크
  await page
    .getByRole("link", { name: CRAWL_CONFIG.LABEL.MARKET_ACTION, exact: true })
    .click();
  await page
    .getByRole("checkbox", { name: marketActionType, exact: true })
    .check();

  // 검색
  await page
    .getByRole("link", { name: CRAWL_CONFIG.LABEL.SEARCH, exact: true })
    .click();
  await page.waitForTimeout(CRAWL_CONFIG.TIMEOUT.SEARCH_RESULT);

  const paginationText = await page
    .locator(CRAWL_CONFIG.SELECTOR.PAGINATION)
    .innerText();
  const totalPageCount = parseTotalPageCount(paginationText);

  return {
    page,
    paginationText,
    totalPageCount,
    context,
    browser,
  };
};
