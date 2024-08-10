import jwt from "jsonwebtoken";
import envsConfig from "../config/envs.config";

interface JwtPayload {
  email: string;
  _id: string;
}

// Crear el token
export const createToken = (user: JwtPayload) => {
  const { _id, email } = user;
  const token = jwt.sign({ _id, email }, envsConfig.JWT_SECRET!, { expiresIn: "10m" });
  return token;
};

// Verificar el token
export const verifyToken = (token: string) => {
  try {
    const decode = jwt.verify(token, envsConfig.JWT_SECRET!) as JwtPayload;
    return decode;
  } catch (error) {
    return null;
  }
};
