import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { pagination } from "../api/pagination";
import { getNews } from "../api/stockApi";
import { cleaningText, dateFormat } from "../api/utilApi";
import { INewsProps, IPaginationInfo } from "../interfaces/hookInterfaces";
import { INews } from "../interfaces/stockInterfaces";
import { Article, NewsContainer, NewsList, Page, PagesNav } from "../styles/StockDetail.style";

import Loading from "./Loading";

function News({ keyword }: INewsProps) {
  const [paginationInfo, setPaginationInfo] = useState<IPaginationInfo>();

  const { isLoading, data: news } = useQuery<INews[]>("news", () => getNews(keyword));

  useEffect(() => {
    if (news) {
      pagination(1, news, setPaginationInfo);
    }
  }, [news]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <NewsContainer>
          <NewsList>
            {paginationInfo?.articles.map((el, i) => {
              return (
                <Article key={i}>
                  <a href={el.link} target="_blank" rel="noopener noreferrer">
                    <div>
                      <h4>{cleaningText(el.title)}</h4>
                      <p>{cleaningText(el.description)}</p>
                      <span>{dateFormat(el.pubDate)}</span>
                    </div>
                  </a>
                </Article>
              );
            })}
          </NewsList>
          <PagesNav>
            {paginationInfo && paginationInfo.prev < 1 ? null : (
              <li onClick={() => pagination(paginationInfo?.prev, news || [], setPaginationInfo)}>
                이전
              </li>
            )}
            {paginationInfo?.pageNums.map((el, i) => (
              <Page
                currentPage={el === paginationInfo.currentPage ? true : false}
                key={i}
                onClick={
                  paginationInfo.currentPage !== el
                    ? () => pagination(el, news || [], setPaginationInfo)
                    : () => {}
                }
              >
                {el}
              </Page>
            ))}
            {paginationInfo && paginationInfo.next >= paginationInfo.totalPage ? null : (
              <li onClick={() => pagination(paginationInfo?.next, news || [], setPaginationInfo)}>
                다음
              </li>
            )}
          </PagesNav>
        </NewsContainer>
      )}
    </>
  );
}

export default News;
