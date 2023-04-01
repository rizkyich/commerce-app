import { Product } from "@prisma/client";

type ProductResponseType = {
  products: Product[],
  message: string;
}

export {
  ProductResponseType
}