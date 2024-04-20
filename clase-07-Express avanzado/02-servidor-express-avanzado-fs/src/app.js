import express from "express";
import { userManager } from "./UserManager.js";

const app = express();

// Para que nuestro servidor express pueda interpretar en forma automática mensajes de tipo JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Método GET
app.get("/api/user", (req, res) => {
  let users = userManager.users
  res.status(200).json({ status: "success", payload: users });
});

// Método POST
app.post("/api/user", (req, res) => {
  // Obtenemos desde postman el body
  let { first_name, last_name, email, age } = req.body;

  // Verificamos que no falte el nombre o el apellido
  if (!first_name || !last_name) return res.status(400).json({ status: "error", msg: "first_name or last_name not found" });

  // Agregamos el usuario al array de users
  userManager.addUser(first_name, last_name, age, email);

  res.status(200).json({ status: "success", msg: "User created"});
});

// Método PUT
app.put("/api/user/:email", async (req, res) => {
  // Obtenemos el email de los params
  let { email } = req.params;
  // Obtenemos los datos a actualizar los usuarios
  let user = req.body;

   const resp = await userManager.updateUser(email, user);
   if(!resp) return res.status(400).json({ status: "error", msg: "User not found" });

  res.status(200).json({ status: "success", msg: "User edited" });
});

// Método DELETE
app.delete("/api/user/:email", async (req, res) => {
  const { email } = req.params;
  const resp = await userManager.deleteUser(email);

  if(!resp) return res.status(400).json({ status: "error", msg: "User not found" });
  
  res.status(200).json({ status: "success", msg: "User deleted" });
});

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
