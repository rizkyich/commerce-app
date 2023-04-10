import { PrismaClient, Product } from "@prisma/client";
import { Service } from "typedi";

import HttpError from "../errors/HttpError";

import { ProductCreateBodyType } from '../types/products.type';

@Service()
export class ProductService {
  public product = new PrismaClient().product;

  public async findAllProduct(): Promise<Product[]> {
    const allProduct = await this.product.findMany();
    return allProduct;
  }

  public async findProductById(productId: string): Promise<Product | null> {
    const findProduct = await this.product.findUnique({
      where: {
        id: productId,
      }
    })

    if (!findProduct) throw new HttpError(404, `Product doesn't exist`)

    return findProduct;
  }

  public async updateProductById(productId: string, { key, value }: { key: keyof Product, value: any }) {
    await this.findProductById(productId)
  
    const result = await this.product.update({
      where: {
        id: productId,
      },
      data: {
        [key]: value
      }
    })

    return result;
  }

  public async deleteProductById(productId: string) {
    await this.findProductById(productId);

    const result = await this.product.delete({
      where: {
        id: productId,
      }
    });

    return result;
  }

  public async createProduct(data: ProductCreateBodyType) {
    const result = await this.product.create({
      data: {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        price: data.price,
        quantity: data.quantity
      },
    })
    return result;
  }
}

