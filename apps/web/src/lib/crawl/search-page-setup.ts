import type { BrowserContext, Browser, Page } from "@playwright/test";
import { chromium } from "@playwright/test";
import { CRAWL_CONFIG } from "./constants";
import { BROWSER_CONFIG } from "./browser-config";

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
 * 날짜 선택 (시작/종료 날짜에 동일한 날짜 적용)
 * @param page Playwright 페이지
 * @param inputLabel 입력 필드 라벨 (예: "기간 선택 첫번째")
 * @param targetDate 선택할 날짜
 */
async function selectDate(
  page: Page,
  inputLabel: string,
  targetDate: Date
): Promise<void> {
  const year = targetDate.getFullYear().toString();
  const month = targetDate.getMonth().toString();
  const day = targetDate.getDate().toString();

  await page.getByRole("textbox", { name: inputLabel }).click();

  const datepicker = page.locator(CRAWL_CONFIG.SELECTOR.DATEPICKER);
  await datepicker.getByRole("combobox").first().selectOption(month);
  await datepicker.getByRole("combobox").nth(1).selectOption(year);
  await page
    .getByRole("cell", { name: day, exact: true })
    .getByRole("link")
    .click();
}

/**
 * 시장조치 체크박스 선택
 * @param page Playwright 페이지
 * @param marketActionType 시장조치 유형 (예: "단기과열종목")
 */
async function selectMarketAction(
  page: Page,
  marketActionType: string
): Promise<void> {
  await page
    .getByRole("link", { name: CRAWL_CONFIG.LABEL.MARKET_ACTION, exact: true })
    .click();
  await page
    .getByRole("checkbox", { name: marketActionType, exact: true })
    .check();
}

/**
 * 검색 실행 및 결과 페이지 정보 반환
 * @param page Playwright 페이지
 * @param context 브라우저 컨텍스트
 * @param browser 브라우저 인스턴스
 * @returns 검색 페이지 설정 결과
 */
async function executeSearch(
  page: Page,
  context: BrowserContext,
  browser: Browser
): Promise<SearchPageSetupResult> {
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
  const browser = await chromium.launch(BROWSER_CONFIG);

  const context = await browser.newContext({});
  const page = await context.newPage();

  await page.goto(CRAWL_CONFIG.URL.DISCLOSURE_SEARCH);
  await page.waitForTimeout(CRAWL_CONFIG.TIMEOUT.PAGE_LOAD);

  // 날짜 선택
  await selectDate(page, CRAWL_CONFIG.LABEL.DATE_PICKER_START, targetDate);
  await selectDate(page, CRAWL_CONFIG.LABEL.DATE_PICKER_END, targetDate);

  // 시장조치 선택
  await selectMarketAction(page, marketActionType);

  // 검색 및 결과 반환
  return await executeSearch(page, context, browser);
};
