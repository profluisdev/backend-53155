import { Router } from "express";
import { studentModel } from "../models/student.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const students = await studentModel.find();

    res.status(200).json({ status: "success", payload: students });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const newStudent = await studentModel.create(body);

    res.status(201).json({ status: "success", payload: newStudent });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentModel.findById(id);

    res.status(200).json({ status: "success", payload: student });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentModel.deleteOne({_id: id});

    res.status(200).json({ status: "success", payload: "Estudiante eliminado" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const student = await studentModel.findByIdAndUpdate(id, body);

    res.status(200).json({ status: "success", payload: student });
  } catch (error) {
    console.log(error);
  }
});

export default router;
