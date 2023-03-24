
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    developers(): Developer[] | Promise<Developer[]>;
}

export interface Developer {
    name: string;
    stack: string[];
}

type Nullable<T> = T | null;
