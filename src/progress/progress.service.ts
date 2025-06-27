import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Progress } from './entities/progress.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CourseContent } from 'src/course-content/entities/course-content.entity';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private progressRepo: Repository<Progress>,

    @InjectRepository(CourseContent)
    private contentRepo: Repository<CourseContent>,
  ) {}

  async updateProgress(student: User, dto: UpdateProgressDto): Promise<Progress> {
    const content = await this.contentRepo.findOne({ where: { id: dto.contentId } });
    if (!content) throw new Error('Content not found');

    let progress = await this.progressRepo.findOne({
      where: { student: { id: student.id }, content: { id: dto.contentId } },
    });

    if (progress) {
      progress.completed = dto.completed;
      progress.completedAt = dto.completed ? new Date() : null;
    } else {
      progress = this.progressRepo.create({
        student,
        content,
        completed: dto.completed,
        completedAt: dto.completed ? new Date() : null,
      });
    }

    return this.progressRepo.save(progress);
  }

  async getProgressForStudent(studentId: number): Promise<Progress[]> {
    return this.progressRepo.find({ where: { student: { id: studentId } }, relations: ['content'] });
  }
}
