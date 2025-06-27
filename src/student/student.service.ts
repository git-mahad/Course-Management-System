import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CourseEntity } from 'src/course/entities/course.entity';
import { EnrollmentEntity } from 'src/enrollment/Entity/enrollment.entity';
import { CourseContent } from 'src/course-content/entities/course-content.entity';
import { Progress } from 'src/progress/entities/progress.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
    @InjectRepository(EnrollmentEntity)
    private enrollmentRepository: Repository<EnrollmentEntity>,
    @InjectRepository(CourseContent)
    private contentRepository: Repository<CourseContent>,
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
  ) {}

  async getMyProfile(id: number): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateMyProfile(
    id: number,
    updateData: Partial<User>,
  ): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, updateData);
    const updatedUser = await this.userRepository.save(user);
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async getMyEnrolledCourses(studentId: number): Promise<CourseEntity[]> {
    const enrollments = await this.enrollmentRepository.find({
      where: { student: { id: studentId } },
      relations: ['course'],
    });

    return enrollments.map((enrollment) => enrollment.course);
  }

  async enrollInCourse(
    studentId: number,
    courseId: number,
  ): Promise<EnrollmentEntity> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId, status: 'approved' },
    });
    if (!course)
      throw new NotFoundException('Course not found or not approved');

    const student = await this.userRepository.findOne({
      where: { id: studentId },
    });
    if (!student) throw new NotFoundException('Student not found');

    const enrollment = this.enrollmentRepository.create({
      course,
      student,
    });

    return this.enrollmentRepository.save(enrollment);
  }

  async browseApprovedCourses(): Promise<CourseEntity[]> {
    return this.courseRepository.find({
      where: { status: 'approved' },
      relations: ['instructor'],
    });
  }

  async getCourseContent(
    studentId: number,
    courseId: number,
  ): Promise<CourseContent[]> {
    const isEnrolled = await this.enrollmentRepository.findOne({
      where: {
        student: { id: studentId },
        course: { id: courseId },
      },
      relations: ['student', 'course'],
    });

    if (!isEnrolled)
      throw new NotFoundException('You are not enrolled in this course');

    return this.contentRepository.find({
      where: {
        course: { id: courseId },
      },
      relations: ['course'],
    });
  }

  async markLessonComplete(
    studentId: number,
    lessonId: number,
  ): Promise<Progress> {
    const student = new User();
    student.id = studentId;

    const content = new CourseContent();
    content.id = lessonId;

    const progress = this.progressRepository.create({
      student,
      content,
      completed: true,
      completedAt: new Date(),
    });

    return this.progressRepository.save(progress);
  }
}
