import axiosClient from './axiosClient'

import { ProductsResponseType } from '@/types/productTypes';
import { PaginationType } from '@/types/common';

export const getProductList = async ({
  categoryId,
  pageInfo, 
}: {
  categoryId?: string;
  pageInfo: PaginationType;
})  => {
  const paramObj = {
    ...( categoryId && { categoryId }),
    itemsPerPage: (pageInfo.itemsPerPage || 10).toString(),
    currentPage: (pageInfo.currentPage || 1).toString(),
  }

  const searhParams = new URLSearchParams(paramObj);

  const {
    data
  }: { data: ProductsResponseType } = await axiosClient({
    method: 'get',
    url: `store/v1/products?${searhParams}`
  })
  return data;
}