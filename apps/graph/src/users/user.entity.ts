import {
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/schema.generated';
import { PostEntity } from 'src/posts/post.entity';
import { CommentEntity } from 'src/comments/comment.entity';

@Entity()
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public username: string;

  @CreateDateColumn()
  public createdAt: number;

  @Column()
  public passHash: string;

  @OneToMany(() => PostEntity, (post) => post.createdBy)
  public posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.createdBy)
  public comments: CommentEntity[];
}
