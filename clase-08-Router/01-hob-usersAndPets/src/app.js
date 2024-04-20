import express from "express";
import router from "./routes/index.js"

const app = express();
// Middlewares: son operaciones que se ejecutan de manera intermedia entre la petición del cliente, y el servicio de nuestro servidor.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(8080, () => {
  console.log("Escuchando servidor en el puerto 8080");
});
