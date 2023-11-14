export function ListContainer() {
  return (
    <>
      <div className='flex h-16 w-full justify-between rounded-t-md bg-violet-600 px-6 align-middle text-sm leading-tight' />
      <div className='flex h-16 w-full items-center justify-center border border-x-2 border-violet-600 bg-gray-100 px-6 text-center '>
        <p className='px-6 py-2 text-violet-600'>No Tasks</p>
      </div>
      <div className='flex h-16 w-full justify-between rounded-b-md bg-violet-600 px-6 align-middle text-sm leading-tight' />
    </>
  );
}
