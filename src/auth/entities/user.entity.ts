import { Post } from 'src/post/entities/post.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  fullName: string;

  @Column('int', {
    default: 0,
  })
  age: number;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(
    () => Post,
    post => post.user,
    { cascade: true }
  )
  pots?: Post

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
