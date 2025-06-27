import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
  Post,
  Param,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CourseEntity } from 'src/course/entities/course.entity';
import { EnrollmentEntity } from 'src/enrollment/Entity/enrollment.entity';
import { dummyStudent } from 'src/enrollment/enrollment.controller';
import { CourseContent } from 'src/course-content/entities/course-content.entity';

@Controller('student')
@UseGuards(JwtAuthGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('profile')
  async getMyProfile(@Request() req) {
    return this.studentService.getMyProfile(req.user.id);
  }

  @Patch('update')
  async updateMyProfile(@Request() req, @Body() updateData: any) {
    return this.studentService.updateMyProfile(req.user.id, updateData);
  }

  @Get('courses')
  async browseApprovedCourses(): Promise<CourseEntity[]> {
    return this.studentService.browseApprovedCourses();
  }

  @Post('courses/:courseId/enroll')
  async enrollInCourse(
    @Param('courseId') courseId: number,
  ): Promise<EnrollmentEntity> {
    return this.studentService.enrollInCourse(dummyStudent.id, courseId);
  }

  @Get('courses/:courseId/content')
  async getCourseContent(
    @Param('courseId') courseId: number,
  ): Promise<CourseContent[]> {
    return this.studentService.getCourseContent(dummyStudent.id, courseId);
  }

  @Post('content/:lessonId/complete')
  async markLessonComplete(@Param('lessonId') lessonId: number): Promise<any> {
    return this.studentService.markLessonComplete(dummyStudent.id, lessonId);
  }
}
