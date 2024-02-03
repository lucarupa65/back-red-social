import { User } from 'src/auth/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pots')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  content: string;

  @Column('int', {
    default: 0,
  })
  like: number;

  @ManyToOne(
    () => User,
    (user) => user.pots
  )
  user: User

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('date')
  createdAt: Date;

  @Column('date', {
    nullable: true,
  })
  updatedAt: Date;

  @Column('date', {
    nullable: true,
  })
  deletedAt: Date;
}
