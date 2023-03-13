// Hook
import { useLocation, useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
// Interfaces
import { IStockInfo, IStockInfoFromKospiState } from "../interfaces/stockInterfaces";
// API
import { getStockInfo } from "../api/stockApi";
import { priceDownAndUp, priceDiffFormat, stockTime } from "../api/utilApi";
// Components
import Chart from "./Chart";
import Loading from "./Loading";
import News from "./News";
import Error from "./Error";
// Styled Components
import {
  Header,
  StockNameContainer,
  PriceAndDiff,
  PriceContainer,
  StockName,
  StockCode,
  DetailComparePrice,
  InfoContainer,
  InfoContainerRow,
  DetailContainer,
  Info,
} from "../styles/StockDetail.style";
import { RateCard } from "../styles/Home.style";

function StockDetail() {
  // 주소창의 파라미터 가져오기
  const { id } = useParams();
  // Link 에서 넘긴 stateProps 가져오기
  const location = useLocation();
  // refetchInterval -> 정해진 시간마다 다시 정보를 불러온다.
  // retry -> 오류 상황 발생시 다시 데이터를 불러온다.
  const { isLoading, data: stock } = useQuery<IStockInfo>(
    "stockInfo",
    () => getStockInfo(id || ""),
    {
      refetchInterval: (data) => (data && stockTime() ? 10000 : false),
      enabled: !!location?.state,
    }
  );

  if (!location?.state) return <Error />;

  const { stockInfoFromKospi } = location?.state as IStockInfoFromKospiState;

  return (
    <>
      <div>
        <Header priceDiff={priceDownAndUp(stock?.prdy_ctrt || "")}>
          <StockNameContainer>
            <Link to={"/"}>{`<`}</Link>
            <div>
              <StockName>{stockInfoFromKospi?.stockName}</StockName>
              <StockCode>{stockInfoFromKospi?.itemCode}</StockCode>
            </div>
          </StockNameContainer>
          <div>
            <PriceContainer>
              {isLoading ? null : (
                <PriceAndDiff>
                  <span>{Number(stock?.stck_prpr).toLocaleString()}</span>
                  <DetailComparePrice priceDiff={priceDownAndUp(stock?.prdy_vrss || "")}>
                    {priceDiffFormat(stock?.prdy_vrss || "")}
                  </DetailComparePrice>
                </PriceAndDiff>
              )}
              <div>
                <RateCard priceDiff={priceDownAndUp(stock?.prdy_ctrt || "")}>
                  {stock?.prdy_ctrt}%
                </RateCard>
              </div>
            </PriceContainer>
          </div>
        </Header>
        <DetailContainer>
          <Chart />
          <Info>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <InfoContainer>
                  <InfoContainerRow>
                    <span>시가</span>
                    <span>{stock?.stck_oprc?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </InfoContainerRow>
                  <InfoContainerRow>
                    <span>최고가</span>
                    <span>{stock?.stck_hgpr?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </InfoContainerRow>
                  <InfoContainerRow>
                    <span>최저가</span>
                    <span>{stock?.stck_lwpr?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </InfoContainerRow>
                  <InfoContainerRow>
                    <span>상한가</span>
                    <span>{stock?.stck_mxpr?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </InfoContainerRow>
                  <InfoContainerRow>
                    <span>하한가</span>
                    <span>{stock?.stck_llam?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </InfoContainerRow>
                  <InfoContainerRow>
                    <span>기준가</span>
                    <span>{stock?.stck_sdpr?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </InfoContainerRow>
                </InfoContainer>
                <InfoContainer>
                  <InfoContainerRow>
                    <span>누적 거래량</span>
                    <span>{stock?.acml_vol?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </InfoContainerRow>
                  <InfoContainerRow>
                    <span>누적 거래대금</span>
                    <span>{stock?.acml_tr_pbmn?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </InfoContainerRow>
                  <InfoContainerRow>
                    <span>주식 액면가 | 매매단위</span>
                    <span>{stock?.stck_fcam?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} | 1주</span>
                  </InfoContainerRow>
                  <InfoContainerRow>
                    <span>호가 단위</span>
                    <span>{stock?.aspr_unit?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </InfoContainerRow>
                  <InfoContainerRow>
                    <span>PER</span>
                    <span>{stock?.per}</span>
                  </InfoContainerRow>
                  <InfoContainerRow>
                    <span>PBR</span>
                    <span>{stock?.pbr}</span>
                  </InfoContainerRow>
                  <InfoContainerRow>
                    <span>52주 최고가</span>
                    <span>{stock?.w52_hgpr?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </InfoContainerRow>
                  <InfoContainerRow>
                    <span>52주 최저가</span>
                    <span>{stock?.w52_lwpr?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </InfoContainerRow>
                </InfoContainer>
              </>
            )}
            <News keyword={stockInfoFromKospi.stockName} />
          </Info>
        </DetailContainer>
      </div>
    </>
  );
}

export default StockDetail;
