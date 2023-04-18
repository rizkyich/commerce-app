import { PrismaClient, Product } from "@prisma/client";
import { Service } from "typedi";

import { CategoriesProductsService } from "./categoriesProduct.service";

import HttpError from "../errors/HttpError";

import { ProductCreateBodyType, ProductResponseType } from '../types/products.type';
import { PaginationReqType } from "../types/common.type";

@Service()
export class ProductService {
  public prisma = new PrismaClient();
  public product = this.prisma.product;
  public cagoriesProducts = new CategoriesProductsService();
  

  public async findAllProduct({
    pageInfo,
    categoryId
  }: {
    pageInfo: PaginationReqType;
    categoryId: string;
  }): Promise<ProductResponseType> {

    const [products, count] = await this.prisma.$transaction([
      this.product.findMany({
        where: (categoryId ? {
          CategoriesOnProducts: {
            some: {
              categoryId
            }
          }
        }: {}),
        skip: (pageInfo.currentPage - 1) * pageInfo.itemsPerPage,
        take: pageInfo.itemsPerPage,
      }),
      this.product.count(),
    ])

    const pageInfoObj = {
      ...pageInfo,
      totalPages: Math.ceil(count / pageInfo.itemsPerPage),
    }

    return { 
      products,
      pageInfo: pageInfoObj,
    };
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

  public async getRecommendedProducts(productId: string): Promise<Product[]> {
    let result: Product[] = [];

    // find categories of the product
    const product = await this.product.findUniqueOrThrow({
      where: {
        id: productId
      },
      include: {
        CategoriesOnProducts: true,
      }
    })

    // when categories exist
    if (product.CategoriesOnProducts.length) {
      const categoryIdArr = product.CategoriesOnProducts.map(item => item.categoryId);

      // get all products within the same category
      const categoriesWithProducts = await this.cagoriesProducts.getProductsByCategoryId(categoryIdArr);
      
      if (categoriesWithProducts) {
        result = [
          ...categoriesWithProducts
              .map(categoryProduct => categoryProduct.product)
              .filter(product => product.id !== productId)
        ];
      }
    }

    // when recommended products is still below 3 items
    if (result.length < 3) {
      // find all the other products ordered by quantity items
      const otherProducts = await this.product.findMany({
        where: {
          NOT: {
            id: productId
          }
        },
        orderBy: {
          quantity: 'desc'
        }
      })

      // set distincts product
      result =  Object.values(
        [...result, ...otherProducts].reduce((acc, product: Product) => ({...acc, [product.id]: product}) ,{})
      )
    }

    // make recommended list item to only have 3 item
    result.length = 3;

    return result;
  }
}

