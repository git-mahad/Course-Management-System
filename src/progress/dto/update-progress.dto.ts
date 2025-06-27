import { IsInt, IsBoolean } from 'class-validator';

export class UpdateProgressDto {
  @IsInt()
  contentId: number;

  @IsBoolean()
  completed: boolean;
}
