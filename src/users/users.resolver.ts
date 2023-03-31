import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import type { User } from '../schema.generated';
import { AuthService } from 'src/auth/auth.service';
import { PostsService } from 'src/posts/posts.service';
import { UseAuthZGuard } from 'src/auth/auth.guards';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // todo: put this on a LoginResolver
  @Query()
  public async createSession(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<{ token: string }> {
    return await this.usersService.createSession(username, password);
  }

  @UseAuthZGuard()
  @Query()
  async getUser(@Args('userId') id: string): Promise<User> {
    const { passHash: _, ...user } = await this.usersService.fetchUserById(id);
    return user;
  }

  @Mutation()
  async createUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.usersService.createUser(username, password);
  }
}
