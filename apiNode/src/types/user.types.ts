export const userTypes = `#graphql
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
`;
