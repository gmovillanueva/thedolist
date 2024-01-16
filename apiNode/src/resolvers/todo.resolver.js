import {
  createTodo,
  updateTodo,
  deleteTodo,
  queryTodo as todo,
  queryTodos as todos,
} from '../controllers/todo.controller.js';

const todoResolvers = {
  // Resolvers for Queries
  Query: {
    todo,
    todos,
  },

  // Resolvers for Mutations
  Mutation: {
    createTodo,
    updateTodo,
    deleteTodo,
  },
};

export default todoResolvers;
