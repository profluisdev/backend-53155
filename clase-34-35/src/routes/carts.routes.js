import { Router } from "express";

import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middleware.js";
import cartsControllers from "../controllers/carts.controllers.js";
import { isUserCart } from "../middlewares/isUserCart.js";
const router = Router();

router.post("/", passportCall("jwt"), authorization("admin"), cartsControllers.createCart);

router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart, isUserCart, cartsControllers.addProductToCart);

router.put(
  "/:cid/product/:pid",
  passportCall("jwt"),
  authorization("user"),
  checkProductAndCart,
  cartsControllers.updateQuantityProductInCart
);

router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart, cartsControllers.deleteProductInCart);

router.get("/:cid", passportCall("jwt"), authorization("user"), cartsControllers.getCartById);

router.delete("/:cid", passportCall("jwt"), authorization("user"), cartsControllers.deleteAllProductsInCart);

router.get("/:cid/purchase", passportCall("jwt"), authorization("user"), cartsControllers.purchaseCart);

export default router;
