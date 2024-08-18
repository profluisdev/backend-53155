import mongoose from "mongoose";
import envs from "./env.config.js";
import { logger } from "../utils/logger.js";

export const connectMongoDB = async () => {
  try {
    // Conexión con la base de datos
    mongoose.connect(envs.MONGO_URL);
    // console.log("Mongo DB Conectado");
    logger.info("Mongo DB Conectado");
  } catch (error) {
    console.log(error);
  }
};
