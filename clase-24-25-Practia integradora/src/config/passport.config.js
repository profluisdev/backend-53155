import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import userServices from "../services/user.services.js";
import accountServices from "../services/account.services.js";
import { createHash } from "../utils/hashPassword.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;

export const initializePassport = () => {
  // Estrategia local registro
  passport.use(
    "register",
    new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
      try {
        const { name, lastName } = req.body;
        const user = await userServices.getOnUser({ email: username });
        if (user) return done(null, false, { message: "El usuario ya existe" });

        const accountUser = await accountServices.createAccount({ name, lastName });

        const newUser = {
          name,
          lastName,
          email: username,
          password: createHash(password),
          account: accountUser._id,
        };

        const createUser = await userServices.registerUser(newUser);

        await accountServices.updateAccount(accountUser._id, { userId: createUser._id })

        return done(null, createUser);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userServices.getOnUser({ _id: id });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};


