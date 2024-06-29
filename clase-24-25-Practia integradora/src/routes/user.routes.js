import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/register", passport.authenticate("register"), async (req, res) => {
  try {
    res.status(201).json({ status: "ok", user: req.user });
  } catch (error) {
    console.log(`Erro: ${error.message}`);
    res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
});

export default router;
