import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { User } from '../auth/entities/user.entity';
// import { AuthModule } from '../auth/auth.module';
import { CourseEntity } from 'src/course/entities/course.entity';
import { EnrollmentEntity } from 'src/enrollment/Entity/enrollment.entity';
import { CourseContent } from 'src/course-content/entities/course-content.entity';
import { Progress } from 'src/progress/entities/progress.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      CourseEntity,
      EnrollmentEntity,
      CourseContent,
      Progress,
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
