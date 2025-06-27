import { User } from 'src/auth/entities/user.entity';
import { CourseEntity } from '../../course/entities/course.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('enrollment')
export class EnrollmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CourseEntity, { eager: true })
  course: CourseEntity;

  @ManyToOne(() => User, { eager: true })
  student: User;

  @Column({ default: 0 })
  progress: number;
}
