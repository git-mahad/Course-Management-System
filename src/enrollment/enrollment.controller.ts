import { Controller, Post, Body, Get, Patch, Query } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollCourseDto } from './dto/enroll-course.dto';
import { User, UserRole } from 'src/auth/entities/user.entity';

export const dummyStudent: User = {
  id: 1,
  email: '',
  name: '',
  password: '',
  role: UserRole.STUDENT,
  isActive: true,
};

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  enroll(@Body() dto: EnrollCourseDto) {
    return this.enrollmentService.enroll(dummyStudent, dto.courseId);
  }

  @Get('my-courses')
  getMyCourses() {
    return this.enrollmentService.getEnrolledCourses(dummyStudent.id);
  }

  @Get('progress')
  getMyProgress(@Query('courseId') courseId: number) {
    return this.enrollmentService.getEnrollment(dummyStudent.id, courseId);
  }

  @Patch('progress')
  updateProgress(
    @Query('courseId') courseId: number,
    @Query('value') value: number,
  ) {
    return this.enrollmentService.updateProgress(
      dummyStudent.id,
      courseId,
      value,
    );
  }
}
