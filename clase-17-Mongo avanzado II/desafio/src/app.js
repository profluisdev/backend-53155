import express from "express";
import router from "./routes/index.js";
import { connectMongoDB } from "./config/mongoDb.config.js";

connectMongoDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", router);



app.listen(8080, () => {
  console.log("Escuchando el servidor en el puerto 8080");
});
