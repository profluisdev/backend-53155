import customErrors from "../errors/customErrors.js";
import cartsRepository from "../persistences/mongo/repositories/carts.repository.js";
import productsRepository from "../persistences/mongo/repositories/products.repository.js";

const createCart = async () => {
  return await cartsRepository.create();
};

const addProductToCart = async (cid, pid, user) => {
  const product = await productsRepository.getById(pid);

  if (user.role === "premium" && product.owner === user._id) {
    throw customErrors.unauthorizedError("User not authorized");
  }
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

const purchaseCart = async (cid) => {
    const cart = await cartsRepository.getById(cid);
    let total = 0;
    const products = [];

    for( const product of cart.products) {
        const prod = await productsRepository.getById(product.product);
        if(prod.stock >= product.quantity) {
          total += prod.price * product.quantity;
        } else {
          products.push(product)
        }
         
        // Modificar los productos del carrito
        await cartsRepository.updateCart(cid, products);
    }

    return total;
}

export default {
  createCart,
  addProductToCart,
  updateQuantityProductInCart,
  deleteProductInCart,
  getCartById,
  deleteAllProductsInCart,
  purchaseCart
};
