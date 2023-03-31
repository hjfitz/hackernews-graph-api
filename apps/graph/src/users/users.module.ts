import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { PostsModule } from 'src/posts/posts.module';
import { UserEntity } from './user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService, AuthService],
  imports: [PostsModule, TypeOrmModule.forFeature([UserEntity])],
  exports: [PostsModule],
})
export class UsersModule {}
