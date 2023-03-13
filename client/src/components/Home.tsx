// 모듈
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";
// API
import { getKospi } from "../api/stockApi";
import { priceDiffFormat, priceDownAndUp } from "../api/utilApi";
// Interface
import { IKospiQuery } from "../interfaces/stockInterfaces";
// Styled Component
import {
  More,
  Price,
  Rate,
  Row,
  StockAttrs,
  StockList,
  PriceInfoContainer,
  Title,
  HomeWrap,
} from "../styles/Home.style";
import Loading from "./Loading";
import StockListContainer from "./StockListContainer";
import ThemeButton from "./ThemeButton";

function Home() {
  const [more, setMore] = useState(false);

  // status - fetch 상황에 대한 정보 (loading, error, success 등)
  // fetchNextPage - 이전 data에 담겨진 page 속성에 따라 새로운 데이터 가져오기 실행
  // isFetchingNextPage - 다음 페이지에 대한 데이터 접근이 진행중인지 알려줌
  const { status, data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery<IKospiQuery>(
    "projects",
    ({ pageParam = 1 }) => {
      return getKospi(pageParam);
    },
    {
      // 이전 데이터에서 받아온 파람 정보를 설정
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  useEffect(() => {
    const onScroll = async () => {
      // scrollY - document의 맨 윗부분과 현재 뷰포트의 top 부분까지의 높이 (스크롤한 길이)
      // clientHeight - element의 내부 높이
      // scrollHeight - scroll 바를 사용하지 않고 나타내는 요소의 총 길이
      const { scrollHeight } = document.documentElement;
      const { innerHeight } = window;
      const { scrollY } = window;
      // window 내의 길이와 스크롤한 길이의 합이 총 document의 길이보다 크거나 같다면 다음 데이터 불러옴
      if (innerHeight + scrollY >= scrollHeight) {
        fetchNextPage();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // document의 총 크기가 윈도우의 높이보다 작아 스크롤을 할 수 없을 때를 대비한 버튼
  useEffect(() => {
    const { clientHeight: bodyClientHeight } = document.body;
    const { clientHeight } = document.documentElement;
    if (clientHeight > bodyClientHeight) setMore(true);
    else setMore(false);
  }, [data]);
  // 더보기 버튼 클릭 이벤트
  const onClickMore = () => {
    fetchNextPage();
  };

  return (
    <HomeWrap>
      <header>
        <Title>코스피</Title>
        <ThemeButton />
      </header>
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <StockAttrs>
            <Row>
              <span>종목</span>
            </Row>
            <PriceInfoContainer>
              <Price>
                <span>시세</span>
              </Price>
              <Rate>
                <span>등락률</span>
              </Rate>
            </PriceInfoContainer>
            <Row>
              <span>시가총액(억)</span>
            </Row>
            <Row>
              <span>거래량(백만)</span>
            </Row>
          </StockAttrs>
          <StockList>
            {data?.pages.map((page, index) => (
              <li key={index}>
                {page?.data.map((el) => (
                  <Link
                    key={el.itemCode}
                    to={`/${el.itemCode}`}
                    state={{
                      stockInfoFromKospi: el,
                    }}
                  >
                    <div>
                      <StockListContainer
                        stockInfoFromKospi={el}
                        priceDiff={priceDownAndUp(el.compareToPreviousClosePrice)}
                        priceDiffFormat={priceDiffFormat(el.compareToPreviousClosePrice)}
                      />
                    </div>
                  </Link>
                ))}
              </li>
            ))}
          </StockList>
          {/* 다음 데이터를 받아오는 동안 로딩창 띄우기 */}
          {isFetchingNextPage ? <Loading /> : null}
          {/* document의 총 크기가 윈도우의 높이보다 작아 스크롤을 할 수 없을 때를 대비한 버튼 */}
          {more ? <More onClick={onClickMore}>더보기</More> : null}
        </>
      )}
    </HomeWrap>
  );
}

export default Home;
