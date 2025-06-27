import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Post,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { User, UserRole } from '../auth/entities/user.entity';
import { UpdateUserInfoDto } from '../auth/dto/update.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('student')
  createStudent(@Body() dot: RegisterDto) {
    return this.adminService.createStudent(dot);
  }

  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('users/:id')
  getUserById(@Param('id') id: string) {
    return this.adminService.getUserById(+id);
  }

  @Patch('users/:id/status')
  updateUserStatus(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ) {
    return this.adminService.updateUserStatus(+id, isActive);
  }

  @Patch('users/:id/info')
  updateUserInfo(@Param('id') id: string, @Body() body: UpdateUserInfoDto) {
    return this.adminService.updateUserInfo(+id, body);
  }

  @Post('create-instructor')
  createInstructor(@Body() body: Partial<User>) {
    return this.adminService.createInstructor(body);
  }

  @Get('instructors')
  getAllInstructors() {
    return this.adminService.getAllInstructors();
  }

  @Patch('courses/:id/status')
  updateCourseStatus(
    @Param('id') id: string,
    @Body('status') status: 'approved' | 'rejected',
  ) {
    return this.adminService.updateCourseStatus(+id, status);
  }

  @Get('courses')
  getAllCourseWithInstructor() {
    return this.adminService.getAllCourseWithInstructor();
  }
}
