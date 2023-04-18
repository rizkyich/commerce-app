import { PaginationType } from "./common";

export type ProductType = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string; 
}

export type ProductsResponseType = {
  products: ProductType[],
  pageInfo: PaginationType,
}