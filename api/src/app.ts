import 'reflect-metadata';
import express, {
  Application
} from 'express';
import cors from 'cors';

import Routes from './types/routes.type';
import ErrorHandler from './middlewares/error.middleware';

import { NODE_ENV, PORT } from './config';

export class App {
  public app: Application;
  public env: string;
  public port: string | number;
  
  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = parseInt(PORT as string) || 3001;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandler();
  }

  public getServer() {
    return this.app
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`)
    })
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use("/store/v1", route.router)
    })
  }

  private initializeErrorHandler() {
    this.app.use(ErrorHandler);
  }
}
