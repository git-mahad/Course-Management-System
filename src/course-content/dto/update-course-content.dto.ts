import { IsOptional, IsString, IsEnum } from 'class-validator';

export class UpdateCourseContentDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(['video', 'pdf'])
  type?: 'video' | 'pdf';

  @IsOptional()
  @IsString()
  url?: string;
}
