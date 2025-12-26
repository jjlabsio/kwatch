/**
 * 크롤링 관련 상수 정의
 */

export const CRAWL_CONFIG = {
  // 타임아웃 설정 (밀리초)
  TIMEOUT: {
    PAGE_LOAD: 1000,
    SEARCH_RESULT: 3000,
  },

  // URL
  URL: {
    DISCLOSURE_SEARCH:
      "https://kind.krx.co.kr/disclosure/details.do?method=searchDetailsMain",
  },

  // CSS 셀렉터
  SELECTOR: {
    PAGINATION: "#main-contents .paging-group .info",
    DATEPICKER: "#ui-datepicker-div",
    NEXT_PAGE: ".next",
    POPUP_IFRAME: 'iframe[name="docViewFrm"]',
    STOCK_INFO_CELL:
      "#XFormD1_Form0_Table0 > tbody > tr:nth-child(2) > td:nth-child(2) > span",
  },

  // UI 라벨
  LABEL: {
    DATE_PICKER_START: "기간 선택 첫번째",
    DATE_PICKER_END: "기간 선택 두번째",
    MARKET_ACTION: "시장조치",
    SEARCH: "검색",
  },
} as const;
