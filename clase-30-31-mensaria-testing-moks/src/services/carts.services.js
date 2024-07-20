import cartsRepository from "../persistences/mongo/repositories/carts.repository.js";

const createCart = async () => {
  return await cartsRepository.create();
};

const addProductToCart = async (cid, pid) => {
  return await cartsRepository.addProductToCart(cid, pid);
};

const updateQuantityProductInCart = async (cid, pid, quantity) => {
  return await cartsRepository.updateQuantityProductInCart(cid, pid, quantity);
};

const deleteProductInCart = async (cid, pid) => {
  return await cartsRepository.deleteProductInCart(cid, pid);
};

const getCartById = async (id) => {
  return await cartsRepository.getById(id);
};

const deleteAllProductsInCart = async (cid) => {
  return await cartsRepository.deleteAllProductsInCart(cid);
};

export default {
  createCart,
  addProductToCart,
  updateQuantityProductInCart,
  deleteProductInCart,
  getCartById,
  deleteAllProductsInCart,
};
