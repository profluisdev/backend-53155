import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
const router = Router();

router.post("/",passportCall("jwt"), authorization("admin"), cartsController.createCart);

router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"), cartsController.addProductToCart);

router.put("/:cid/product/:pid", passportCall("jwt"), authorization("user"), cartsController.updateQuantityProductInCart);

router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"), cartsController.deleteProductInCart);

router.get("/:cid", passportCall("jwt"), authorization("user"), cartsController.getCartById);

router.put("/:cid", passportCall("jwt"), authorization("user"), cartsController.updateCart);

router.delete("/:cid", passportCall("jwt"), authorization("user"), cartsController.deleteAllProductsInCart);

export default router;
