export class Page<T> {
  results: Array<T>;
  currentPage: number;
  maxPage: number;
  resultsPerPage: number;
}
