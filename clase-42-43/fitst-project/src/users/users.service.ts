import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository.js';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async create(userData: CreateUserDto) {
    const user = await this.userRepository.create(userData);
    if (!user) throw new BadRequestException('User not create');

    return user;
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, userData: UpdateUserDto) {
    const user = await this.userRepository.update(id, userData);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.remove(id);
    if (!user) throw new NotFoundException('User not found');

    return 'User deleted';
  }
}
