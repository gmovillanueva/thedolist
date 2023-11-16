import PropTypes from 'prop-types';
import { ButtonToggle } from '@components/Buttons/ButtonToggle.jsx';
import { ButtonDelete } from '@components/Buttons/ButtonDelete.jsx';
import { ModalEditTask } from '@components/Modal/ModalEditTask.jsx';

export function TaskCard({ todoItem }) {
  const descriptionClass = todoItem.is_completed ? 'line-through' : '';
  return (
    <>
      <div className='flex min-h-fit w-full items-center justify-between border border-x-2 border-violet-600 bg-gray-100 px-6 text-center md:h-16 '>
        <ButtonToggle todoItem={todoItem} />
        <div className='flex h-full flex-wrap items-center'>
          <p className={`px-6 py-2 text-violet-600 ${descriptionClass}`}>
            {todoItem?.description}
          </p>
        </div>
        <div className='flex justify-center'>
          <ModalEditTask todoItem={todoItem} />
          <ButtonDelete id={todoItem?.id} />
        </div>
      </div>
    </>
  );
}

TaskCard.propTypes = {
  todoItem: PropTypes.object,
};
