import type { Page } from "@playwright/test";

/**
 * 종목명과 종목코드가 포함된 텍스트에서 종목명만 추출
 * @param stockInfoText 괄호안에 종목표준코드가 포함된 텍스트 ex) 대성창투(KR7027830009)
 * @returns 종목명 ex) 대성창투
 */
const extractStockCode = (stockInfoText: string): string => {
  return (stockInfoText.split("(")[0] as string).trim();
};

// 단기과열종목 예고
export const parseOverheatedNoticePopup = async (
  page: Page
): Promise<string> => {
  const stockInfoText = await page
    .locator('iframe[name="docViewFrm"]')
    .contentFrame()
    .locator(
      "#XFormD1_Form0_Table0 > tbody > tr:nth-child(2) > td:nth-child(2) > span"
    )
    .innerText();
  const stockCode = extractStockCode(stockInfoText);

  return stockCode;
};
