
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../auth/entities/user.entity';
import { CourseEntity } from '../course/entities/course.entity';
import { EnrollmentEntity } from 'src/enrollment/Entity/enrollment.entity';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,

    @InjectRepository(EnrollmentEntity)
    private enrollmentRepository: Repository<EnrollmentEntity>,
  ) {}

  async getMyCourses(instructorId: number): Promise<CourseEntity[]> {
    return this.courseRepository.find({
      where: { instructor: { id: instructorId } },
    });
  }

  async createCourse(instructorId: number, dto: Partial<CourseEntity>): Promise<CourseEntity> {
    const instructor = await this.userRepository.findOne({ where: { id: instructorId, role: UserRole.INSTRUCTOR } });
    if (!instructor) throw new ForbiddenException('Only instructors can create courses');

    const course = this.courseRepository.create({ ...dto, instructor });
    return this.courseRepository.save(course);
  }

  async updateCourse(instructorId: number, courseId: number, dto: Partial<CourseEntity>): Promise<CourseEntity> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['instructor'],
    });
    if (!course || course.instructor.id !== instructorId) {
      throw new ForbiddenException('You can only update your own courses');
    }

    Object.assign(course, dto);
    return this.courseRepository.save(course);
  }

  async deleteCourse(instructorId: number, courseId: number): Promise<void> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['instructor'],
    });
    if (!course || course.instructor.id !== instructorId) {
      throw new ForbiddenException('You can only delete your own courses');
    }
    await this.courseRepository.remove(course);
  }


  async getEnrollmentStats(instructorId: number) {
    const courses = await this.courseRepository.find({
      where: { instructor: { id: instructorId } },
      relations: ['instructor'],
    });
  
    const stats: {
      courseId: number;
      courseTitle: string;
      approvedStudents: number;
      pendingStudents: number;
      // totalStudents: number;
    }[] = [];
  
    for (const course of courses) {
      const approved = await this.enrollmentRepository.count({
        where: {
          course: { id: course.id },
          student: { isActive: true }
        }
      });
  
      const pending = await this.enrollmentRepository.count({
        where: {
          course: { id: course.id },
          student: { isActive: false }
        }
      });
  
      stats.push({
        courseId: course.id,
        courseTitle: course.title,
        approvedStudents: approved,
        pendingStudents: pending
        // totalStudents: approved + pending,
      });
    }
  
    return stats;
  }
  
}
