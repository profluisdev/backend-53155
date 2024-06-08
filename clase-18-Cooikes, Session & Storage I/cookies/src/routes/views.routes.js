import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

// Seteamos las cookies
router.get("/setCookie", (req, res) => {
  res.cookie("usuario", "Sapo Pepe", { maxAge: 100000, signed: true }).send("Cookie Seteada");
});

// Obtenemos las cookies
router.get("/getCookie", (req, res) => {
  // res.send(req.cookies)
  if (req.signedCookies.usuario) {
    console.log(req.signedCookies.usuario);
  } else {
    console.log("La cookie fue alterada");
  }
  res.send(req.signedCookies.usuario); // Chequea que la cookie coincida con los datos seteados
});

// Borramos las cookies
router.get("/deleteCookie", (req, res) => {
  res.clearCookie("usuario").send("Cookie eliminada");
});

router.post("/setdata", (req, res) => {
  const { user, email } = req.body;
  res.cookie("user", { user: email }, { maxAge: 10000, signed: true }).send("Cookie seteada");
});

router.get("/getdata", (req, res) => {
  res.send(req.signedCookies.user)
});
export default router;
