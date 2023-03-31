import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public findPost(postId: string): Promise<PostEntity | null> {
    return this.postsRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.comments', 'comments')
      .innerJoinAndSelect('comments.createdBy', 'createdBy')
      .innerJoinAndSelect('post.createdBy', 'postCreatedBy')
      .where('post.id = :postId', { postId })
      .getOne();
  }

  public async createPost(userId: string, postTitle: string, postUrl: string) {
    const foundUser = await this.usersRepository.findOneBy({ id: userId });
    const newPost = this.postsRepository.create({
      storyUrl: postUrl,
      title: postTitle,
      createdBy: foundUser,
    });

    const createdPost = await this.postsRepository.save(newPost);

    return createdPost;
  }
}
