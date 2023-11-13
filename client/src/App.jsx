import { fetchTodos } from "@utils/api/fetchTodos.js";
import { Title } from "@components/Title.jsx";
import { NewTaskField } from "@components/NewTaskField.jsx";
import { InformationTabs} from "@components/InformationTabs.jsx";
import { TaskCard } from "@components/TaskCard.jsx";


async function App() {
  const todoList = await fetchTodos();
  return (
    <>
      <section className="bg-gray-100 text-gray-800 h-screen">
        <div
            className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl"
        >
          <Title />
          <NewTaskField />
          <InformationTabs />

          {todoList?.map(

          )}
          <TaskCard />

        </div>
      </section>
    </>
  )
}

export default App
