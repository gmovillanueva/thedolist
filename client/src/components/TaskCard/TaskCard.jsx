import PropTypes from 'prop-types';
import { ButtonEdit } from '@components/Buttons/ButtonEdit.jsx';
import { ButtonToggle } from '@components/Buttons/ButtonToggle.jsx';
import { ButtonDelete } from '@components/Buttons/ButtonDelete.jsx';

export function TaskCard({ todoItem }) {
  return (
    <>
      <div className='my-2 flex h-16 w-full items-center justify-between border-2 border-violet-600 bg-gray-100 px-6 text-center '>
        <ButtonToggle todoItem={todoItem} />
        <p className='px-6 py-2 text-violet-600'>{todoItem?.description}</p>
        <div className='flex justify-center'>
          <ButtonEdit />
          <ButtonDelete id={todoItem?.id} />
        </div>
      </div>
    </>
  );
}

TaskCard.propTypes = {
  todoItem: PropTypes.object,
};
