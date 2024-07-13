import { Router } from "express";
import passport from "passport";
import sessionControllers from "../controllers/session.controllers.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

router.post("/register", passportCall("register"), sessionControllers.register);

router.post("/login", passportCall("login"), sessionControllers.login);

router.get("/current", passportCall("jwt"), authorization("user"), sessionControllers.current);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false,
  }),
  sessionControllers.loginGoogle
);

router.get("/logout", sessionControllers.logout);

export default router;
