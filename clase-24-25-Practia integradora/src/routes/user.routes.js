import { Router } from "express";
import passport from "passport";
import { createToken } from "../utils/jwt.js";
import { checkLogin } from "../middlewares/checkLogin.middleware.js";

const router = Router();

router.post("/register", passport.authenticate("register"), async (req, res) => {
  try {
    res.status(201).json({ status: "ok", user: req.user });
  } catch (error) {
    console.log(`Erro: ${error.message}`);
    res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
});

router.post("/login", checkLogin, passport.authenticate("login", { session: false }), async (req, res) => {
  try {
    const token = createToken(req.user)
    
    res.cookie("token", token, { httpOnly: true});

    res.status(200).json({ status: "ok", user: req.user });
  } catch (error) {
    console.log(`Erro: ${error.message}`);
    res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
});

export default router;
