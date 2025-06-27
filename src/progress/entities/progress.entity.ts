import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CourseContent } from 'src/course-content/entities/course-content.entity';

@Entity('progress')
@Unique(['student', 'content'])
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  student: User;

  @ManyToOne(() => CourseContent, { onDelete: 'CASCADE' })
  content: CourseContent;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date | null;
}
