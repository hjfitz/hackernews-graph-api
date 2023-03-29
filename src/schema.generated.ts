
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    getPost(postId: string): Nullable<Post> | Promise<Nullable<Post>>;
    getPostsForFontpage(): Post[] | Promise<Post[]>;
    getUser(userId: string): Nullable<User> | Promise<Nullable<User>>;
    createSession(username: string, password: string): Nullable<JwtContext> | Promise<Nullable<JwtContext>>;
}

export interface IMutation {
    createPost(title: string, storyUrl: string): Nullable<Post> | Promise<Nullable<Post>>;
    createUser(username: string, password: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface User {
    id: string;
    username: string;
    createdAt: DateTime;
    posts: Post[];
}

export interface Post {
    id: string;
    title: string;
    storyUrl: string;
    createdAt: DateTime;
    createdBy?: Nullable<User>;
}

export interface JwtContext {
    token: string;
}

export type DateTime = any;
type Nullable<T> = T | null;
