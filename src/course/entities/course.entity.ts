import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';

  @ManyToOne(() => User)
  instructor: User;
}
