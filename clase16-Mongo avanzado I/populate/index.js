import mongoose from "mongoose";
import { studentModel } from "./models/student.model.js";
import { courseModel } from "./models/course.model.js";

const environment = async () => {
  await mongoose.connect("mongodb+srv://admin:admin123456@e-commerce.vn9a3yh.mongodb.net/clase16");
//   await studentModel.create({
//     first_name: "Pepito",
//     last_name: "Suarez",
//     email: "ps@gmail.com",
//     gender: "M",
//     courses: [{ course: "6648d12107f86d6f8a3b70b9" }],
//   });

  //   await courseModel.create({
  //     title: "Curso de Backend",
  //     description: "Este es un curso para devs productivos que no copian y pegan",
  //     difficulty: 5,
  //     topics: ["Javascript", "Node", "Express"],
  //     professor: "Luis",
  //   });

  const student = await studentModel.find({_id: "6648d339f8149d71822558bf"});
  console.log(JSON.stringify(student, null, "\t"));
};

environment();
