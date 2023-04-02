
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    getPost(postId: string): Nullable<Post> | Promise<Nullable<Post>>;
    getPostsForFrontpage(): Post[] | Promise<Post[]>;
    getUser(userId: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createPost(title: string, storyUrl: string): Nullable<Post> | Promise<Nullable<Post>>;
    createUser(username: string, password: string): Nullable<User> | Promise<Nullable<User>>;
    createComment(content: string, postId: string): Nullable<Comment> | Promise<Nullable<Comment>>;
    createSession(username: string, password: string): Nullable<JwtContext> | Promise<Nullable<JwtContext>>;
}

export interface User {
    id: string;
    username: string;
    createdAt: DateTime;
    posts: Post[];
    comments: Comment[];
}

export interface Post {
    id: string;
    title: string;
    storyUrl: string;
    createdAt: DateTime;
    createdBy?: Nullable<User>;
    comments?: Nullable<Comment[]>;
}

export interface Comment {
    id: string;
    content: string;
    createdAt: DateTime;
    createdBy: User;
    createdFor: Post;
}

export interface JwtContext {
    token: string;
}

export type DateTime = any;
type Nullable<T> = T | null;
