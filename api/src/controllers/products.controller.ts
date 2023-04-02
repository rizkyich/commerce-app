import { Request, Response } from 'express';
import { Container} from 'typedi';

import { ProductService } from '../services/product.service';
import { ProductResponseType } from '../types/products.type';

export class ProductController {
  public product = Container.get(ProductService);

  public getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const allProductData = await this.product.findAllProduct();
      const responseData: ProductResponseType = {
        products: allProductData,
        message: "findAll"
      }

      res.status(200).json(responseData)
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" })
    }
  }

  public getProductById = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const product = await this.product.findProductById(productId);
    
      if (!product) {
        res.status(404).json({ message: "Product not exist" })
      }

      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" })
    }
  }
}
