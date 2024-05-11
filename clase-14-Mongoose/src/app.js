import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import studentRoutes from "./routes/student.routes.js"
import { connectMongoDB } from "./config/mongoDb.config.js";

// Conexión con la base de datos
connectMongoDB();

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configuración de handlebars
app.engine("handlebars", handlebars.engine()); // Inicia el motor del la plantilla
app.set("views", __dirname + "/views"); // Indicamos que ruta se encuentras las vistas
app.set("view engine", "handlebars"); // Indicamos con que motor vamos a utilizar las vistas

app.use("/", studentRoutes);

const httpServer = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});





