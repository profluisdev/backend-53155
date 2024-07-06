import jwt from "jsonwebtoken";
import envs from "../config/env.config.js"

// Crear el token
export const createToken = (user) => {
  const { _id, email, role } = user;
  const token = jwt.sign({ _id, email, role }, envs.CODE_SECRET, { expiresIn: "1m" });
  return token;
};

// Verificar el token
export const verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, envs.CODE_SECRET);
    return decode;
  } catch (error) {
    return null;
  }
};
