import { useMutation } from 'react-query';

import {
  doFetch,
  patchOptions,
  postOptions,
  deleteOptions,
  railsAPI,
} from '@utils/api/apiController.js';

const createTask = (taskDetails) =>
  doFetch(`${railsAPI}/api/v1/todos`, postOptions(taskDetails)).then(
    (data) => data
  );

export const useCreateTask = () =>
  useMutation(createTask, {
    mutationKey: 'createNewTask',
    onSuccess: (data) => data,
  });

const editTask = (taskData) => {
  const data = {
    description: taskData.description,
    is_completed: taskData.is_completed,
  };
  const taskOptions = patchOptions(data);
  return doFetch(`${railsAPI}/api/v1/todos/${taskData.id}`, taskOptions).then(
    (data) => data
  );
};

export const useEditTask = () =>
  useMutation(editTask, {
    mutationKey: 'createEditTask',
    onSuccess: (data) => data,
  });

const deleteTask = (id) =>
  doFetch(`${railsAPI}/api/v1/todos/${id}`, deleteOptions({ id })).then(
    (data) => data
  );

export const useDeleteTask = () =>
  useMutation(deleteTask, {
    mutationKey: 'deleteTask',
    onSuccess: (data) => data,
  });
