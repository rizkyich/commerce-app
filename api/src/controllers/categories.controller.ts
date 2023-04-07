import { NextFunction, Request, Response } from 'express';
import { Container} from 'typedi';

import { CategoryService } from '../services/category.service';
import { Category } from '@prisma/client';

export class CategoryController {
  public category = Container.get(CategoryService);

  public getAllCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allCategory = await this.category.findAllCategory();

      res.status(200).json(allCategory);
    } catch(error) {
      next(error)
    }
  }

  public deleteCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { categoryId } = req.params

      await this.category.deleteCategoryById(categoryId);

      res.status(200).json(`Category with id ${categoryId} has successfuly deleted`);
    } catch (error) {
      next(error)
    }
  }

  public creteaCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.category.createCategory(req.body);

      res.status(201).json({ data: result });
    } catch (error) {
      next(error)
    }
  }
}