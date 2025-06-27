import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from '../auth/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { CourseEntity } from 'src/course/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, CourseEntity]), AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
