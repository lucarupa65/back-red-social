import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    private readonly dataSource: DataSource,
  ) {}

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User con ${id} no encontrado`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, currentUser: User) {
    if (id === currentUser.id)
      throw new UnauthorizedException(
        'El usuario no tiene permiso para editar este usuario',
      );
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) throw new NotFoundException(`User con ${id} no encontrado`);
    user.updatedAt = new Date();
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: string, currentUser: User) {
    if (id === currentUser.id)
      throw new UnauthorizedException(
        'El usuario no tiene permiso para editar este usuario',
      );
    const user = await this.findOne(id);
    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(Post,{ user: { id } }, {isActive: false,})
      await queryRunner.manager.softDelete(Post, {user: { id}});

      user.isActive = false;
      await queryRunner.manager.save(user);
      await queryRunner.manager.softDelete(User,{id});
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return true

    } catch(error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error)
    }
    return `This action removes a #${id} user`;
  }


  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
