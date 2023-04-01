import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/posts/post.entity';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async createComment(
    content: string,
    postId: string,
    userId: string,
  ): Promise<CommentEntity | null> {
    const foundUser = await this.usersRepository.findOneById(userId);
    const foundPost = await this.postsRepository.findOneById(postId);


    if (!foundUser || !foundPost) {
      return null;
    }

    const createdComment = this.commentsRepository.create({
      content,
      createdBy: foundUser,
      createdFor: foundPost,
    });

    await this.commentsRepository.save(createdComment);

    const foundComment = await this.commentsRepository
      .createQueryBuilder('comment')
      .innerJoinAndSelect('comment.createdBy', 'createdBy')
      .innerJoinAndSelect('comment.createdFor', 'createdFor')
      .where('comment.id = :id', { id: createdComment.id })
      .getOne();

    return foundComment;
  }
}
