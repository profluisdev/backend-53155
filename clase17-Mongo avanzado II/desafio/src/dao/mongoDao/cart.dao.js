import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

const getById = async (id) => {
  const cart = await cartModel.findById(id);
  return cart;
};

const create = async (data) => {
  const cart = await cartModel.create(data);
  return cart;
};

const addProductToCart = async (cid, pid) => {
  const product = await productModel.findById(pid);
  if (!product) return { product: false };
  const cart = await cartModel.findById(cid);
  if (!cart) return { cart: false };

  const productInCart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": 1 } });
  /* 
  $inc: Este es el operador de incremento. Se utiliza para incrementar el valor de un campo numérico en la cantidad especificada.
  "products.$.quantity": 
  products: es el nombre del array 
  $:  es el operador de posición. Representa el primer elemento del array que coincide con la condición especificada 
  en el filtro de la consulta. Básicamente, este operador selecciona el elemento correcto del array para la actualización.
  quantity: es el campo del objeto dentro del array products cuyo valor queremos incrementar.
  */

  if (!productInCart) {
    await cartModel.updateOne({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } });
  }

  const cartUpdate = await cartModel.findById(cid);
  // const cartUpdate = await cartModel.findById(cid).populate("products.product");
  return cartUpdate;
};

const deleteProductInCart = async (cid, pid) => {
  const product = await productModel.findById(pid);
  if (!product) return { product: false };
  const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": -1 } });
  if (!cart) return { cart: false };
  const cartUpdate = await cartModel.findById(cid);
  return cartUpdate;
};

const update = async (cid, data) => {
  await cartModel.updateOne({ _id: cid }, { $set: { products: [] } });
  await cartModel.updateOne({ _id: cid }, { $set: { products: data } });
  const cart = await cartModel.findById(cid);
  return cart;
};

const updateQuantityProductInCart = async (cid, pid, quantity) => {
  const product = await productModel.findById(pid);
  if (!product) return { product: false };

  const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": quantity } });
  if (!cart) return { cart: false };

  const cartUpdate = await cartModel.findById(cid);
  return cartUpdate;
};

const deleteAllProductsInCart = async (cid) => {
  const cart = await cartModel.findByIdAndUpdate(cid, { $set: { products: [] } });

  const cartUpdate = await cartModel.findById(cid);
  return cartUpdate;
};

export default {
  getById,
  create,
  addProductToCart,
  deleteProductInCart,
  update,
  updateQuantityProductInCart,
  deleteAllProductsInCart,
};
