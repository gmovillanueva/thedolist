import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { X } from '@phosphor-icons/react';
import { useCreateTask } from '@utils/api/queryTask.jsx';

export function ModalAddTask() {
  const { handleSubmit, control } = useForm();
  const { mutate } = useCreateTask();

  useEffect(() => {
    window.onclick = function (event) {
      const modal = document.getElementById('default-modal');
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }, []);

  function openModal() {
    const modal = document.getElementById('default-modal');
    modal.style.display = 'block';
  }

  function closeModal() {
    const modal = document.getElementById('default-modal');
    modal.style.display = 'none';
  }

  function createTask(data) {
    mutate(
      { ...data, is_completed: false },
      {
        onSuccess: (data) => {
          console.log('Task Created Successfully With:', data);
          window.location.reload();
        },
      }
    );
  }

  return (
    <>
      <button
        onClick={() => openModal()}
        data-modal-toggle='default-modal'
        className='block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        type='button'>
        Toggle modal
      </button>

      <div
        id='default-modal'
        aria-hidden='true'
        className='fixed inset-x-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0'>
        <div className='relative mx-auto my-12 max-h-full w-full max-w-2xl p-4'>
          <div className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
            <div className='flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Add a Task
              </h3>
              <button
                type='button'
                onClick={() => closeModal()}
                className='ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide='default-modal'>
                <X size={16} />
                <span className='sr-only'>Close modal</span>
              </button>
            </div>

            <form onSubmit={handleSubmit(createTask)}>
              <div className='space-y-4 p-4 md:p-5'>
                <Controller
                  defaultValue=''
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
              <div className='flex items-center rounded-b border-t border-gray-200 p-4 dark:border-gray-600 md:p-5'>
                <button
                  data-modal-hide='default-modal'
                  type='submit'
                  className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
