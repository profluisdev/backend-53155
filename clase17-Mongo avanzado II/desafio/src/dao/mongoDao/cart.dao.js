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
  if (!product)
    return {
      product: false,
    };

  const productInCart = await cartModel.findOneAndReplace({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": 1 } });
  if (!productInCart) {
    await cartModel.findOneAndUpdate(cid, { $push: { products: { product: pid, quantity: 1 } } });
  }

  const cart = await cartModel.findById(cid);

  return cart;
};

const deleteProductInCart = async (cid, pid) => {
  const product = await productModel.findById(pid);
  if (!product)
    return {
      product: false,
    };

  const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": -1 } });
  /* 
  $inc: Este es el operador de incremento. Se utiliza para incrementar el valor de un campo numérico en la cantidad especificada.
  "products.$.quantity": 
  products: es el nombre del array 
  $:  es el operador de posición. Representa el primer elemento del array que coincide con la condición especificada 
  en el filtro de la consulta. Básicamente, este operador selecciona el elemento correcto del array para la actualización.
  quantity: es el campo del objeto dentro del array products cuyo valor queremos incrementar.
  */
  if (!cart)
    return {
      cart: false,
    };
};

export default {
  getById,
  create,
  addProductToCart,
  deleteProductInCart
};
