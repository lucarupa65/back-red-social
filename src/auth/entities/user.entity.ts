import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'User ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'example@example.com',
    description: 'Email User',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty({
    example: 'Luis Ra',
    description: 'Usare name',
    default: null,
  })
  @Column('text')
  fullName: string;

  @ApiProperty({
    example: 0,
    description: 'Age users',
  })
  @Column('int', {
    default: 0,
  })
  age: number;

  // @ApiProperty()
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  // @ApiProperty()
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  // @ApiProperty()
  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  pots?: Post;

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
