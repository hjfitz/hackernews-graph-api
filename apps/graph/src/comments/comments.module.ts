import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { PostEntity } from 'src/posts/post.entity';
import { UserEntity } from 'src/users/user.entity';
import { CommentEntity } from './comment.entity';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
  providers: [CommentsService, CommentsResolver, AuthService],
  imports: [TypeOrmModule.forFeature([CommentEntity, PostEntity, UserEntity])],
})
export class CommentsModule {}
