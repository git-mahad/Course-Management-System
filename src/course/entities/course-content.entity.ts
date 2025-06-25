import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('course_content')
export class CourseContentEntity{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  type : 'viedo' | 'pdf'

  @Column()
  url: string

  @Column()
  courseId: number;

  // @ManyToOne(()=> Course, course => course.contents)
  // course: Course;
}