import { request, response } from "express";
import productsServices from "../services/products.services.js";
import cartsServices from "../services/carts.services.js";

export const checkProductAndCart = async (req = request, res = response, next) => {
  const { cid, pid } = req.params;
  const product = await productsServices.getById(pid);
  const cart = await cartsServices.getCartById(cid);

  if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
  if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

  next();
};
