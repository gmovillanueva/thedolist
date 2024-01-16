import models from '../../../testData.js';

export default async (root, { input }, context) => {
  return models.todos.push({ ...input });
};
