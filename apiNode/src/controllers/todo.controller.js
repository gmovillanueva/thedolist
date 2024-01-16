import models from '../../testData.js';

export const createTodo = async (root, { input }, context) => {
  return models.todos.push({ ...input });
};

export const deleteTodo = async (root, { id }, context) => {
  const index = models.todos.findIndex((item) => item.id === id);
  if (index !== -1) {
    models.todos.splice(index, 1);
    return `Item ${id} deleted successfully.`;
  }
  throw new Error('Id ${id} not found');
};

export const updateTodo = async (root, { id, input }, context) => {
  const index = models.todos.findIndex((item) => item.id === id);
  const item = models.todos.splice(index, 1);

  return models.todos.push({
    ...item,
    ...input,
  });
};

export const queryTodos = async (root, args, context) => {
  return models.todos;
};

export const queryTodo = async (root, { id }, context) => {
  const index = models.todos.findIndex((item) => item.id === id);
  return models.todos.splice(index, 1);
};
