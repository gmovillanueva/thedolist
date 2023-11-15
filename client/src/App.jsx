import { useFetchTodos } from '@utils/api/queryTodos.js';
import { TextTitle } from '@components/Text/TextTitle.jsx';
import { NewTaskField } from '@components/TaskField/NewTaskField.jsx';
import { InformationTabs } from '@components/Tabs/InformationTabs.jsx';

// import { ListContainer } from '@components/Container/ListContainer.jsx';

function App() {
  const { data, isFetching } = useFetchTodos();

  return (
    <>
      <div className='h-screen bg-gray-100 text-gray-800'>
        <div className='container mx-auto flex flex-col items-center px-4 py-16 text-center md:px-10 md:py-32 lg:px-32 xl:max-w-3xl'>
          <TextTitle />
          <NewTaskField />

          {/*<ListContainer />*/}
          {isFetching ? null : (
            <InformationTabs
              todoList={data}
              itemCount={(data && data.length) || 0}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
