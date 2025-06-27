import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CourseEntity } from '../course/entities/course.entity';
import { CreateCourseDto } from './dto/Instructor-create-course.dto';

const dummyInstructorId = 2;

@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Get('courses')
  getMyCourses(): Promise<CourseEntity[]> {
    return this.instructorService.getMyCourses(dummyInstructorId);
  }

  @Post('courses')
  createCourse(@Body() dto: CreateCourseDto): Promise<CourseEntity> {
    return this.instructorService.createCourse(dummyInstructorId, dto);
  }

  @Patch('courses/:id')
  updateCourse(
    @Param('id') id: number,
    @Body() dto: Partial<CourseEntity>,
  ): Promise<CourseEntity> {
    return this.instructorService.updateCourse(dummyInstructorId, id, dto);
  }

  @Delete('courses/:id')
  deleteCourse(@Param('id') id: number): Promise<void> {
    return this.instructorService.deleteCourse(dummyInstructorId, id);
  }

  @Get('enrollment-stats')
  getEnrollmentStats() {
    return this.instructorService.getEnrollmentStats(dummyInstructorId);
  }
}
