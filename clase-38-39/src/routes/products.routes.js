import { Router } from "express";
import productsControllers from "../controllers/products.controllers.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";

const router = Router();
router.get("/", productsControllers.getAll);

router.get("/:pid", productsControllers.getById);

router.post("/", passportCall("jwt"), authorization(["admin", "premium"]), productsControllers.create);

router.put("/:pid", passportCall("jwt"), authorization(["admin", "premium"]), productsControllers.update);

router.delete("/:pid", passportCall("jwt"), authorization(["admin", "premium"]), productsControllers.deleteOne);

export default router;
