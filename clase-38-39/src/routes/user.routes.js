import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.post("/email/reset-password", userController.sendEmailResetPassword);
router.post("/reset-password", userController.resetPassword);
router.get("/premium/:uid", userController.changeUserRole);

export default router;
