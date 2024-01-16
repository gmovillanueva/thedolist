import { buildSchema } from 'graphql';

const todoSchema = buildSchema(`
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
`);

export default todoSchema;
