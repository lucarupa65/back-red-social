import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { Post } from './entities/post.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PostService {
  private readonly logger = new Logger('PostService');

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, userCreateBy: User) {
    try {
      const post = this.postRepository.create({
        ...createPostDto,
        user: userCreateBy,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await this.postRepository.save(post);
      return post;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto, currentUser: User) {
    return `This action updates a #${id} post`;
  }

  remove(id: number, currentUser: User) {
    return `This action removes a #${id} post`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
