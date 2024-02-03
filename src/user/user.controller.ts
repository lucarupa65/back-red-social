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
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@Controller('user')
@Auth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ) {
    return this.userService.update(id, updateUserDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.userService.remove(id, user);
  }
}
