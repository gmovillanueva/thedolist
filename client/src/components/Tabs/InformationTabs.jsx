import PropTypes from 'prop-types';
import { useState } from 'react';
import { filter } from 'ramda';

import { ButtonFilter } from '@components/Buttons/ButtonFilter.jsx';
import { ButtonClear } from '@components/Buttons/ButtonClear.jsx';
import { TaskCard } from '@components/TaskCard/TaskCard.jsx';

export function InformationTabs({ todoList, itemCount }) {
  const [todoData, setTodoData] = useState(todoList || []);

  function ReturnString(itemCount) {
    if (itemCount === 0 || itemCount > 1) {
      return `${itemCount} items left`;
    }
    return `${itemCount} item left`;
  }

  function filterReset() {
    setTodoData(todoList);
    console.log('Reset Called');
  }

  function filterComplete() {
    function ramdaFilter(todo) {
      if (todo.is_completed) {
        return todo;
      }
    }
    const data = filter(ramdaFilter, todoList);
    setTodoData(data);
  }

  function filterActive() {
    function ramdaFilter(todo) {
      if (!todo.is_completed) {
        return todo;
      }
    }
    const data = filter(ramdaFilter, todoList);
    setTodoData(data);
  }

  return (
    <>
      <div className='mb-2 flex h-16 w-full justify-between rounded-md bg-violet-600 px-6 align-middle text-sm leading-tight'>
        <p className='my-auto text-gray-50'>{ReturnString(itemCount)}</p>
        <ButtonFilter
          funcFilter={filterReset}
          label='All'
        />
        <ButtonFilter
          funcFilter={filterActive}
          label='Active'
        />
        <ButtonFilter
          funcFilter={filterComplete}
          label='Completed'
        />
        <ButtonClear />
      </div>
      {todoData?.map((todo) => (
        <TaskCard
          key={todo.id}
          todoItem={todo}
        />
      ))}
    </>
  );
}

InformationTabs.propTypes = {
  itemCount: PropTypes.number,
  todoList: PropTypes.array,
};
