import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.routes.js";

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

const httpServer = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

// Configuración de socket

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  
    console.log("Nuevo cliente conectado");
    // Recibimos un evento en el socket servidor
    socket.on("message", (data) => {
        console.log(data);
    })

    // Mensaje para un socket individual, solo lo recibe un cliente
    socket.emit("socket-individual", "Este mensaje es individual");

    // Mensaje para todos menos el socket actual
    socket.broadcast.emit("socket-excluye-actua", "Este evento lo ven todos menos el socket actual que envió el mensaje")

    // Mensaje para todos
    socketServer.emit("socket-todos", "Este mensaje lo tienen que ver todos");
})


