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
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Auth, GetUser } from 'src/auth/decorators';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/auth/entities/user.entity';
import { Post as PostEntity } from './entities/post.entity'

@ApiTags('Post')
@ApiBearerAuth()
@Controller('post')
@Auth()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Post Creado', type: PostEntity })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiForbiddenResponse({ description: 'Forbidden. Token invalido'})
  create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postService.create(createPostDto, user);
  }

  @Get()
  @ApiOkResponse({ description: 'Listado de Post Paginado', type: [PostEntity] })
  @ApiForbiddenResponse({ description: 'Forbidden. Token invalido'})
  findAll(@Query() paginationDto: PaginationDto) {
    return this.postService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Post deseado', type: PostEntity })
  @ApiNotFoundResponse({description:'Post no encontrado'})
  @ApiForbiddenResponse({ description: 'Forbidden. Token invalido'})
  findOne(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Post actualizado', type: PostEntity })
  @ApiNotFoundResponse({description:'Post no encontrado'})
  @ApiForbiddenResponse({ description: 'Forbidden. Token invalido'})
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: User,
  ) {
    return this.postService.update(id, updatePostDto, user);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Post Eliminado', type: Boolean })
  @ApiNotFoundResponse({description:'Post no encontrado'})
  @ApiForbiddenResponse({ description: 'Forbidden. Token invalido'})
  remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.postService.remove(id, user);
  }
}
