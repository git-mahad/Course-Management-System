import { IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class CreateCourseContentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(['video', 'pdf'])
  type: 'video' | 'pdf';

  @IsString()
  url: string;

  @IsNotEmpty()
  courseId: number;
}
