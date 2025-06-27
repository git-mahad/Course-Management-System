import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { User, UserRole } from 'src/auth/entities/user.entity';

export const dummyStudent: User = {
  id: 1,
  email: '',
  name: '',
  password: '',
  role: UserRole.STUDENT,
  isActive: true,
};

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post('update')
  updateProgress(@Body() dto: UpdateProgressDto) {
    return this.progressService.updateProgress(dummyStudent, dto);
  }

  @Get('my')
  getMyProgress() {
    return this.progressService.getProgressForStudent(dummyStudent.id);
  }
}
