import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseContent } from './entities/course-content.entity';
import { CreateCourseContentDto } from './dto/create-course-content.dto';
import { CourseEntity } from 'src/course/entities/course.entity';

@Injectable()
export class CourseContentService {
  constructor(
    @InjectRepository(CourseContent)
    private contentRepo: Repository<CourseContent>,

    @InjectRepository(CourseEntity)
    private courseRepo: Repository<CourseEntity>,
  ) {}

  async create(dto: CreateCourseContentDto) {
    const course = await this.courseRepo.findOne({ where: { id: dto.courseId } });
    if (!course) throw new NotFoundException('Course not found');

    const content = this.contentRepo.create({ ...dto, course });
    return this.contentRepo.save(content);
  }

  async getByCourse(courseId: number) {
    return this.contentRepo.find({ where: { course: { id: courseId } } });
  }

  async update(id: number, dto: any) {
    const content = await this.contentRepo.findOne({ where: { id } });
    if (!content) throw new NotFoundException('Content not found');

    Object.assign(content, dto);
    return this.contentRepo.save(content);
  }

  async delete(id: number) {
    return this.contentRepo.delete(id);
  }
}
