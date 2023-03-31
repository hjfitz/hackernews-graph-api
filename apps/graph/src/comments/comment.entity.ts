import type { Comment } from 'src/schema.generated';
import { UserEntity } from 'src/users/user.entity';
import { PostEntity } from 'src/posts/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class CommentEntity implements Comment {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public content: string;

  @CreateDateColumn()
  public createdAt: number;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  public createdBy: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  public createdFor: PostEntity;
}
