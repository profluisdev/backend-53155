import { request, response } from "express";


export const isAdmin = (req = request, res = response, next) => {
  // Verificamos que la session del admin este en true y que haya un usuario logueado
  if(!req.session.admin || !req.session.user) {
    return res.status(401).send("No tienes permisos de administrador en esta ruta")
  }

  next();
  
}