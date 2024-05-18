import mongoose from "mongoose";

const courseCollection = "course";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: Number,
  topics: {
    type: Array,
    default: [],
  },
  professor: String,
  students: {
    type: Array,
    default: [],
  },
});

export const courseModel = mongoose.model(courseCollection, courseSchema);
