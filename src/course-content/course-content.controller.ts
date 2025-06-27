import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CourseContentService } from './course-content.service';
import { CreateCourseContentDto } from './dto/create-course-content.dto';
import { UpdateCourseContentDto } from './dto/update-course-content.dto';

@Controller('course-content')
export class CourseContentController {
  constructor(private readonly contentService: CourseContentService) {}

  @Post()
  create(@Body() dto: CreateCourseContentDto) {
    return this.contentService.create(dto);
  }

  @Get(':courseId')
  getByCourse(@Param('courseId') courseId: number) {
    return this.contentService.getByCourse(courseId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateCourseContentDto) {
    return this.contentService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.contentService.delete(id);
  }
}
