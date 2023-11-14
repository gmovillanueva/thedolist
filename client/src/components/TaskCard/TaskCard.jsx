import {
  Circle,
  CheckCircle,
  PencilSimpleLine,
  TrashSimple,
} from '@phosphor-icons/react';
import PropTypes from 'prop-types';

export function TaskCard({ todoItem }) {
  return (
    <>
      <div className='my-2 flex h-16 w-full items-center justify-between rounded-md border-2 border-violet-600 bg-gray-100 px-6 text-center '>
        <div className='p-2'>
          <Circle size={32} />
        </div>
        <p className='px-6 py-2 text-violet-600'>{todoItem?.description}</p>
        <div className='flex justify-center'>
          <div className='p-2'>
            <PencilSimpleLine size={24} />
          </div>
          <div className='p-2'>
            <TrashSimple size={24} />
          </div>
        </div>
      </div>
    </>
  );
}

TaskCard.propTypes = {
  todoItem: PropTypes.object,
};
