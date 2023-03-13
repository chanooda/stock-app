const isDev = process.env.NODE_ENV === "development";

const url = isDev ? "http://localhost:4002" : "";

const getHeader = () => {
  const token = window.localStorage.getItem("token") || "";
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return headers;
};

// 주식 api 토큰 얻기
export async function getToken() {
  try {
    const response = await fetch(url + `/api/token`);
    const data = await response.json();
    window.localStorage.setItem("token", data.token);
    return data.token;
  } catch (error) {
    console.log(error);
  }
}
// 주식 종목 정보
export async function getStockInfo(id: string) {
  try {
    const response = await fetch(url + `/api/stockCurrentInfo?id=${id}`, {
      headers: getHeader(),
    });
    const data = await response?.json();
    return data?.output;
  } catch (error) {
    console.log(error);
  }
}
// 3개월 동안의 주식 가격 변화 정보
export async function getChartData(id: string) {
  try {
    const response = await fetch(url + `/api/dateStockInfo?id=${id}`, {
      headers: getHeader(),
    });
    const data = await response?.json();
    return data.reverse()?.splice(1);
  } catch (error) {
    console.log(error);
  }
}
// 오늘 주식 차트 정보
export async function getTodayChartData(id: string) {
  try {
    const response = await fetch(url + `/api/todayStockInfo?id=${id}`, {
      headers: getHeader(),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
// 네이버 뉴스 검색 API
export async function getNews(keyword: string) {
  try {
    const response = await fetch(url + `/api/news?keyword=${keyword}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

// 코스피 종목 리스트
export async function getKospi(page: number) {
  const response = await fetch(url + `/api/kospi?page=${page}`);
  const data = await response.json();
  // react-query에서 제공하는 인피니티 스크롤 기능을 위한 page 속성
  return { data: data.stocks, nextPage: page + 1 };
}
