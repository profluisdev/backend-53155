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

const update = async (query, data) => {
  return await cartModel.findOneAndUpdate(query, data, { new: true });
};

// const addProductToCart = async (cid, pid) => {
//   const product = await productModel.findById(pid);
//   if (!product) return { product: false };
//   const cart = await cartModel.findById(cid);
//   if (!cart) return { cart: false };

//   const productInCart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": 1 } });

//   if (!productInCart) {
//     await cartModel.updateOne({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } });
//   }

//   const cartUpdate = await cartModel.findById(cid);
//   // const cartUpdate = await cartModel.findById(cid).populate("products.product");
//   return cartUpdate;
// };

// const deleteProductInCart = async (cid, pid) => {
//   const product = await productModel.findById(pid);
//   if (!product) return { product: false };
//   const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": -1 } });
//   if (!cart) return { cart: false };
//   const cartUpdate = await cartModel.findById(cid);
//   return cartUpdate;
// };



// const updateQuantityProductInCart = async (cid, pid, quantity) => {
//   const product = await productModel.findById(pid);
//   if (!product) return { product: false };

//   const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": quantity } });
//   if (!cart) return { cart: false };

//   const cartUpdate = await cartModel.findById(cid);
//   return cartUpdate;
// };

// const deleteAllProductsInCart = async (cid) => {
//   const cart = await cartModel.findByIdAndUpdate(cid, { $set: { products: [] } });

//   const cartUpdate = await cartModel.findById(cid);
//   return cartUpdate;
// };

export default {
  getById,
  create,
  // addProductToCart,
  // deleteProductInCart,
  update,
  // updateQuantityProductInCart,
  // deleteAllProductsInCart,
};
