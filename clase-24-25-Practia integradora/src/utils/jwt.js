import jwt from "jsonwebtoken"

export const createToken = (user) => {
  const { id, email } = user;
  const token = jwt.sign({id, email}, "codigoSecreto", {expiresIn: "1m"});
  return token;
}

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, "codigoSecreto");
    return decoded;
  } catch (error) {
    return null;
  }
}