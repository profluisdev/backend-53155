import { request } from "express";
import mongoose from "mongoose";

const studentCollection = "students";

const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  dni: {
    type: String,
    unique: true,
    require: true
  },
  course: {
    type: String,
    require: true,
  },
  note: {
    type: Number,
    require: true,
  },
});

// Modelo utilizado para manejar la base de datos
export const studentModel = mongoose.model(studentCollection, studentsSchema);
