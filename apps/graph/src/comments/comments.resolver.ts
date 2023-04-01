import { Context, Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { UseAuthNGuard } from 'src/auth/auth.guards';
import { AuthService } from 'src/auth/auth.service';
import { CommentsService } from './comments.service';


@Resolver()
export class CommentsResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly commentsService: CommentsService,
  ) {}

  @Mutation()
  @UseAuthNGuard()
  public async createComment(
    @Args('content') content: string,
    @Args('postId') postId: string,
    @Context('req') req: any,

  ) {
    const token = req.headers.authorization.replace('bearer ', '');
    const userId = this.authService.fetchUserId(token);
    return this.commentsService.createComment(content, postId, userId);
  }

}
