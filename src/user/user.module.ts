import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PostModule } from 'src/post/post.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    AuthModule,
    PostModule
  ], 
  exports: [
    UserService,
  ]
})
export class UserModule {}
