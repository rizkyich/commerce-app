import { PrismaClient, Product } from "@prisma/client";
import { Service } from "typedi";

@Service()
export class CategoriesProductsService {
  public categoriesProducts = new PrismaClient().categoriesToProducts;

  public async findAllProductByCategoryId(categoryId: string): Promise<Product[]> {
    const result = await this.categoriesProducts.findMany({
      where: {
        categoryId,
      },
      include: {
        product: true,
      }
    })

    return result.reduce((acc, item) => {
      acc.push(item.product)
      return acc
    }, [] as Product[])
  }

  public async addCategoriesProducts(
    categoryProductIdArr: string[],
    {
      key,
      value
    } : { key: "productId" | "categoryId", value: string }
  ) {
    const data = categoryProductIdArr.map(id => {
      if (key === "productId") {
        return {
          productId: value,
          categoryId: id
        }
      }

      return {
        categoryId: value,
        productId: id
      }
    }) 

    const result = await this.categoriesProducts.createMany({ data });
  
    return result;
  }
}