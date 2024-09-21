import { Router } from "express";
import paymentServices from "../services/payment.services.js";

const products = [
  { id: 1, name: "papas", price: 1000 },
  { id: 2, name: "queso", price: 500 },
  { id: 3, name: "hamburguesa", price: 1500 },
  { id: 4, name: "soda", price: 1000 },
  { id: 5, name: "golosinas", price: 800 },
];

const router = Router();

router.post("/payment-intents", async (req, res) => {
  const productId = req.query.id; // Obtenemos el id del producto por query
  
  // Buscamos si existe el producto
  const productRequested = products.find(
    (product) => product.id === Number(productId)
  );
  // Si el producto no existe lanzamos una error
  if (!productRequested)
    return res
      .status(404)
      .json({ status: "error", error: "Product not found" });

// Si el producto existe creamos un objeto con la data que le vamos a enviar a stripe para procesar el pago
  const paymentIntentInfo = {
    amount: productRequested.price,
    currency: "usd",
    metadata: {
      userId: "fdsajkjdfsalhdsklhlk32",
      product: JSON.stringify(productRequested)
    }
  };

  // Llamamos el servicio que crea el intento de pago
  const result = await paymentServices.createPaymentIntent(paymentIntentInfo);

  
  res.status(201).json({ status: "success", payload: result });
});

export default router;
