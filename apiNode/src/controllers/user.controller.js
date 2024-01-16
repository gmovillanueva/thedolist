import models from '../../testData.js';
import { randomUUID } from 'node:crypto';

export const createUser = async (root, { input }, context) => {
  return models.users.push(input);
};

export const deleteUser = async (root, { id }, context) => {
  const index = models.users.findIndex((item) => item.id === id);
  return models.users.splice(index, 1);
};

export const updateUser = async (root, { id, input }, context) => {
  const index = models.users.findIndex((item) => item.id === id);
  const item = models.users.splice(index, 1);

  return models.users.push({
    ...item,
    ...input,
  });
};

export const queryUser = async (root, { id }, context) => {
  const index = models.todos.findIndex((item) => item.id === id);
  return models.todos.splice(index, 1);
};

export const queryUsers = async (root, args, context) => {
  return models.todos;
};
