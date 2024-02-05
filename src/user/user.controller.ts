import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@Auth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  @ApiOkResponse({ description: 'Usuario Editado', type: User })
  @ApiNotFoundResponse({description:'Usuario no encontrado'})
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiForbiddenResponse({ description: 'Forbidden. Token invalido'})
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ) {
    return this.userService.update(id, updateUserDto, user);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Uusuario eliminado', type: String })
  @ApiNotFoundResponse({description:'Usuario no encontrado'})
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiForbiddenResponse({ description: 'Forbidden. Token invalido'})
  remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.userService.remove(id, user);
  }
}
