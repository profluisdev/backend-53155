import mongoose from "mongoose";
import { orderModel } from "./models/order.model.js";

const environment = async () => {
  await mongoose.connect("mongodb+srv://admin:admin123456@e-commerce.vn9a3yh.mongodb.net/clase17");
  //   const result = await orderModel.insertMany([
  //     { name: "Pepperoni", size: "small", price: 19,
  //       quantity: 10, date:"2021-03-13T08:14:30Z" },
  //     { name: "Pepperoni", size: "medium", price: 20,
  //       quantity: 20, date :"2021-03-13T09:13:24Z"},
  //     { name: "Pepperoni", size: "large", price: 21,
  //       quantity: 30, date :"2021-03-17T09:22:12Z"},
  //     { name: "Cheese", size: "small", price: 12,
  //       quantity: 15, date :"2021-03-13T11:21:39.736Z" },
  //     { name: "Cheese", size: "medium", price: 13,
  //       quantity:50, date : "2022-01-12T21:23:13.331Z"},
  //     { name: "Cheese", size: "large", price: 14,
  //       quantity: 10, date : "2022-01-12T05:08:13Z"},
  //     { name: "Vegan", size: "small", price: 17,
  //       quantity: 10, date : "2021-01-13T05:08:13Z"},
  //     { name: "Vegan", size: "medium", price: 18,
  //       quantity: 10, date : "2021-01-13T05:10:13Z"}
  //  ]
  // )

  const orders = await orderModel.aggregate([
    {
      // Stage 1: filtramos las pizzas por su tamaño, ya que sólo nos interesa la campaña de pizzas medianas.
      $match: { size: "medium" },
    },
    {
      // Stage 2: agrupamos las pizzas por sabor para corroborar cuántos ejemplares se vendieron de dichos sabores
      $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } },
    },
    {
      // Stage 3: Ordena los documentos ya agrupados en el paso anterior de menor a mayor
      $sort: { totalQuantity: -1 },
    },
    {
      // Stage 4:
      $group: { _id: 1, orders: { $push: "$$ROOT" } },
    },
    {
      // Stage 5
      $project: {
        _id: 0,
        orders: "$orders",
      },
    },
    {
      // Stage 6: Final
      $merge: {
        into: "reports",
      },
    },
  ]);

};

environment();
