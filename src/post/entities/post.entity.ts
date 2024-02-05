import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'Post ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Post Title',
  })
  @Column('text')
  title: string;

  @ApiProperty({
    example: 'Anim reprehenderit nulla in anim mollit minim irure commodo.',
    description: 'Post description',
  })
  @Column('text')
  content: string;

  @ApiProperty({
    example: 0,
    description: 'Post like',
  })
  @Column('int', {
    default: 0,
  })
  like: number;

  @ApiProperty({
    type: () => User
  })
  @ManyToOne(() => User, (user) => user.pots)
  user: User;

  @ApiProperty()
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
