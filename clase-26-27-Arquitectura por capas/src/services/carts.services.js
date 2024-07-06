import cartDao from "../dao/mongoDao/cart.dao.js";
import productDao from "../dao/mongoDao/product.dao.js";

const createCart = async () => {
  return await cartDao.create();
};

const addProductToCart = async (cid, pid) => {
  // Verificamos si existe el producto y el carrito
  await checkProductAndCart(cid, pid);
  const productInCart = await cartDao.update({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": 1 } });
  /* 
  $inc: Este es el operador de incremento. Se utiliza para incrementar el valor de un campo numérico en la cantidad especificada.
  "products.$.quantity": 
  products: es el nombre del array 
  $:  es el operador de posición. Representa el primer elemento del array que coincide con la condición especificada 
  en el filtro de la consulta. Básicamente, este operador selecciona el elemento correcto del array para la actualización.
  quantity: es el campo del objeto dentro del array products cuyo valor queremos incrementar.
  */

  if (!productInCart) {
    return await cartDao.update({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } });
  }

  return productInCart;
};

const updateQuantityProductInCart = async (cid, pid, quantity) => {
  await checkProductAndCart(cid, pid);
  return await cartDao.update({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": quantity } });
};

const deleteProductInCart = async (cid, pid) => {
  await checkProductAndCart(cid, pid);

  return await cartDao.update({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": -1 } });
};

const getCartById = async (id) => {
  return await cartDao.getById(id);
};

const updateCart = async (query, data) => {
  return await cartDao.update(query, data);
};

const deleteAllProductsInCart = async (cid) => {
  return await cartDao.update({ _id: cid }, { $set: { product: [] } });
};

const checkProductAndCart = async (cid, pid) => {
  const product = await productDao.getById(pid);
  if (!product) return { product: false };
  const cart = await cartDao.getById(cid);
  if (!cart) return { cart: false };
};

export default {
  createCart,
  addProductToCart,
  updateQuantityProductInCart,
  deleteProductInCart,
  getCartById,
  updateCart,
  deleteAllProductsInCart,
};
