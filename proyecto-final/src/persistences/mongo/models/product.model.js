import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: Array,
    default: [],
  },
  code: {
    type: String,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true
  },
  owner:{
    type: String,
    default: "admin"
  }
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);
