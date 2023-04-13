import { PrismaClient, Category } from "@prisma/client";
import { Service } from "typedi";

import HttpError from "../errors/HttpError";
import excludeFields from "../helpers/excludeFields";

@Service()
export class CategoryService {
  public category = new PrismaClient().category;

  public async findAllCategory(): Promise<Omit<Category, 'createdAt' | 'updatedAt'>[]> {
    const allCategory = await this.category.findMany();

    return allCategory.reduce(
      (acc, category) => {
        acc.push(excludeFields(category, ['createdAt', 'updatedAt']))

        return acc;
      }, 
      [] as Omit<Category, 'createdAt' | 'updatedAt'>[]
    );
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

