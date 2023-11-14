import PropTypes from 'prop-types';
import { ButtonAll } from '@components/Buttons/ButtonAll.jsx';
import { ButtonActive } from '@components/Buttons/ButtonActive.jsx';
import { ButtonCompleted } from '@components/Buttons/ButtonCompleted.jsx';

export function InformationTabs({ itemCount }) {
  function ReturnString(itemCount) {
    if (itemCount === 0 || itemCount > 1) {
      return `${itemCount} items left`;
    }
    return `${itemCount} item left`;
  }

  return (
    <>
      <div className='mb-2 flex h-16 w-full justify-between rounded-md bg-violet-600 px-6 align-middle text-sm leading-tight'>
        <p className='my-auto text-gray-50'>{ReturnString(itemCount)}</p>
        <ButtonAll />
        <ButtonActive />
        <ButtonCompleted />
        <p className='my-auto gap-x-3 text-gray-50'>Completed</p>
        <p className='my-auto gap-x-3 text-gray-50'>Clear Completed</p>
      </div>
    </>
  );
}

InformationTabs.propTypes = {
  itemCount: PropTypes.number,
};
