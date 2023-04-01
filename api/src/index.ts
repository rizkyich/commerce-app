import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import prisma from './prisma';

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

app.get(('/'), async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany()

    res.json(products)
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    })
  }
})

app.listen(port, () => console.log(`⚡️[server]: Server is running on PORT: ${port}`));