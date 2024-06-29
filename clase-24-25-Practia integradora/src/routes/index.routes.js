import { Router } from "express";
import userRoutes from "./user.routes.js";
import accountRoutes from "./account.routes.js";

const router = Router();
router.use("/user", userRoutes);
router.use("/account", accountRoutes);

export default router;
