import { Product, Category } from "@prisma/client";
import { PaginationResType } from "./common.type";

type ProductResponseType = {
  products: Product[],
  message?: string;
  pageInfo: PaginationResType,
};

type ProductCreateBodyType = Pick<Product,
  | "name"
  | "description"
  | "imageUrl"  
  | "price"
  | "quantity"
> & {
  categories?: string[];
}

export {
  ProductResponseType,
  ProductCreateBodyType
}