import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('enrollment')
export class EnrollmentEntity{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  courseId: number;

  @Column()
  studentId: number

  // @ManyToOne(() Course)
  // course: Course

  // @ManyToOne(() User)
  // student: User

  @Column({default: 0})
  progress: number
}