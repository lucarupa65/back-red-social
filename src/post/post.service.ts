import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { Post } from './entities/post.entity';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

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

  async findAll(paginationDto: PaginationDto): Promise<Post[]> {
    const { limit = 10, offset = 0 } = paginationDto;
    const post = await this.postRepository.find({
      take: limit,
      skip: offset,
      relations: {
        user: true,
      },
      where: {
        isActive: true,
      },
    });
    return post;
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) throw new NotFoundException(`Post con ${id} no encontrado`);
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, currentUser: User) {
    const post = await this.postRepository.preload({
      id: id,
      ...updatePostDto,
    });

    if (!post) throw new NotFoundException(`Post con ${id} no encontrado`);
    if (post.user != currentUser)
      throw new UnauthorizedException(
        'El usuario no tiene permiso para editar este post',
      );

    post.updatedAt = new Date();
    await this.postRepository.save(post);
    return post;
  }

  async remove(id: string, currentUser: User): Promise<boolean> {
    const post = await this.findOne(id);

    post.isActive = false;

    await this.postRepository.save(post);

    await this.postRepository.softDelete(post);

    return true;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async deleteAllPost() {
    const query = this.postRepository.createQueryBuilder('post');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
