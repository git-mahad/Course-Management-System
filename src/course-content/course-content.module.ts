import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseContent } from './entities/course-content.entity';
import { CourseContentService } from './course-content.service';
import { CourseContentController } from './course-content.controller';
import { CourseEntity } from 'src/course/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseContent, CourseEntity])],
  controllers: [CourseContentController],
  providers: [CourseContentService],
  exports: [CourseContentService],
})
export class CourseContentModule {}
