import express from "express";

const app = express();

// Para que nuestro servidor express pueda interpretar en forma automática mensajes de tipo JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [];

// Método GET
app.get("/api/user", (req, res) => {
  res.status(200).json({ status: "success", payload: users });
});

// Método POST
app.post("/api/user", (req, res) => {
  // Obtenemos desde postman el body
  let user = req.body;

  // Verificamos que no falte el nombre o el apellido
  if (!user.first_name || !user.last_name) return res.status(400).json({ status: "error", msg: "first_name or last_name not found" });

  // Agregamos el usuario al array de users
  users.push(user);

  res.status(200).json({ status: "success", msg: "User created", payload: user });
});

// Método PUT
app.put("/api/user/:email", (req, res) => {
  // Obtenemos el email de los params
  let { email } = req.params;
  // Obtenemos los datos a actualizar los usuarios
  let user = req.body;

  // Buscamos la posición del user en el array para modificar
  let index = users.findIndex((user) => user.email === email);
  // Si no no se encuentra el usuario con ese mail devolvemos una respuesta
  if (index === -1) return res.status(400).json({ status: "error", msg: "User not found" });

  users[index] = {
    ...users[index], // Hacemos una copia del origina
    ...user, // sobre escribimos las propiedades modificadas
  };

  res.status(200).json({ status: "success", msg: "User edited" });
});

// Método DELETE
app.delete("/api/user/:email", (req, res) => {
  const { email } = req.params;
  // Buscamos la posición del user en el array para modificar
  let index = users.findIndex((user) => user.email === email);
  // Si no no se encuentra el usuario con ese mail devolvemos una respuesta
  if (index === -1) return res.status(400).json({ status: "error", msg: "User not found" });

  users = users.filter((user) => user.email !== email);
  res.status(200).json({ status: "success", msg: "User deleted" });
});

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
