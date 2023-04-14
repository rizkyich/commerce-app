import { PrismaClient, Product } from "@prisma/client";
import { Service } from "typedi";

import { CategoriesProductsService } from "./categoriesProduct.service";

import HttpError from "../errors/HttpError";

import { ProductCreateBodyType } from '../types/products.type';

@Service()
export class ProductService {
  public product = new PrismaClient().product;
  public cagoriesProducts = new CategoriesProductsService();
  

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
        quantity: data.quantity,
        CategoriesOnProducts: {
          create: data.categories?.map((categoryId: string) => {
            return {
              category: {
                connect: {
                  id: categoryId
                }
              }
            }
          }),
        }
      },
    });
  
    return result;
  }

  public async getRecommendedProducts(productId: string): Promise<Product[] | null> {
    let result: Product[] | null = null;

    const product = await this.product.findUniqueOrThrow({
      where: {
        id: productId
      },
      include: {
        CategoriesOnProducts: true,
      }
    })

    if (product.CategoriesOnProducts.length) {
      const categoryIdArr = product.CategoriesOnProducts.map(item => item.categoryId);

      const categoriesWithProducts = await this.cagoriesProducts.getProductsByCategoryId(categoryIdArr);

      if (categoriesWithProducts?.length) {
        result = categoriesWithProducts.map(product => product.product);
      }

    } else {
      console.log("masuk")
    }

    return result;
  }
}

