import { Handler } from "express";
import { UserServices } from "../services/user.services";
import { createToken, verifyToken } from "../utils/jwt";
import { TaskServices } from "../services/task.services";

export class UserController {
  private userService: UserServices;
  private taskService: TaskServices;

  constructor() {
    this.userService = new UserServices();
    this.taskService = new TaskServices();
  }

  registerUser: Handler = async (req, res, next) => {
    try {
      const user = await this.userService.registeUser(req.body);
      res.status(201).json({ status: "ok", user });
    } catch (error: any) {
      error.path = "[POST] /api/user/register";
      next(error);
    }
  };

  loginUser: Handler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.loginUser(email, password);
      const token = createToken({ email: user.email, _id: user._id as string });
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ status: "ok", user });
    } catch (error) {
      next(error);
    }
  };

  createTask: Handler = async (req, res, next) => {
    try {
      const userData = verifyToken(req.cookies.token);
      if (!userData) throw new Error();
      console.log(userData);
      const user = await this.userService.getUserByEmail(userData.email);
      const task = await this.taskService.createTask(req.body, user._id as string);
      res.status(200).json({ status: "ok", task });
    } catch (error) {
      next(error);
    }
  };
}
