import { IKospi, INews } from "./stockInterfaces";

export interface ILocationState {
  initialStockInfo: IKospi;
}

export interface INewsProps {
  keyword: string;
}

export interface IPaginationInfo {
  currentPage: number;
  articles: INews[];
  pageNums: number[];
  next: number;
  prev: number;
  totalPage: number;
}
