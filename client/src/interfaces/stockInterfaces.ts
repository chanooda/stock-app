export interface IKospi {
  accumulatedTradingVolume: string;
  closePrice: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
  itemCode: string;
  marketValue: string;
  stockName: string;
  compareToPreviousPrice: { code: string; text: string };
}

export interface IKospiQuery {
  data: IKospi[];
  nextPage: number;
}

export interface IStockInfoFromKospiState {
  stockInfoFromKospi: IKospi;
  priceDiff: "up" | "same" | "down";
  priceDiffFormat: string;
}

export interface IStockInfo {
  //종목 상태 구분코드
  iscd_stat_cls_code: string;
  //대표 시장 한글 명
  rprs_mrkt_kor_name: string;
  //업종 한글 종목명
  bstp_kor_isnm: string;
  //임시 정지 여부
  temp_stop_yn: string;
  //신용 가능 여부
  crdt_able_yn: string;
  // 증거금 비율
  marg_rate: string;
  //보증금 비율 구분 코드
  grmn_rate_cls_code: string;
  //주식 현재가
  stck_prpr: string;
  //전일 대비
  prdy_vrss: string;
  //전일 대비 부호
  prdy_vrss_sign: "1" | "2" | "3" | "4" | "5";
  //전일 대비율
  prdy_ctrt: string;
  //누적 거래 대금
  acml_tr_pbmn: string;
  // 누적 거래량
  acml_vol: string;
  //전일 대비 거래량 비율
  prdy_vrss_vol_rate: string;
  // 주식 시가
  stck_oprc: string;
  // 주식 최고가
  stck_hgpr: string;
  // 주식 최저가
  stck_lwpr: string;
  // 주식 상한가
  stck_mxpr: string;
  // 주식 하한가
  stck_llam: string;
  // 주식 기준가
  stck_sdpr: string;
  per: string;
  pbr: string;
  eps: string;
  bps: string;
  //시장경고코드
  mrkt_warn_cls_code: string;
  //주식 액면가
  stck_fcam: string;
  //호가 단위
  aspr_unit: string;
  // 52주 최고가
  w52_hgpr: string;
  // 52주 최저가
  w52_lwpr: string;
}

export interface IDateTodyStockInfo {
  //전일 대비
  prdy_vrss: string;
  //전일 대비율
  prdy_ctrt: string;
  //주식 전일 종가
  stck_prdy_clpr: string;
  //누적 거래량
  acml_vol: string;
  //누적 거래 대금
  acml_tr_pbmn: string;
  //주식 현재가
  stck_prpr: string;
  //전일 거래량
  prdy_vol: string;
  //상한가
  stck_mxpr: string;
  //하한가
  stck_llam: string;
  //시가
  stck_oprc: string;
  //최고가
  stck_hgpr: string;
  //최저가
  stck_lwpr: string;
  //주식 전일 시가
  stck_prdy_oprc: string;
  //주식 전일 최고가
  stck_prdy_hgpr: string;
  //주식 전일 최저가
  stck_prdy_lwpr: string;
  askp: string;
  bidp: string;
  prdy_vrss_vol: string;
  vol_tnrt: string;
  stck_fcam: string;
  lstn_stcn: string;
  cpfn: string;
  hts_avls: string;
  per: string;
  eps: string;
  pbr: string;
  "itewhol_loan_rmnd_ratem name": string;
}

export interface IDatePrevStockInfo {
  stck_bsop_date: string;
  stck_clpr: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  acml_vol: string;
  acml_tr_pbmn: string;
  flng_cls_code: string;
  prtt_rate: string;
  mod_yn: string;
  prdy_vrss_sign: string;
  prdy_vrss: string;
  revl_issu_reas: string;
}

export interface INews {
  description: string;
  link: string;
  originallink: string;
  pubDate: string;
  title: string;
}
