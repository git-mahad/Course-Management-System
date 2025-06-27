import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../auth/entities/user.entity';
import { CourseEntity } from 'src/course/entities/course.entity';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(CourseEntity)
    private courseRepo: Repository<CourseEntity>
  ) {}

  async createStudent(dto: RegisterDto): Promise<User>{
    const student = this.userRepository.create({
      ...dto,
      role: UserRole.STUDENT,
    })
    return this.userRepository.save(student)
  }

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

  async createInstructor(data: Partial<User>): Promise<User> {
    const exists = await this.userRepository.findOne({ where: { email: data.email } });
    if (exists) throw new ConflictException('Email already registered');

    const instructor = this.userRepository.create({
      ...data,
      role: UserRole.INSTRUCTOR,
      isActive: true,
    });
    return this.userRepository.save(instructor);
  }

  async getAllInstructors(): Promise<User[]> {
    return this.userRepository.find({ where: { role: UserRole.INSTRUCTOR } });
  }

  async updateCourseStatus(courseId:number, status: "approved" | "rejected" ): Promise<CourseEntity>{
    const course = await this.courseRepo.findOne({where: {id: courseId}, relations: ['instructor']})

    if(!course) throw new NotFoundException('Course not found');
    course.status = status
    
    return this.courseRepo.save(course)
  }

  async getAllCourseWithInstructor() {
    const courses = await this.courseRepo.find({
      relations: ['instructor'],
    });

    type CourseInfo = {
      title: string,
      createdBy: string,
      status: "approved" | "pending" | "rejected"
    }
  
    const approved: CourseInfo[] = [];
    const pending: CourseInfo[] = [];
  
    for (const course of courses) {
      const courseInfo: CourseInfo = {
        title: course.title,
        createdBy: course.instructor?.name || 'Unknown',
        status: course.status,
      };
  
      if (course.status === 'approved') {
        approved.push(courseInfo);
      } else if (course.status === 'pending') {
        pending.push(courseInfo);
      }
    }
  
    return {
      approvedCourses: approved,
      pendingCourses: pending,
    };
  }
  
}
