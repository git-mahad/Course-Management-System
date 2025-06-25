import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<Partial<User>[]> {
    const users = await this.userRepository.find();
    return users.map(({ password, ...user }) => user);
  }

  async getUserById(id: number): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateUserStatus(
    id: number,
    isActive: boolean,
  ): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    user.isActive = isActive;
    const updatedUser = await this.userRepository.save(user);
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async updateUserInfo(
    id: number,
    updateData: Partial<Pick<User, 'name' | 'email' | 'role'>>,
  ): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    if (updateData.email && updateData.email !== user.email) {
      const existing = await this.userRepository.findOne({
        where: { email: updateData.email },
      });
      if (existing) {
        throw new ConflictException('Email already in use');
      }
    }

    Object.assign(user, updateData);
    const updatedUser = await this.userRepository.save(user);
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}
