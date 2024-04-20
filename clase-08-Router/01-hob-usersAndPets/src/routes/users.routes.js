import { Router } from "express";

const router = Router();
const users = [];

router.use("/api/users", (req, res, next) => {
    console.log("middleware de users");

    next();
})

router.get("/api/users", (req, res) => {
    res.status(200).json(users);
})

router.post("/api/users", (req, res) => {
  const user = req.body;
  users.push(user);

  res.status(201).json({message: "Usuario agregado"})
})

export default router;