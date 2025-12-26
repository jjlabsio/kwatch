import { describe, it, expect } from "vitest";
import { crawlDisclosures } from "./disclosure-crawler";

describe("crawlDetailSearch", () => {
  it(
    "투자경고종목 예고",
    async () => {
      const result = await crawlDisclosures(
        new Date("2025-04-14"),
        "OVERHEATED_NOTICE"
      );

      expect(result).toEqual([
        {
          stockCode: "노바텍",
          url: "https://kind.krx.co.kr/common/disclsviewer.do?method=search&acptno=20250414000724&docno=&viewerhost=&viewerport=",
        },
        {
          stockCode: "녹십자홀딩스2우",
          url: "https://kind.krx.co.kr/common/disclsviewer.do?method=search&acptno=20250414000775&docno=&viewerhost=&viewerport=",
        },
      ]);
    },
    1000 * 60 * 10
  );
});
