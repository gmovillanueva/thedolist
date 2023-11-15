import { TrashSimple } from '@phosphor-icons/react';
import { useDeleteTask } from '@utils/api/queryTask.js';
import PropTypes from 'prop-types';

export function ButtonDelete({ id }) {
  const { mutate } = useDeleteTask();

  function deleteTaskItem() {
    mutate(id, {
      onSuccess: () => {
        console.log('Task Deleted Successfully With:');
        window.location.reload();
      },
    });
  }

  return (
    <>
      <button
        onClick={() => deleteTaskItem()}
        className='p-2 transition-all ease-in hover:scale-105'>
        <TrashSimple
          className='fill-violet-600'
          size={24}
        />
      </button>
    </>
  );
}

ButtonDelete.propTypes = {
  id: PropTypes.number.isRequired,
};
