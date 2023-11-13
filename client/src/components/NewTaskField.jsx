export function NewTaskField() {
  return (
      <fieldset className="w-full text-gray-800">
        <div className="flex justify-between">
          <input
              type="text"
              name="taskinput"
              placeholder="Input a task"
              className="w-full py-2 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-violet-600"
          />
          <button type="button" className="px-6 py-2 font-semibold rounded-md bg-violet-600 text-gray-100">
            Add Task
          </button>
        </div>
      </fieldset>
  );
}
