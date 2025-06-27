// create-course.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  status?: 'pending' | 'approved' | 'rejected';
}
