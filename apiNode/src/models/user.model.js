import { buildSchema } from 'graphql';

const userSchema = buildSchema(`
 type User {
    id: ID! # The "!" means required
    firstname: String
    lastname: String
    email: String
    username: String
  }

  input CreateUserInput {
    firstname: String!
    lastname: String
    email: String!
    username: String!
  }

  input UpdateUserInput {
    firstname: String
    lastname: String
  }

  extend type Query {
    user(id: ID): User!
    users: [User!]
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    removeUser(id: ID!): User
  }
`);

export default userSchema;
