import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Progress } from './entities/progress.entity';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { CourseContent } from 'src/course-content/entities/course-content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Progress, CourseContent])],
  providers: [ProgressService],
  controllers: [ProgressController],
  exports: [ProgressService],
})
export class ProgressModule {}
