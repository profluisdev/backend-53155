import mongoose from "mongoose";

const userCollection = "user";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  age: Number,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
});

export const userModel = mongoose.model(userCollection, userSchema);
