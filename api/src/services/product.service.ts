import { PrismaClient, Product } from "@prisma/client";
import { Service } from "typedi";

export class ProductService {
  public product = new PrismaClient().product;

  public async findAllProduct(): Promise<Product[]> {
    const allProduct = await this.product.findMany();
    return allProduct;
  }

  public async findProductById(productId: string): Promise<Product | null> {
    const product = await this.product.findUnique({
      where: {
        id: productId,
      }
    })

    return product;
  }
}

