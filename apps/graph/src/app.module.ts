import { join } from 'path';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { UserEntity } from './users/user.entity';
import { PostEntity } from './posts/post.entity';
import { DateTimeResolver } from 'graphql-scalars';
import { CommentsModule } from './comments/comments.module';
import { CommentEntity } from './comments/comment.entity';
import { configValidationSchema } from './config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      validationSchema: configValidationSchema,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/schema.generated.ts'),
      },
      resolvers: {
        DateTime: DateTimeResolver,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // todo: look to move this to it's own file
        host: configService.get('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [UserEntity, PostEntity, CommentEntity],
        synchronize: true,
      }),
    }),
    PostsModule,
    UsersModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
