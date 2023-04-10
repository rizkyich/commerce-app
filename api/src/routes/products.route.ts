import { Router } from 'express';

import { ProductController } from '../controllers/products.controller';
import Routes from '../types/routes.type';

class ProductRoute implements Routes {
  public path = "/products";
  public router = Router();
  public product =   new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    	this.router.get(`${this.path}`, this.product.getProducts);
      this.router.post(`${this.path}`, this.product.createNewProduct);
      this.router.get(`${this.path}/:productId`, this.product.getProductById);
      this.router.put(`${this.path}/:productId`, this.product.updateProductQuantity);
      this.router.delete(`${this.path}/:productId`, this.product.deleteProductById);
      this.router.post(`${this.path}/:productId/add-categories`, this.product.addProductToCategeories);
  }
}

export default ProductRoute;
