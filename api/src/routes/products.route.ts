import { Router } from 'express';

import { ProductController } from '../controllers/products.controller';
import Routes from '../types/routes.type';

class ProductRoute implements Routes {
  public path = "/products";
  public router = Router();
  public product = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    	this.router.get(`${this.path}`, this.product.getProducts)
  }
}

export default ProductRoute;
