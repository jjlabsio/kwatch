import type { Page, Locator, BrowserContext, Browser } from "@playwright/test";
import { MarketMeasureType } from "@prisma/client";
import { parseOverheatedNoticePopup } from "./disclosure-parser";
import { parseCurrentPageNumber, setupDisclosureSearchPage } from "./search-page-setup";
import { CRAWL_CONFIG } from "./constants";

type DisclosureType = Extract<MarketMeasureType, "OVERHEATED_NOTICE">;

type DisclosureRuleConfig = {
  marketActionType: string;
  linkRegex: RegExp;
  parsePopupFn: (page: Page) => Promise<string>;
};

export const disclosureRuleMap: Record<DisclosureType, DisclosureRuleConfig> = {
  //   // 투자경고종목 예고
  //   warningNotice: {
  //     marketAction: "투자주의종목",
  //     // "투자경고종목 지정예고" 포함
  //     linkRegex: /투자\s*경고\s*종목\s*지정\s*예고/,
  //     popupCrawlFn: crawlWarningAssignPopup,
  //   },
  //   // 투자경고종목 지정
  //   warningAssign: {
  //     marketAction: "투자경고종목",
  //     // "투자경고종목 지정" 또는 "투자경고종목지정"으로 시작하는 텍스트
  //     linkRegex: /^투자경고종목\s*지정/,
  //     popupCrawlFn: crawlWarningAssignPopup,
  //   },
  //   // 투자경고종목 해제
  //   warningRelease: {
  //     marketAction: "투자주의종목",
  //     linkRegex: /\[투자주의\]투자경고종목 지정해제 및 재지정 예고/,
  //     popupCrawlFn: crawlWarningAssignPopup,
  //   },
  //   // 투자위험종목 예고
  //   riskNotice: {
  //     marketAction: "투자위험종목",
  //     // 제목이 "투자위험종목 지정예고"을 포함하는 경우
  //     linkRegex: /투자위험종목 지정예고/,
  //     popupCrawlFn: crawlWarningAssignPopup,
  //   },
  //   // 투자위험종목 지정
  //   riskAssign: {
  //     marketAction: "투자위험종목",
  //     // 제목이 정확히 "투자위험종목 지정"이거나 "투자위험종목 지정("을 포함하는 경우
  //     linkRegex: /^(투자위험종목 지정$|투자위험종목 지정\()/,
  //     popupCrawlFn: crawlWarningAssignPopup,
  //   },
  //   // 투자위험종목 해제
  //   riskRelease: {
  //     marketAction: "투자위험종목",
  //     linkRegex: /투자위험종목\s*지정해제/,
  //     popupCrawlFn: crawlWarningAssignPopup,
  //   },
  //   tradingSuspensionInWarning: {
  //     marketAction: "매매거래정지및정지해제(투자경고종목)",
  //     linkRegex: /매매거래\s*정지\s*및\s*재개\s*\(투자경고종목\s*지정중\)/,
  //     popupCrawlFn: crawlWarningAssignPopup,
  //   },
  //   tradingSuspensionInRisk: {
  //     marketAction: "매매거래정지및정지해제(투자위험종목)",
  //     linkRegex: /매매거래\s*정지\s*및\s*재개\s*\(투자위험종목\s*최초지정\)/,
  //     popupCrawlFn: crawlWarningAssignPopup,
  //   },
  // 단기과열종목 예고
  OVERHEATED_NOTICE: {
    marketActionType: "단기과열종목",
    // "(예고)단기과열종목" 포함
    linkRegex: /\(예고\)\s*단기\s*과열\s*종목/,
    parsePopupFn: parseOverheatedNoticePopup,
  },
  //   // 단기과열종목 지정
  //   overHeatedAssign: {
  //     marketAction: "단기과열종목",
  //     // “단기과열종목” 포함 && “예고” 미포함 && “연장” 미포함
  //     linkRegex: /^(?!.*예고)(?!.*연장).*단기과열종목/,
  //     popupCrawlFn: crawlOverHeatWarningPopup,
  //   },
  //   // 단기과열종목 연장
  //   overHeatedExtend: {
  //     marketAction: "단기과열종목",
  //     // “지정 연장” 포함
  //     linkRegex: /지정\s*연장/,
  //     popupCrawlFn: crawlOverHeatWarningPopup,
  //   },
};

export type DisclosureCrawlResult = {
  stockCode: string;
  url: string;
};

/**
 * 팝업 클릭 및 페이지 반환
 * @param cell 클릭할 셀
 * @param page 현재 페이지
 * @returns 팝업 페이지
 */
async function handlePopupClick(cell: Locator, page: Page): Promise<Page> {
  const popupPagePromise = page.waitForEvent("popup");
  const link = await cell.getByRole("link").first();
  await link.click();
  return await popupPagePromise;
}

/**
 * 공시 정보 크롤링
 * @param targetDate 검색할 날짜
 * @param disclosureType 공시 유형
 * @returns 종목코드와 URL 목록
 */
export const crawlDisclosures = async (
  targetDate: Date,
  disclosureType: DisclosureType
): Promise<DisclosureCrawlResult[]> => {
  const { marketActionType, linkRegex, parsePopupFn } =
    disclosureRuleMap[disclosureType];

  let context: BrowserContext | null = null;
  let browser: Browser | null = null;

  try {
    const setupResult = await setupDisclosureSearchPage(
      targetDate,
      marketActionType
    );
    context = setupResult.context;
    browser = setupResult.browser;
    const { page, totalPageCount } = setupResult;

    const results: DisclosureCrawlResult[] = [];
    let currentPageNumber = 1;

    // 페이지별 크롤링
    while (currentPageNumber <= totalPageCount) {
      await page.waitForTimeout(CRAWL_CONFIG.TIMEOUT.PAGE_LOAD);

      const cells = await page.getByRole("cell", { name: linkRegex }).all();

      for (const cell of cells) {
        let popupPage: Page | null = null;
        try {
          popupPage = await handlePopupClick(cell, page);
          const stockCode = await parsePopupFn(popupPage);
          results.push({ stockCode, url: popupPage.url() });
        } finally {
          if (popupPage) {
            await popupPage.close();
          }
        }
      }

      // 마지막 페이지 확인
      if (currentPageNumber === totalPageCount) {
        break;
      }

      await page.locator(CRAWL_CONFIG.SELECTOR.NEXT_PAGE).click();
      currentPageNumber++;
    }

    return results;
  } finally {
    // 에러 발생 시에도 브라우저 정리 보장
    if (context) {
      await context.close();
    }
    if (browser) {
      await browser.close();
    }
  }
};
