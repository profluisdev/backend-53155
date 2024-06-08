import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/session", (req, res) => {
  // Si al conectarse la session existe aumentar el contador
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Se a visitado el sitio ${req.session.counter} veces`);
  } else {
    // Si no existe la session crearla
    req.session.counter = 1;
    res.send("Bienvenido al Sitio");
  }
});

router.get("/logout", (req, res) => {
  // Cerramos la session
  req.session.destroy((error) => {
    if (!error) {
      res.send("Session cerrada");
    } else {
      res.send(`Error al cerrar la session: ${error}`);
    }
  });
});

router.get("/login", (req, res) => {
  const { username, password } = req.query;
  if(username !== "pepe" || password !== "1234") {
    return res.send("Usuario o contraseña no válido");
  }

  // Almacenamos los datos en la session
  req.session.user = username; // seteamos el usuario en la session
  req.session.admin = true;
  res.send(`Bienvenido ${req.session.user}`);
});

router.get("/paneladmin", isAdmin, (req, res) => {

  res.send(`Bienvenido administrado ${req.session.user}`);
  
})

export default router;
