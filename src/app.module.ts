import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { CourseContentModule } from './course-content/course-content.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { ProgressModule } from './progress/progress.module';
import { CourseEntity } from './course/entities/course.entity';
import { CourseContent } from './course-content/entities/course-content.entity';
import { EnrollmentEntity } from './enrollment/Entity/enrollment.entity';
import { Progress } from './progress/entities/progress.entity';
import { InstructorModule } from './instructor/instructor.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [User,CourseEntity, CourseContent, EnrollmentEntity, Progress],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    AdminModule,
    StudentModule,
    CourseModule,
    CourseContentModule,
    EnrollmentModule,
    ProgressModule,
    InstructorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
