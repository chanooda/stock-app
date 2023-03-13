import styled from "styled-components";

export const HomeWrap = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  > header {
    width: 100%;
    padding: 20px 0px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: bold;
`;
export const StockList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  > li {
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-size: 18px;
    font-weight: 600;
  }
`;
export const StockContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    text-align: end;
  }
  @media screen and (max-width: 800px) {
    justify-content: space-between;
    & > div:first-child {
      width: auto;
    }
    & > div:nth-child(3) {
      display: none;
    }
    & > div:nth-child(4) {
      display: none;
    }
  }
`;
export const StockAttrs = styled(StockContainer)`
  padding: 10px 10px;
  margin-bottom: 15px;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  border-top: 2px solid ${(props) => props.theme.accentColor};
  border-bottom: 2px solid ${(props) => props.theme.accentColor};
`;
export const Row = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  &:first-child {
    text-align: start;
  }
  > span:nth-child(2) {
    margin-top: 3px;
    font-size: 12px;
    font-weight: 700;
    color: ${(props) => props.theme.color};
    opacity: 0.5;
  }
`;
export const PriceInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Price = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const ComparePrice = styled.div<IComparePrice>`
  font-size: 12px;
  font-weight: 700;
  color: ${(props) =>
    props.priceDiff === "down" ? "#0abde3" : props.priceDiff === "up" ? "#f53b57" : "gray"};
`;
export const Rate = styled.div`
  width: 80px;
  padding: 3px 0px;
`;
export const RateCard = styled.span<IComparePrice>`
  width: 60px;
  float: right;
  padding: 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 15px;
  font-weight: bold;
  border-radius: 5px;
  background-color: ${(props) =>
    props.priceDiff === "down" ? "#0abde3" : props.priceDiff === "up" ? "#f53b57" : "gray"};
  box-sizing: border-box;
`;
export const More = styled.div`
  padding: 10px 0px;
  text-align: center;
  background-color: ${(props) => props.theme.accentColor};
  margin-top: 10px;
  color: ${(props) => props.theme.bgColor};
  cursor: pointer;
`;
export const MoreLoading = styled.svg`
  width: 50px;
  height: 50px;
  margin: auto;
  display: block;
`;
