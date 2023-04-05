import { NextFunction, Request, Response } from 'express';
import { Container} from 'typedi';

import { ProductService } from '../services/product.service';
import { ProductResponseType } from '../types/products.type';

export class ProductController {
  public product = Container.get(ProductService);

  public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allProductData = await this.product.findAllProduct();
      const responseData: ProductResponseType = {
        products: allProductData,
        message: "findAll"
      }

      res.status(200).json(responseData)
    } catch (error) {
      next(error)
    }
  }

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;
      const product = await this.product.findProductById(productId);

      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }

  public updateProductQuantity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;
      const { quantity } = req.body;
      const product = await this.product.updateProductById(
        productId,
        {
          key: "quantity",
          value: Number(quantity),
        }
      );
      res.status(200).json(product);
    } catch (error) {
      next(error)
    }
  }

  public deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;

      await this.product.deleteProductById(productId);

      res.status(200).json({ message: `product with id ${productId} has successfuly deleted` })
    } catch (error) {
      next(error);
    }
  }

  public createNewProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.product.createProduct(req.body);

      res.status(201).json({ data: result })
    } catch (error) {
      next(error);
    }
  }
}
