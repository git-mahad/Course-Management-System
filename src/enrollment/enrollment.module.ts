import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentEntity } from './Entity/enrollment.entity';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { CourseEntity } from 'src/course/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnrollmentEntity, CourseEntity])],
  providers: [EnrollmentService],
  controllers: [EnrollmentController],
  exports: [EnrollmentService],
})
export class EnrollmentModule {}
