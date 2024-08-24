import { Router } from "express";
import cartsRouters from "./carts.routes.js";
import productsRouters from "./products.routes.js";
import sessionRouters from "./session.routes.js";
import userRouters from "./user.routes.js";
const router = Router();

router.use("/products", productsRouters);
router.use("/carts", cartsRouters);
router.use("/session", sessionRouters);
router.use("/user", userRouters);

export default router;
