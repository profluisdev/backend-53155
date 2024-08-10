import { UserEntity } from "../entities/user.entity";
import { ErrorHandle } from "../error/errorHandle";
import { UserRepository } from "../repositories/user.repository";

export class UserServices {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async registeUser(userData: UserEntity) {
    const user = await this.userRepository.getOne({ email: userData.email });
    if (user) throw ErrorHandle.badRequest("User already exists");
    return await this.userRepository.create(userData);
  }

  async loginUser(email: string, password: string) {
    const user = await this.userRepository.getOne({ email });
    if (!user || user.password !== password) throw ErrorHandle.unauthorized("Invalid email or password");
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.getOne({ email });
    if(!user) throw ErrorHandle.notFound("User not found");
    return user;
  }
}
