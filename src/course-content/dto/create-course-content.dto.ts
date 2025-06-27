import { IsString, IsEnum, IsNotEmpty, IsInt } from 'class-validator';

export class CreateCourseContentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(['video', 'pdf'])
  type: 'video' | 'pdf';

  @IsString()
  url: string;

  @IsInt()
  courseId: number;
}
