import axiosClient from './axiosClient'

import { ProductType } from '@/types/productTypes';

export const getProductList = async (
  categoryId?: string
)  => {
  const {
    data
  }: { data: ProductType[] } = await axiosClient({
    method: 'get',
    url: `store/v1/products${categoryId ? '?categoryId=' + categoryId : ''}`
  })
  return data;
}