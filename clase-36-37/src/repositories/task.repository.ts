import { TaskEntity } from "../entities/task.entity";
import { taskModel } from "../models/task.model";
import { CrudRepository } from "./crud.repository";

export class TaskRepository extends CrudRepository<TaskEntity>{
  constructor() {
    super(taskModel)
  }
}