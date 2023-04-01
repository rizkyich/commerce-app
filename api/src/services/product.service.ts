import { PrismaClient, Product } from "@prisma/client";
import { Service } from "typedi";

@Service()
export class ProductService {
  public product = new PrismaClient().product;

  public async findAllProduct(): Promise<Product[]> {
    const allProduct = await this.product.findMany();
    return allProduct;
  }
}

