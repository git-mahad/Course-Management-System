import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  create(@Body() dto: CreateCourseDto) {
    const instructor = { id: 1 }; // replace with real auth user later
    return this.courseService.createCourse(dto, instructor as any);
  }

  @Get('approved')
  findAllApproved() {
    return this.courseService.getApprovedCourses();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courseService.updateCourse(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.deleteCourse(+id);
  }

  @Patch('approve/:id')
  approve(@Param('id') id: string) {
    return this.courseService.approveCourse(+id);
  }
}
