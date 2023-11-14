export function NewTaskField() {
  return (
    <fieldset className='w-full text-gray-800'>
      <div className='flex justify-between'>
        <input
          type='text'
          name='taskinput'
          placeholder='Input a task'
          className='w-full rounded-md bg-gray-100 py-2 text-sm text-gray-800 focus:border-violet-600 focus:bg-gray-50 focus:outline-none sm:w-auto'
        />
        <button
          type='button'
          className='rounded-md bg-violet-600 px-6 py-2 font-semibold text-gray-100'>
          Add Task
        </button>
      </div>
    </fieldset>
  );
}
