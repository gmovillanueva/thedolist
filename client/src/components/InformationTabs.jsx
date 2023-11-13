export function InformationTabs() {
  return (
      <>
        <div className="flex justify-between align-middle w-full h-16 px-6 bg-violet-600 rounded-md text-sm leading-tight">
          <p className="text-gray-50 my-auto">1 item left</p>
          <p className="text-gray-50 my-auto gap-x-3">All</p>
          <p className="text-gray-50 my-auto gap-x-3">Pending</p>
          <p className="text-gray-50 my-auto gap-x-3">Completed</p>
          <p className="text-gray-50 my-auto gap-x-3">Clear Completed</p>
        </div>
      </>
  );
}
