import mongoose from "mongoose";
import fs from "fs";
import __dirname from "./dirname.js";
import { userModel } from "./user.model.js";

const environment = async () => {
    await mongoose.connect("mongodb+srv://admin:admin123456@e-commerce.vn9a3yh.mongodb.net/clase16"); 
    const response = await userModel.find({first_name: "Celia"}).explain("executionStats");
    console.log(response);
  
}

environment();


// Inyección de datos 
// const seedUsersToDb = async () => {
//   try {
//     await mongoose.connect("mongodb+srv://admin:admin123456@e-commerce.vn9a3yh.mongodb.net/clase16"); 
//     const users = await fs.promises.readFile(__dirname + "/seed/Users.json", "utf-8");
//     const usersParse = await JSON.parse(users);
//     await userModel.insertMany(usersParse);
//   } catch (error) {
//     console.log(error);
//   }
// };

// seedUsersToDb();