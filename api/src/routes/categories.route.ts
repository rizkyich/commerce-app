import { Router } from 'express';

import { CategoryController } from '../controllers/categories.controller';

import Routes from '../types/routes.type';

class CategoryRoute implements Routes {
  public path = "/categories";
  public router = Router();
  public category = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    	this.router.get(`${this.path}`, this.category.getAllCategory);
      this.router.post(`${this.path}`, this.category.creteaCategory);
      this.router.delete(`${this.path}/:categoryId`, this.category.deleteCategoryById);
  }
}

export default CategoryRoute;
