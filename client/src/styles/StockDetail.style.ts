import styled from "styled-components";
import { ComparePrice } from "./Home.style";

export const Header = styled.header<IComparePrice>`
  width: 100%;
  padding: 20px 10px;
  position: fixed;
  top: 0px;
  z-index: 100;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bgColor};
  border-bottom: 1px solid
    ${(props) =>
      props.priceDiff === "up"
        ? props.theme.accentColor
        : props.priceDiff === "down"
        ? props.theme.downColor
        : "gray"};
`;

export const StockNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  a {
    display: block;
    margin-bottom: 5px;
    font-size: 30px;
    font-weight: bold;
  }
`;

export const PriceAndDiff = styled.div`
  &:first-child {
    font-size: 25px;
  }
`;

export const DetailComparePrice = styled(ComparePrice)<IComparePrice>`
  font-size: 15px;
  text-align: end;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const DetailContainer = styled.div`
  margin-top: 91px;
  display: flex;
  padding: 10px;
  @media screen and (max-width: 1150px) {
    flex-direction: column;
  }
`;

export const StockName = styled.h2`
  font-size: 22px;
  font-weight: bold;
`;

export const StockCode = styled.span`
  font-size: 15px;
  opacity: 0.5;
  font-weight: 600;
`;

export const Info = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media screen and (max-width: 1150px) {
    width: 100%;
  }
`;

export const InfoContainer = styled.div`
  padding: 30px 30px 15px 30px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  background-color: ${(props) => props.theme.box};
  border-radius: 10px;
  box-sizing: border-box;
`;

export const InfoContainerRow = styled.div`
  width: calc((100% - 10px) / 2);
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  > span:first-child {
    font-size: 15px;
    color: ${(props) => props.theme.accentColor};
    font-weight: bold;
  }
  > span:last-child {
    font-size: 15px;
    font-weight: bold;
  }
  @media screen and (max-width: 1800px) {
    width: calc(100% / 1);
  }
`;

export const NewsContainer = styled(InfoContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
`;

export const NewsList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Article = styled.li`
  h4 {
    font-size: 18px;
    margin-bottom: 10px;
    color: ${(props) => props.theme.accentColor};
  }
  p {
    font-size: 15px;
    color: ${(props) => props.theme.color};
    line-height: 1.4;
  }
  span {
    display: inline-block;
    margin-top: 10px;
    font-size: 13px;
    color: rgba(204, 204, 204, 1);
  }
  padding: 25px 0px;
`;

export const PagesNav = styled.ul`
  width: 100%;
  padding: 5px 0px;
  display: flex;
  justify-content: center;
  gap: 15px;
  > li {
    cursor: pointer;
    padding: 5px 10px;
    background-color: ${(props) => props.theme.bgColor};
    border-radius: 5px;
    font-weight: bold;
  }
  @media screen and (min-width: 860px) and (max-width: 1015px) {
    gap: 5px;
  }
`;
export const Page = styled.li<IPageProps>`
  color: ${(props) => (props.currentPage ? props.theme.accentColor : props.theme.color)};
`;

export const ErrorMessage = styled.div`
  font-size: 30px;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: ${(props) => props.theme.accentColor};
  }
`;
