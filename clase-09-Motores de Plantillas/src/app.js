import express from "express";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.routes.js";
import __dirname from "./dirname.js";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configuración de handlebars
app.engine("handlebars", handlebars.engine()); // Inicia el motor del la plantilla
app.set("views", __dirname + "/views"); // Indicamos que ruta se encuentras las vistas
app.set("view engine", "handlebars"); // Indicamos con que motor vamos a utilizar las vistas

app.use("/", viewsRouter);

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
