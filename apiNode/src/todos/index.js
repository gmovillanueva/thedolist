import { gql } from 'graphql-tag';

import createTodo from './mutations/create.todo.js';
import updateTodo from './mutations/update.todo.js';
import deleteTodo from './mutations/delete.todo.js';
import todo from './queries/todo.js';
import todos from './queries/todos.js';

const typeDefs = gql`
  type Todo {
    id: ID!
    title: String
    description: String
    user: User
  }

  input CreateTodoInput {
    title: String!
    description: String
    isCompleted: Boolean
  }

  input UpdateTodoInput {
    title: String
    description: String
    isCompleted: Boolean
  }

  extend type Query {
    todo(id: ID): Todo!
    todos: [Todo!]
  }

  extend type Mutation {
    createTodo(input: CreateTodoInput!): Todo
    updateTodo(id: ID!, input: UpdateTodoInput!): Todo
    deleteTodo(id: ID!): Todo
  }
`;

const resolvers = {
  Query: {
    todo,
    todos,
  },
  Mutation: {
    createTodo,
    updateTodo,
    deleteTodo,
  },
};

export default { typeDefs, resolvers };
