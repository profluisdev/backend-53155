import { Router } from "express";

import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middleware.js";
import cartsControllers from "../controllers/carts.controllers.js";
import { isUserCart } from "../middlewares/isUserCart.js";
const router = Router();


router.post("/:cid/product/:pid", passportCall("jwt"), authorization(["user", "premium"]), checkProductAndCart, isUserCart, cartsControllers.addProductToCart);

router.put(
  "/:cid/product/:pid",
  passportCall("jwt"),
  authorization("user"),
  checkProductAndCart,
  cartsControllers.updateQuantityProductInCart
);

router.delete("/:cid/product/:pid", passportCall("jwt"), authorization(["user", "premium"]), checkProductAndCart, cartsControllers.deleteProductInCart);

router.get("/:cid", passportCall("jwt"), authorization(["user", "premium"]), cartsControllers.getCartById);

router.delete("/:cid", passportCall("jwt"), authorization(["user", "premium"]), cartsControllers.deleteAllProductsInCart);

router.get("/:cid/purchase", passportCall("jwt"), authorization(["user", "premium"]), cartsControllers.purchaseCart);

export default router;
