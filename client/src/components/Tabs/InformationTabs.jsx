import PropTypes from 'prop-types';
import { useState } from 'react';
import { filter } from 'ramda';

import { ButtonFilter } from '@components/Buttons/ButtonFilter.jsx';
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
      {/*Top Container*/}
      <div className='flex h-16 w-full justify-between rounded-t-md bg-violet-600 px-6 align-middle text-sm leading-tight'>
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
      </div>
      {/*Task Cards*/}
      {todoData.length ? (
        todoData?.map((todo) => (
          <TaskCard
            key={todo.id}
            todoItem={todo}
          />
        ))
      ) : (
        <>
          <div className='flex h-16 w-full items-center justify-center border border-x-2 border-violet-600 bg-gray-100 px-6 text-center '>
            <p className='px-6 py-2 text-violet-600'>No Tasks</p>
          </div>
        </>
      )}
      {/*Bottom Container*/}
      <div className='flex h-16 w-full justify-between rounded-b-md bg-violet-600 px-6 align-middle text-sm leading-tight'>
        <p className='my-auto text-gray-50'>{ReturnString(itemCount)}</p>
      </div>
    </>
  );
}

InformationTabs.propTypes = {
  itemCount: PropTypes.number,
  todoList: PropTypes.array,
};
