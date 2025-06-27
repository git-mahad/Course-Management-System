import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnrollmentEntity } from './Entity/enrollment.entity';
import { CourseEntity } from 'src/course/entities/course.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(EnrollmentEntity)
    private enrollmentRepo: Repository<EnrollmentEntity>,

    @InjectRepository(CourseEntity)
    private courseRepo: Repository<CourseEntity>,
  ) {}

  async enroll(student: User, courseId: number): Promise<EnrollmentEntity> {
    const course = await this.courseRepo.findOne({
      where: { id: courseId, status: 'approved' },
    });
    if (!course)
      throw new NotFoundException('Course not found or not approved');

    const alreadyEnrolled = await this.enrollmentRepo.findOne({
      where: { student: { id: student.id }, course: { id: courseId } },
    });
    if (alreadyEnrolled)
      throw new ConflictException('Already enrolled in this course');

    const enrollment = this.enrollmentRepo.create({ student, course });
    return this.enrollmentRepo.save(enrollment);
  }

  async getEnrolledCourses(studentId: number): Promise<EnrollmentEntity[]> {
    return this.enrollmentRepo.find({
      where: { student: { id: studentId } },
    });
  }

  async getEnrollment(
    studentId: number,
    courseId: number,
  ): Promise<EnrollmentEntity> {
    const enrollment = await this.enrollmentRepo.findOne({
      where: { student: { id: studentId }, course: { id: courseId } },
    });

    if (!enrollment) throw new NotFoundException('Enrollment not found');
    return enrollment;
  }

  async updateProgress(
    studentId: number,
    courseId: number,
    progress: number,
  ): Promise<EnrollmentEntity> {
    const enrollment = await this.getEnrollment(studentId, courseId);
    enrollment.progress = progress;
    return this.enrollmentRepo.save(enrollment);
  }
}
