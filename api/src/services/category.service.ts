import { PrismaClient, Category } from "@prisma/client";
import { Service } from "typedi";

import HttpError from "../errors/HttpError";

@Service()
export class CategoryService {
  public category = new PrismaClient().category;

  public async findAllCategory(): Promise<Category[]> {
    const allCategory = await this.category.findMany();
    return allCategory;
  }

  public async findCategoryById(categoryId: string) {
    const category = await this.category.findUnique({
      where: {
        id: categoryId,
      },
    })

    if (!category) throw new HttpError(404, "Category doesn't exist");

    return category;
  }

  public async createCategory(categoryData: Category) {
    const result = await this.category.create({
      data: { ...categoryData  }
    })

    return result;
  }

  public async deleteCategoryById(categoryId: string) {
    await this.findCategoryById(categoryId)

    const result = await this.category.delete({
      where: {
        id: categoryId,
      },
    });

    return result;
  }
}

