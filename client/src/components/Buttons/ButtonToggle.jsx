import { Controller, useForm } from 'react-hook-form';

import PropTypes from 'prop-types';
import { useEditTask } from '@utils/api/queryTask.jsx';

export function ButtonToggle({ todoItem }) {
  const { id, is_completed } = { ...todoItem };
  const { control } = useForm();

  const { mutate } = useEditTask(id);

  function updateSubmit(event, onChangeFunction) {
    onChangeFunction(event.target.checked);
    const data = {
      ...todoItem,
      is_completed: event.target.checked,
    };
    mutate(data, {});
  }

  return (
    <>
      <form>
        <Controller
          defaultValue={is_completed}
          control={control}
          name='is_completed'
          render={({ field: { onChange, name, value } }) => (
            <>
              <input
                name={name}
                checked={value}
                onChange={(event) => updateSubmit(event, onChange)}
                type='checkbox'
                className='rounded-full'
              />
            </>
          )}></Controller>
      </form>
    </>
  );
}

ButtonToggle.propTypes = {
  todoItem: PropTypes.object.isRequired,
};
