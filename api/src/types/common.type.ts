export type PaginationReqType = {
  currentPage: number;
  itemsPerPage: number;
}

export type PaginationResType = {
  totalPages: number;
} & PaginationReqType;