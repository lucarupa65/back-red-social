import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Auth, GetUser } from 'src/auth/decorators';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/auth/entities/user.entity';
import { Post as PostEntity } from './entities/post.entity'

@ApiTags('Post')
@Controller('post')
@Auth()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Post Creado', type: PostEntity })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Token invalido' })
  create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postService.create(createPostDto, user);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Listado de Post Paginado' })
  @ApiResponse({ status: 403, description: 'Token invalido' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.postService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiResponse({ status: 403, description: 'Token invalido' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 403, description: 'Token invalido' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: User,
  ) {
    return this.postService.update(id, updatePostDto, user);
  }

  @Delete(':id')
  @ApiResponse({ status: 403, description: 'Token invalido' })
  remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.postService.remove(id, user);
  }
}
