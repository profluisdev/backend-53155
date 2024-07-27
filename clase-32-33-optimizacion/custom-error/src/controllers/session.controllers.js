import { userResponseDto } from "../dto/user-response.dto.js";
import { createToken } from "../utils/jwt.js";

const register = async (req, res) => {
  try {
    res.status(201).json({ status: "success", msg: "Usuario Creado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const user = req.user;
    const token = createToken(user);
    // Guardamos el token en una cookie
    res.cookie("token", token, { httpOnly: true });
    const userDto = userResponseDto(user);
    return res.status(200).json({ status: "success", payload: userDto, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

const current = (req, res) => {
  try {
    const user = userResponseDto(req.user);
    return res.status(200).json({ status: "success", payload: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

const loginGoogle = async (req, res) => {
  try {
    return res.status(200).json({ status: "success", payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy();

    res.status(200).json({ status: "success", msg: "Sesión cerrada con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

export default {
  register,
  login,
  current,
  loginGoogle,
  logout,
};
