import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import { PencilSimpleLine, X } from '@phosphor-icons/react';
import { useEditTask } from '@utils/api/queryTask.js';
import {
  openModal,
  closeModal,
} from '@utils/sharedFunctions/modalFunctions.js';

export function ModalEditTask({ todoItem }) {
  const { handleSubmit, control } = useForm();
  const { mutate } = useEditTask();
  const editModalID = `edit-task-modal-${todoItem.id}`;

  function editTask(data) {
    mutate(
      { ...data, is_completed: false, id: todoItem.id },
      {
        onSuccess: (data) => {
          console.log('Task Edited Successfully With:', data);
          window.location.reload();
        },
      }
    );
  }

  return (
    <>
      <button
        onClick={() => openModal(editModalID)}
        className='block p-2 transition-all ease-in hover:scale-105'
        type='button'>
        <PencilSimpleLine size={24} />
      </button>

      {/* Main modal */}
      <div
        id={editModalID}
        aria-hidden='true'
        data-modal='data-modal'
        className='fixed inset-x-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0'>
        <div className='relative mx-auto my-12 max-h-full w-full max-w-2xl p-4'>
          {/* Modal Content */}
          <div className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
            {/* Modal Header */}
            <div className='flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Edit Task
              </h3>
              <button
                type='button'
                onClick={() => closeModal(editModalID)}
                className='ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide={editModalID}>
                <X size={16} />
                <span className='sr-only'>Close modal</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit(editTask)}>
              <div className='space-y-4 p-4 md:p-5'>
                <Controller
                  defaultValue={todoItem.description}
                  control={control}
                  name='description'
                  render={({ field: { onBlur, onChange, name, value } }) => (
                    <>
                      <input
                        name={name}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        type='text'
                        placeholder='Ex. Finish Baldurs Gate 3'
                        className='w-full rounded bg-gray-100 py-2 text-sm text-gray-800 focus:border-violet-600 focus:bg-gray-50 focus:outline-none'
                      />
                    </>
                  )}></Controller>
              </div>
              {/* Modal Footer */}
              <div className='flex items-center rounded-b border-t border-gray-200 p-4 dark:border-gray-600 md:p-5'>
                <button
                  data-modal-hide={editModalID}
                  type='submit'
                  className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                  Edit Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

ModalEditTask.propTypes = {
  todoItem: PropTypes.object.isRequired,
};
