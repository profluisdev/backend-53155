import { TaskEntity } from "../entities/task.entity";
import { TaskRepository } from "../repositories/task.repository";
import { UserRepository } from "../repositories/user.repository";

export class TaskServices {
  private taskRepository: TaskRepository;
  private userRepository: UserRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
    this.userRepository = new UserRepository();
  }

  async createTask(task: TaskEntity, userId: string) {
    const newTask = await this.taskRepository.create(task);
    return await this.userRepository.addTaskUser(userId, newTask._id as string);
  }

}