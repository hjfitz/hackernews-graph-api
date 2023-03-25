import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import type { User } from '../schema.generated';
import { AuthService } from 'src/auth/auth.service';
import { PostsService } from 'src/posts/posts.service';
import { UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/auth/authentication.guard';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly postsService: PostsService,
  ) {}

  @Mutation()
  @UseGuards(AuthenticationGuard)
  public async createSession(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<{ token: string }> {
    // fetch a user
    return await this.usersService.createSession(username, password);
  }

  @Query()
  async getUser(@Args('id') id: string): Promise<User> {
    const { passHash: _, ...user } = await this.usersService.fetchUserById(id);
    return user;
  }

  /**
  @ResolveField()
  async posts(@Parent() user) {
    const posts = await this.postsService.fetchPostsByUserId(user.id);
    return posts;
  }
  */

  @Mutation()
  async createUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.usersService.createUser(username, password);
  }
}
