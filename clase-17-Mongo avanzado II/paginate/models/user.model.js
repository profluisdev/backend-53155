import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userCollection = "user";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String
})

userSchema.plugin(mongoosePaginate);


export const userModel = mongoose.model(userCollection, userSchema);