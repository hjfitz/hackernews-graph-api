import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseAuthNGuard } from 'src/auth/auth.guards';
import { AuthService } from 'src/auth/auth.service';
import { PostsService } from './posts.service';

@Resolver('Post')
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly authService: AuthService,
  ) {}

  @Query()
  public async getPost(@Args('postId') id: string) {
    const foundPost = await this.postsService.findPost(id);
    if (!foundPost) return null;
    return foundPost;
  }

  @UseAuthNGuard()
  @Mutation()
  public async createPost(
    @Args('title') title: string,
    @Args('storyUrl') storyUrl: string,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization.replace('bearer ', '');
    const userId = this.authService.fetchUserId(token);
    const newPost = await this.postsService.createPost(userId, title, storyUrl);
    return newPost;
  }

  @Query()
  public async getPostsForFrontpage() {
    return this.postsService.getPostsForFrontpage();
  }
}
