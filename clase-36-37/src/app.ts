import express, { NextFunction, Request, Response } from "express";
import envsConfig from "./config/envs.config";
import { MongoConfig } from "./config/mongoDb.config";
import { AppRouter } from "./routes/index.routes";
import cookieParser from "cookie-parser";

class AppServer {
  private app = express();
  private mongoConfig = new MongoConfig();
  constructor() {
    this.mongoConfig.connect();
    this.middlewares();
    this.router();
    this.listen();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  router() {
    this.app.use("/api", AppRouter.routes);

    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const status = err.status || 500;
      const message = status === 500 ? "Interna Server Error" : err.message;
      if(status === 500) {
        console.log(`Path: ${err.path}, message: ${err.message}`);
      }
      
      res.status(status).json({status, message});
    })
  }

  listen() {
    this.app.listen(envsConfig.PORT, () => {
      console.log(`Server on port ${envsConfig.PORT}`);
    });
  }
}

new AppServer();
