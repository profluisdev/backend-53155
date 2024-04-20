import { Router } from "express";

const router = Router();

const pets = [];

router.get("/api/pets", (req, res) => {
  res.status(200).json(pets);
});

router.post("/api/pets", (req, res, next) => {
  const pet = req.body;

  if(!pet.age) return res.status(400).json({error: "se debe agregar la edad"});

  next();
} , (req, res) => {
  const pet = req.body;
  pets.push(pet);

  res.status(201).json({ message: "Mascota agregada" });
});

export default router;
