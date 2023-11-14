import { useEffect } from 'react';

import { useFetchTodos } from '@utils/api/fetchTodos.js';
import { Title } from '@components/Title/Title.jsx';
import { NewTaskField } from '@components/TaskField/NewTaskField.jsx';
import { InformationTabs } from '@components/InformationTabs/InformationTabs.jsx';
import { TaskCard } from '@components/TaskCard/TaskCard.jsx';

function App() {
  const { data, isFetching } = useFetchTodos();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <section className='h-screen bg-gray-100 text-gray-800'>
        <div className='container mx-auto flex flex-col items-center px-4 py-16 text-center md:px-10 md:py-32 lg:px-32 xl:max-w-3xl'>
          <Title />
          <NewTaskField />
          <InformationTabs itemCount={(data && data.length) || 0} />

          {!isFetching &&
            data?.map((todo) => (
              <TaskCard
                key={todo.id}
                todoItem={todo}
              />
            ))}
        </div>
      </section>
    </>
  );
}

export default App;
