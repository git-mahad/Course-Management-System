import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from 'src/course/entities/course.entity';

@Entity('course_content')
export class CourseContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: 'video' | 'pdf';

  @Column()
  url: string;

  @ManyToOne(() => CourseEntity, { onDelete: 'CASCADE' })
  course: CourseEntity;
}
