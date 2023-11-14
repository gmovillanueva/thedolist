import { ModalAddTask } from '@components/Modal/ModalAddTask.jsx';

export function NewTaskField() {
  return (
    <fieldset className='w-full text-gray-800'>
      <div className='flex justify-start'>
        <ModalAddTask />
      </div>
    </fieldset>
  );
}
