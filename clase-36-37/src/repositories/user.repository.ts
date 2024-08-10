import { UserEntity } from "../entities/user.entity";
import { userModel } from "../models/user.model";
import { CrudRepository } from "./crud.repository";

export class UserRepository extends CrudRepository<UserEntity> {
  constructor() {
    super(userModel);
  }

  async addTaskUser(userId: string, taskId: string) {
      return await userModel.findByIdAndUpdate({_id: userId}, {$push: {tasks: {task: taskId}}}, {new: true});
  }
}
