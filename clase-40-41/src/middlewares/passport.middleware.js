import { request, response } from "express";
import passport from "passport";
import customErrors from "../errors/customErrors.js";

export const passportCall = (strategy) => {
    return async (req = request, res = response, next) => {
        passport.authenticate(strategy, { session: false }, (error, user, info) => {
            if (error) return next(error);
            if (!user) return res.status(401).json({ status: "error", msg: info.message ? info.message : info.toString() });

            req.user = user;

            next();
        })(req, res, next);
    };
};

export const authorization = (roles) => {
    return async (req = request, res = response, next) => {
        try {
          if(!req.user) throw customErrors.notFoundError("User not found");
          const roleAuthorized = roles.includes(req.user.role);
          if(!roleAuthorized) throw customErrors.unauthorizedError("User not authorized");

          next();
        } catch (error) {
            next(error);
        }
    };
};
