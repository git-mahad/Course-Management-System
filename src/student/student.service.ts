import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from 'src/course/entities/course.entity';
import { EnrollmentEntity } from 'src/course/entities/enrollment.entity';
import { CourseContentEntity } from 'src/course/entities/course-content.entity';
import { UpdateProgressDto } from './dto/progress.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepo: Repository<CourseEntity>,
    @InjectRepository(EnrollmentEntity)
    private enrollmentRepo: Repository<EnrollmentEntity>,
    @InjectRepository(CourseContentEntity)
    private contentRepo: Repository<CourseContentEntity>,
  ) {}

  async getApprovedCourses() {
    return this.courseRepo.find({ where: { status: 'approved' } });
  }

  async enrollCourse(courseId: number, studentId: number) {
    const existing = await this.enrollmentRepo.findOne({
      where: {
        courseId,
        studentId,
      },
    });

    if (existing) throw new ForbiddenException('Already enrolled');

    const enrollment = this.enrollmentRepo.create({
      courseId,
      studentId,
      progress: 0,
    });

    return this.enrollmentRepo.save(enrollment);
  }

  async getEnrolledCourses(studentId: number) {
    return this.enrollmentRepo.find({
      where: { studentId },
      relations: ['course'],
    });
  }

  async getCourseContent(courseId: number, studentId: number) {
    const isEnrolled = await this.enrollmentRepo.findOne({
      where: { courseId, studentId },
    });
  
    if (!isEnrolled) throw new ForbiddenException('Not enrolled');
      return this.contentRepo.find({where: {courseId}})
  }
  

  async updateProgress(
    courseId: number,
    studentId: number,
    dto: UpdateProgressDto,
  ) {
    const enrollment = await this.enrollmentRepo.findOne({
      where: { courseId, studentId },
    });

    if (!enrollment) throw new NotFoundException('Not enrolled in course');

    enrollment.progress = dto.progress;
    return this.enrollmentRepo.save(enrollment);
  }
}