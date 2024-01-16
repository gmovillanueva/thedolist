import models from '../../../testData.js';

export default async (root, args, context) => {
  return models.todos;
};
