import { Router } from "express";
import movementDao from "../dao/movement.dao.js";

const router = Router();

router.get("/user/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const movements = await movementDao.getAll({userId: uid});

    res.status(200).json({status: "ok", movements});
  } catch (error) {
    console.log(`Erro: ${error.message}`);
    res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
});

export default router;
