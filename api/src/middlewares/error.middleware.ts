
import {  Request, Response, NextFunction } from "express";

import HttpError from "../errors/HttpError";

export default function ErrorHandler (error: HttpError, req: Request, res: Response, next: NextFunction ) {
  try {
    const statusCode: number = error.statusCode;
    const message: string = error.message;

    res.status(statusCode).json({ message })
  } catch(error) {
    next(error)
  }
}