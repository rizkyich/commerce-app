import axiosClient from './axiosClient'

import { CategoryType } from '@/types/categoryTypes';

export const getCategoryList = async ()  => {
  const {
    data
  }: { data: CategoryType[] } = await axiosClient({
    method: 'get',
    url: 'store/v1/categories'
  })

  return data;
}