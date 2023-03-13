import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";
import macaddress from "macaddress";

dotenv.config();

// .env 파일에서 API KEY 가져오기
const API_URL = "https://openapi.koreainvestment.com:9443";
const KIS_APP_KEY = process.env.KIS_APP_KEY as string;
const KIS_APP_SECRET = process.env.KIS_APP_SECRET as string;
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID as string;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET as string;

// API 요청에 쓰이는 기본 Header
const basicHeader = {
  "Content-Type": "application/json; charset=utf-8",
  appkey: KIS_APP_KEY,
  appsecret: KIS_APP_SECRET,
};
// POST 방식으로 API 접근할 때 필요한 HashKey와 안전하게 변환된 데이터
export async function getHashKey(data: object) {
  let hashKey = "";
  try {
    const response = await axios.post(API_URL + "/uapi/hashkey", data, {
      headers: {
        ...basicHeader,
      },
    });
    hashKey = response.data.HASH;
  } catch (error) {
    console.log(error);
  }
  return hashKey;
}
// API KEY를 이용해 API 요청에 필요한 Token 발급
export async function getToken(req: Request, res: Response) {
  try {
    const response = await axios.post(API_URL + "/oauth2/tokenP", {
      grant_type: "client_credentials",
      appkey: KIS_APP_KEY,
      appsecret: KIS_APP_SECRET,
    });
    return res.status(200).json({ token: response.data.access_token });
  } catch (error) {
    console.log(error);
  }
}
// TOKEN 지우기
// export async function deleteToken() {
//   const token = await getToken();
//   try {
//     const response = await axios.post(API_URL + "/oauth2/revokeP", {
//       appkey: KIS_APP_KEY,
//       appsecret: KIS_APP_SECRET,
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
// 주식 한 종목에 대한 정보 받아오기
export async function getStockCurrentInfo(req: Request, res: Response) {
  const { id } = req.query;
  const token = req.headers.authorization || "";
  let mac_address = "";
  macaddress.one(function (err, mac) {
    mac_address = mac;
  });
  const body = { FID_COND_MRKT_DIV_CODE: "J", FID_INPUT_ISCD: id };
  console.log(basicHeader);
  try {
    const response = await axios.get(API_URL + "/uapi/domestic-stock/v1/quotations/inquire-price", {
      params: body,
      headers: {
        ...basicHeader,
        authorization: token,
        tr_id: "FHKST01010100",
        tr_cont: "",
        custtype: "P",
        mac_address,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    // console.log(error);
    res.status(400).json(error);
  }
}
// 코스피 시가 총액순 목록 받아오기
export async function getKOSPI(req: Request, res: Response) {
  const { page } = req.query;
  try {
    const response = await axios.get(
      `https://m.stock.naver.com/api/index/KOSPI/enrollStocks?pageSize=20&page=${page}&type=object`
    );
    res.status(200).json(response.data);
  } catch (error: any) {
    console.log(error);
  }
}
// 날짜별 한 종목의 정보 (3달 동안의 주식 데이터 가져옴)
export async function getDateStock(req: Request, res: Response) {
  const { id } = req.query;
  const { prevDay, today } = getStockDate(false);
  const token = req.headers.authorization || "";
  const body = {
    FID_COND_MRKT_DIV_CODE: "J",
    FID_INPUT_ISCD: id,
    FID_INPUT_DATE_1: prevDay,
    FID_INPUT_DATE_2: today,
    FID_PERIOD_DIV_CODE: "0",
    FID_ORG_ADJ_PRC: "D",
  };
  try {
    const response = await axios.get(
      API_URL + "/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice",
      {
        headers: {
          ...basicHeader,
          authorization: token,
          tr_id: "FHKST03010100",
          custtype: "P",
        },
        params: body,
      }
    );
    res.status(200).json(response.data.output2);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error);
  }
}
// 오늘 하루 차트 정보
export async function getTodayStock(req: Request, res: Response) {
  const { id } = req.query;
  const { prevDay, today } = getStockDate(true);
  const token = req.headers.authorization || "";
  const body = {
    FID_COND_MRKT_DIV_CODE: "J",
    FID_INPUT_ISCD: id,
    FID_INPUT_DATE_1: prevDay,
    FID_INPUT_DATE_2: today,
    FID_PERIOD_DIV_CODE: "0",
    FID_ORG_ADJ_PRC: "D",
  };
  try {
    const response = await axios.get(
      API_URL + "/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice",
      {
        headers: {
          ...basicHeader,
          authorization: token,
          tr_id: "FHKST03010100",
          custtype: "P",
        },
        params: body,
      }
    );
    // console.log(response.data);
    res.status(200).json(response.data.output2[0]);
  } catch (error: any) {
    console.log(error?.response?.data);
    res.status(400).json(error);
  }
}
// 네이버 뉴스 검색
export async function getSearchNews(req: Request, res: Response) {
  const { keyword } = req.query;
  try {
    const response = await axios.get(`https://openapi.naver.com/v1/search/news.json`, {
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
        "Access-Control-Allow-Origin": "*",
      },
      params: {
        query: keyword,
        display: 50,
        sort: "sim",
      },
    });
    res.status(200).json(response.data.items);
  } catch (error: any) {
    console.log(error);
  }
}

// 주식 정보 기간 정하기
function getStockDate(isToday: boolean) {
  const today = new Date();
  const prevDay = new Date();
  prevDay.setDate(isToday ? today.getDate() : today.getDate() - 90);
  return {
    prevDay: prevDay.toISOString().substring(0, 10).replace(/-/g, ""),
    today: today.toISOString().substring(0, 10).replace(/-/g, ""),
  };
}
