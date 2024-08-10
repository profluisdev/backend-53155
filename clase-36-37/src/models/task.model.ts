import mongoose from "mongoose";
import { TaskEntity } from "../entities/task.entity";


const taskCollection = "tasks";

const taskSchema = new mongoose.Schema<TaskEntity>({
  description: { type: String, required: true },
  done: { type: Boolean, default: false },
});

export const taskModel = mongoose.model<TaskEntity>(taskCollection, taskSchema);
