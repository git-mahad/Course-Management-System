import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructorService } from './instructor.service';
import { CourseEntity } from '../course/entities/course.entity';
import { User } from '../auth/entities/user.entity';
import { InstructorController } from './instructor.controller';
import { EnrollmentEntity } from 'src/enrollment/Entity/enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, CourseEntity, EnrollmentEntity])],
  providers: [InstructorService],
  controllers: [InstructorController],
})
export class InstructorModule {}