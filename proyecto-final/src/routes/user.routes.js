import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { upload } from "../utils/uploadFiles.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

router.post("/email/reset-password", userController.sendEmailResetPassword);
router.post("/reset-password", userController.resetPassword);
router.get("/premium/:uid", userController.changeUserRole);
router.post(
    "/:uid/documents",
    passportCall("jwt"),
    authorization(["user", "premium"]),
    upload.fields([
        { name: "profile", maxCount: 1 },
        { name: "imgProduct", maxCount: 1 },
        { name: "document", maxCount: 3 },
    ]),
    userController.addDocuments
);

export default router;
