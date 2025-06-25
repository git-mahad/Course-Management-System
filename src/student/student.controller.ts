import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';
import { UpdateProgressDto } from './dto/progress.dto';
import { AuthenticatedRequest } from 'src/auth/interfaces/express-request.interface'; 

@Controller('student')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.STUDENT)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('courses')
  getAvailableCourses() {
    return this.studentService.getApprovedCourses();
  }

  @Post('courses/:id/enroll')
  enrollCourse(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.studentService.enrollCourse(+id, req.user.id);
  }

  @Get('enrollments')
  getMyCourses(@Req() req: AuthenticatedRequest) {
    return this.studentService.getEnrolledCourses(req.user.id);
  }

  @Get('courses/:id/content')
  getCourseContent(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.studentService.getCourseContent(+id, req.user.id);
  }

  @Patch('courses/:id/progress')
  updateProgress(
    @Param('id') id: string,
    @Body() dto: UpdateProgressDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.studentService.updateProgress(+id, req.user.id, dto);
  }
}
