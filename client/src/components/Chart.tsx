import { useParams } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { getChartData, getTodayChartData } from "../api/stockApi";
import { IDatePrevStockInfo } from "../interfaces/stockInterfaces";

import Loading from "./Loading";
import { ChartContainer } from "../styles/chart.style";
import { useQuery } from "react-query";
import { stockTime } from "../api/utilApi";

import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import { memo } from "react";

function Chart() {
  const { id } = useParams();
  const isDark = useRecoilValue(isDarkAtom);

  // 3개월 가격 데이터
  const { isLoading, data: stockChart } = useQuery<IDatePrevStockInfo[]>("stockChart", () =>
    getChartData(id || "")
  );
  // 오늘 가격 데이터 주식 시장이 열려 있으면 5초마다 다시 불러옴
  const { isLoading: todayChartLoading, data: todayChart } = useQuery<IDatePrevStockInfo[]>(
    "todayChart",
    () => getTodayChartData(id || ""),
    {
      refetchInterval: (data) => {
        const val = data && stockTime() ? 10000 : false;
        return val;
      },
    }
  );

  return (
    <ChartContainer>
      {isLoading && todayChartLoading ? (
        <Loading />
      ) : (
        // ApexCharts 에서 제공하는 Chart Component
        <>
          {stockChart && todayChart && (
            <ReactApexChart
              // 차트 타입 설정
              type="candlestick"
              // 봉차트 데이터 형식 {x:data , y:[시가,최고가,최저가,종가]}
              series={[
                {
                  data:
                    stockChart?.concat(todayChart || []).map((price) => {
                      return {
                        x: price.stck_bsop_date,
                        y: [
                          Number(price.stck_oprc),
                          Number(price.stck_hgpr),
                          Number(price.stck_lwpr),
                          Number(price.stck_clpr),
                        ],
                      };
                    }) || [],
                },
              ]}
              // 차트 옵션
              options={{
                // 차트 전체적인 옵션
                chart: {
                  animations: { enabled: false },
                  type: "candlestick",
                  background: "transparent",
                },
                // Y축 옵션
                yaxis: {
                  // Y축 데이터
                  labels: {
                    // 형식
                    formatter: (value) => `${value.toLocaleString()}`,
                    // 스타일
                    style: {
                      fontSize: "13px",
                      colors: isDark ? "white" : "black",
                    },
                    // 차트로부터 거리
                    offsetX: 10,
                    offsetY: 4,
                  },
                },
                // X축
                xaxis: {
                  labels: {
                    style: { colors: isDark ? "white" : "black" },
                    // 레이블 회전
                    rotate: 0,
                  },
                  // 개수
                  tickAmount: 4,
                },
                // 차트 Hover시 뜨는 정보창 설정
                tooltip: {
                  // 설정한 data 바탕으로 정보창 custom
                  custom: function ({ w, dataPointIndex }) {
                    return `<div class="toolbox">
                    <div class="date">${w.config.series[0].data[dataPointIndex].x}</div>
                    <div>
                      <span>시가</span>
                      <span>${w.config.series[0].data[dataPointIndex].y[0].toLocaleString()}</span>
                    </div>
                    <div>
                      <span>최고가</span>
                      <span>${w.config.series[0].data[dataPointIndex].y[1].toLocaleString()}</span>
                    </div>
                    <div>
                      <span>최저가</span>
                      <span>${w.config.series[0].data[dataPointIndex].y[2].toLocaleString()}</span>
                    </div>
                    <div>
                      <span>종가</span>
                      <span>${w.config.series[0].data[dataPointIndex].y[3].toLocaleString()}</span>
                    </div>
                  </div>`;
                  },
                },
                plotOptions: {
                  candlestick: {
                    // 봉차트 색 설정
                    colors: {
                      upward: "#f53b57",
                      downward: "#0abde3",
                    },
                  },
                },
              }}
            ></ReactApexChart>
          )}
        </>
      )}
    </ChartContainer>
  );
}

export default memo(Chart);
