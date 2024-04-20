import express from "express";
import router from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", router);



app.listen(8080, () => {
  console.log("Escuchando el servidor en el puerto 8080");
});
