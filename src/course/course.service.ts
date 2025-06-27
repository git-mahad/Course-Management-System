import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepo: Repository<CourseEntity>,
  ) {}

  async createCourse(dto: CreateCourseDto, instructor: User): Promise<CourseEntity> {
    const course = this.courseRepo.create({ ...dto, instructor });
    return this.courseRepo.save(course);
  }

  async updateCourse(id: number, dto: UpdateCourseDto): Promise<CourseEntity> {
    const course = await this.courseRepo.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    Object.assign(course, dto);
    return this.courseRepo.save(course);
  }

  async getApprovedCourses(): Promise<CourseEntity[]> {
    return this.courseRepo.find({ where: { status: 'approved' } });
  }

  async getInstructorCourses(instructorId: number): Promise<CourseEntity[]> {
    return this.courseRepo.find({
      where: { instructor: { id: instructorId } },
      relations: ['instructor'],
    });
  }

  async deleteCourse(id: number): Promise<void> {
    await this.courseRepo.delete(id);
  }

  async approveCourse(id: number): Promise<CourseEntity> {
    const course = await this.courseRepo.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    course.status = 'approved';
    return this.courseRepo.save(course);
  }
}
