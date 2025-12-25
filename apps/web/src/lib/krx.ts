import { NextResponse } from "next/server";

type KrxMarket = "KOSPI" | "KOSDAQ" | "KONEX";

const krxBaseInfoUrl: Record<KrxMarket, string> = {
  KOSPI: "http://data-dbg.krx.co.kr/svc/apis/sto/stk_isu_base_info",
  KOSDAQ: "http://data-dbg.krx.co.kr/svc/apis/sto/ksq_isu_base_info",
  KONEX: "http://data-dbg.krx.co.kr/svc/apis/sto/knx_isu_base_info",
};

const krxTradeInfoUrl: Record<KrxMarket, string> = {
  KOSPI: "http://data-dbg.krx.co.kr/svc/apis/sto/stk_bydd_trd",
  KOSDAQ: "http://data-dbg.krx.co.kr/svc/apis/sto/ksq_bydd_trd",
  KONEX: "http://data-dbg.krx.co.kr/svc/apis/sto/knx_bydd_trd",
};

export interface BaseInfo {
  OutBlock_1: {
    /** 표준코드 (ISU_CD) */
    ISU_CD: string;
    /** 단축코드 (ISU_SRT_CD) */
    ISU_SRT_CD: string;
    /** 한글 종목명 (ISU_NM) */
    ISU_NM: string;
    /** 한글 종목약명 (ISU_ABBRV) */
    ISU_ABBRV: string;
    /** 영문 종목명 (ISU_ENG_NM) */
    ISU_ENG_NM: string;
    /** 상장일 (LIST_DD) - YYYYMMDD 형식 */
    LIST_DD: string;
    /** 시장구분 (MKT_TP_NM) */
    MKT_TP_NM: string;
    /** 증권구분 (SECUGRP_NM) */
    SECUGRP_NM: string;
    /** 소속부 (SECT_TP_NM) */
    SECT_TP_NM: string;
    /** 주식종류 (KIND_STKCERT_TP_NM) */
    KIND_STKCERT_TP_NM: string;
    /** 액면가 (PARVAL) */
    PARVAL: string;
    /** 상장주식수 (LIST_SHRS) */
    LIST_SHRS: string;
  }[];
}

/**
 * 일별 종목 시세 정보 타입
 */
export interface TradeInfo {
  OutBlock_1: {
    /** 기준일자 (BAS_DD) */
    BAS_DD: string;
    /** 종목코드 (ISU_CD) */
    ISU_CD: string;
    /** 종목명 (ISU_NM) */
    ISU_NM: string;
    /** 시장구분 (MKT_NM) */
    MKT_NM: string;
    /** 소속부 (SECT_TP_NM) */
    SECT_TP_NM: string;
    /** 종가 (TDD_CLSPRC) */
    TDD_CLSPRC: string;
    /** 대비 (CMPPREVDD_PRC) */
    CMPPREVDD_PRC: string;
    /** 등락률 (FLUC_RT) */
    FLUC_RT: string;
    /** 시가 (TDD_OPNPRC) */
    TDD_OPNPRC: string;
    /** 고가 (TDD_HGPRC) */
    TDD_HGPRC: string;
    /** 저가 (TDD_LWPRC) */
    TDD_LWPRC: string;
    /** 거래량 (ACC_TRDVOL) */
    ACC_TRDVOL: string;
    /** 거래대금 (ACC_TRDVAL) */
    ACC_TRDVAL: string;
    /** 시가총액 (MKTCAP) */
    MKTCAP: string;
    /** 상장주식수 (LIST_SHRS) */
    LIST_SHRS: string;
  }[];
}

export async function getKrxBaseInfo(
  market: KrxMarket,
  basDd: string
): Promise<BaseInfo> {
  const baseUrl = krxBaseInfoUrl[market];
  const params = {
    basDd,
  };
  const queryString = new URLSearchParams(params).toString();

  const response = await fetch(`${baseUrl}?${queryString}`, {
    headers: {
      "Content-Type": "application/json",
      AUTH_KEY: process.env.KRX_AUTH_KEY || "",
    },
  });

  const data = (await response.json()) as BaseInfo;

  return data;
}

export async function getKrxTradeInfo(
  market: KrxMarket,
  basDd: string
): Promise<TradeInfo> {
  const baseUrl = krxTradeInfoUrl[market];
  const params = {
    basDd,
  };
  const queryString = new URLSearchParams(params).toString();

  const response = await fetch(`${baseUrl}?${queryString}`, {
    headers: {
      "Content-Type": "application/json",
      AUTH_KEY: process.env.KRX_AUTH_KEY || "",
    },
  });

  const data = (await response.json()) as TradeInfo;

  return data;
}
