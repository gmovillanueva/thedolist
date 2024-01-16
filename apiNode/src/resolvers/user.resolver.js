import {
  createUser,
  updateUser,
  deleteUser,
  queryUsers as users,
  queryUser as user,
} from '../controllers/user.controller.js';

const userResolvers = {
  // Resolvers for Queries
  Query: {
    user,
    users,
  },

  // Resolvers for Mutations
  Mutation: {
    createUser,
    updateUser,
    deleteUser,
  },
};

export default userResolvers;
