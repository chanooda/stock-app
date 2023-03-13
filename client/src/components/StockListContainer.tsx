// Interface
import { IStockInfoFromKospiState } from "../interfaces/stockInterfaces";
// Styled Components
import {
  ComparePrice,
  Price,
  PriceInfoContainer,
  Rate,
  RateCard,
  Row,
  StockContainer,
} from "../styles/Home.style";

function StockListContainer({
  stockInfoFromKospi,
  priceDiff,
  priceDiffFormat,
}: IStockInfoFromKospiState) {
  return (
    <StockContainer>
      <Row>
        <span> {stockInfoFromKospi.stockName}</span>
        <span>{stockInfoFromKospi.itemCode}</span>
      </Row>
      <PriceInfoContainer>
        <Price>
          <span>{stockInfoFromKospi.closePrice}</span>
          {/* priceDownAndUp 함수 -> 가격차이 음수면 down 위면 up 같으면 same을 반환해줌 */}
          <ComparePrice priceDiff={priceDiff}>{priceDiffFormat}</ComparePrice>
        </Price>
        <Rate>
          <RateCard priceDiff={priceDiff}>{stockInfoFromKospi.fluctuationsRatio}%</RateCard>
        </Rate>
      </PriceInfoContainer>
      <Row>
        <span>{stockInfoFromKospi.marketValue}</span>
      </Row>
      <Row>
        <span>{stockInfoFromKospi.accumulatedTradingVolume}</span>
      </Row>
    </StockContainer>
  );
}

export default StockListContainer;
