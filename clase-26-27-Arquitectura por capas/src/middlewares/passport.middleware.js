import { request, response } from "express";
import passport from "passport";

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

export const authorization = (role) => {
  return async (req = request, res = response, next) => {
    if (!req.user) return res.status(401).json({ status: "error", msg: "No autorizado" });
    if (req.user.role !== role) return res.status(403).json({ status: "error", msg: "No tienes permiso" });

    next();
  };
};
