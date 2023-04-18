import { NextFunction, Request, Response } from 'express';
import { Container} from 'typedi';
import { Product } from '@prisma/client';

import { ProductService } from '../services/product.service';
import { CategoriesProductsService } from '../services/categoriesProduct.service';

import { ProductCreateBodyType, ProductResponseType } from '../types/products.type';
import { PaginationReqType } from '../types/common.type';

export class ProductController {
  public product = Container.get(ProductService);
  public categoriesProducts = Container.get(CategoriesProductsService)

  public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { categoryId, currentPage, itemsPerPage } = req.query;

      const pageInfo: PaginationReqType = {
        currentPage: Number(currentPage) || 1,
        itemsPerPage: Number(itemsPerPage) || 10,
      }
      
      const productData = await this.product.findAllProduct({
          pageInfo,
          categoryId: categoryId as string,
        });

      res.status(200).json(productData)
    } catch (error) {
      next(error)
    }
  }

  public getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { productId } = req.params;
      const product = await this.product.findProductById(productId);

      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }

  public updateProductQuantity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

  public deleteProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { productId } = req.params;

      await this.product.deleteProductById(productId);

      res.status(200).json({ message: `product with id ${productId} has successfuly deleted` })
    } catch (error) {
      next(error);
    }
  }

  public createNewProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const {
        name,
        description,
        imageUrl,
        price,
        quantity,
        categories
      } = req.body as ProductCreateBodyType;

      const product = await this.product.createProduct({
        name,
        description,
        imageUrl,
        price,
        quantity
      });

      if (categories?.length && product.id) {
        await this.categoriesProducts.addCategoriesProducts(categories, {
          key: "productId",
          value: product.id
        })
      }

      res.status(201).json(product)
    } catch (error) {
      next(error);
    }
  }


  public addProductToCategeories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;
      const { categories } = req.body;

      const result = await this.categoriesProducts.addCategoriesProducts(
        categories,
        {
          key: "productId",
          value: productId
        }
      );

      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }

  public getRecommendedProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;
      const result = await this.product.getRecommendedProducts(productId);

      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }
}
