import { Product, Category } from "@prisma/client";

type ProductResponseType = {
  products: Product[],
  message: string;
}

type ProductCreateBodyType = Pick<Product,
  | "name"
  | "description"
  | "imageUrl"  
  | "price"
  | "quantity"
> & {
  categories?: string[];
};

export {
  ProductResponseType,
  ProductCreateBodyType
}