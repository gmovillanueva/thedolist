export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type List = {
  __typename?: 'List';
  id: Scalars['String'];
  title: Scalars['String'];
  items?: Maybe<Array<Maybe<Item>>>;
};

export type ListItemsArgs = {
  title?: Maybe<Scalars['String']>;
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  list?: Maybe<Array<Maybe<Item>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem?: Maybe<Item>;
  updateItem?: Maybe<Item>;
  deleteItem?: Maybe<Scalars['String']>;
};

export type MutationCreateItemArgs = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type MutationUpdateItemArgs = {
  id: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type MutationDeleteItemArgs = {
  id: Scalars['String'];
};
