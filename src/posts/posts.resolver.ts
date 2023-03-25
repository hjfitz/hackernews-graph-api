import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

@Resolver('Post')
export class PostsResolver {
  @Query()
  getPost() {
    return {
      id: 'b',
      title: 'b',
      storyUrl: 'b',
      createdAt: new Date(),
      createdBy: null,
    };
  }
}
