import { Router } from "express";
import { UserRouter } from "./user.routes";

export class AppRouter {
  static get routes() {
    const router = Router();
    router.use("/user", UserRouter.routes);
    return router;
  }
}

