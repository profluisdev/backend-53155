import mongoose from "mongoose";
import { UserEntity } from "../entities/user.entity";

const userCollection = "users";

const userSchema = new mongoose.Schema<UserEntity>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});


export const userModel = mongoose.model<UserEntity>(userCollection, userSchema);