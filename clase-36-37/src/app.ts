import express from "express";
import envsConfig from "./config/envs.config";
import { MongoConfig } from "./config/mongoDb.config";

class AppServer {
  private app = express();
  private mongoConfig = new MongoConfig();
  constructor() {
    this.mongoConfig.connect();
    this.middlewares();
    this.listen();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  listen() {
    this.app.listen(envsConfig.PORT, () => {
      console.log(`Server on port ${envsConfig.PORT}`);
    });
  }
}

new AppServer();
