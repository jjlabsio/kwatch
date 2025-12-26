import type { Page } from "@playwright/test";
import { CRAWL_CONFIG } from "./constants";

/**
 * 종목명과 종목코드가 포함된 텍스트에서 종목명만 추출
 * @param stockInfoText 괄호안에 종목표준코드가 포함된 텍스트 ex) 대성창투(KR7027830009)
 * @returns 종목명 ex) 대성창투
 * @throws {Error} 유효하지 않은 형식인 경우
 */
const extractStockCode = (stockInfoText: string): string => {
  const parts = stockInfoText.split("(");
  if (parts.length === 0 || !parts[0]) {
    throw new Error(`Invalid stock info format: ${stockInfoText}`);
  }
  return parts[0].trim();
};

// 단기과열종목 예고
export const parseOverheatedNoticePopup = async (
  page: Page
): Promise<string> => {
  const stockInfoText = await page
    .locator(CRAWL_CONFIG.SELECTOR.POPUP_IFRAME)
    .contentFrame()
    .locator(CRAWL_CONFIG.SELECTOR.STOCK_INFO_CELL)
    .innerText();
  const stockCode = extractStockCode(stockInfoText);

  return stockCode;
};
