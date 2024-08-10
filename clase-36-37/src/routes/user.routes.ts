import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export class UserRouter {
  static get routes() {
    const router = Router();
    const userController = new UserController();
    router.post("/register", userController.registerUser);
    router.post("/login", userController.loginUser);
    router.post("/task", userController.createTask);
    return router;
  }
}
