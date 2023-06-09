import { CommentEntity } from 'src/comments/comment.entity';
import { Post } from 'src/schema.generated';
import { UserEntity } from 'src/users/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class PostEntity implements Post {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public storyUrl: string;

  @CreateDateColumn()
  public createdAt: number;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  public createdBy: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.createdFor)
  public comments: CommentEntity[];
}
