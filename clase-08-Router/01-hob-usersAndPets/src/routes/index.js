import { Router } from "express";
import petsRoutes from "./pets.routes.js";
import usersRoutes from "./users.routes.js";

const router = Router();

router.use("/", petsRoutes);
router.use("/", usersRoutes);

export default router;