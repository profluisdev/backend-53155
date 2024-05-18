import mongoose from "mongoose";
import { userModel } from "./models/user.model.js";

const environment = async () => {
  await mongoose.connect("mongodb+srv://admin:admin123456@e-commerce.vn9a3yh.mongodb.net/clase16");
 
  const users = await userModel.paginate({ gender: "Male"}, { limit: 20, page: 2});
  console.log(users);
  

};

environment();
