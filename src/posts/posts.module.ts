import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/users/user.entity';
import { PostEntity } from './post.entity';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  providers: [PostsService, PostsResolver, AuthService],
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])],
  exports: [PostsService],
})
export class PostsModule {}
