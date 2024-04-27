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

let messages = [];

// Tarea: Intentar guardar los mensajes en un archivo JSON 

socketServer.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");

  socket.on("message", (data) => {
    // Guardar el mensaje del usuario en el array
    messages.push(data);
    // Enviamos el array de mensajes actualizado a todos los clientes
    socketServer.emit("messageLog", messages);
  })

  // Recibimos el usuario conectado
  socket.on("newUser", (data) => {
    
    // Enviamos el usuario recibido a todos los usuarios conectados menos al usuario que se acaba de conectar
    socket.broadcast.emit("newUser", data)
  })
})


