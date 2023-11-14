import { PencilSimpleLine } from '@phosphor-icons/react';

export function ButtonEdit() {
  return (
    <>
      <button className='p-2 transition-all ease-in hover:scale-105'>
        <PencilSimpleLine size={24} />
      </button>
    </>
  );
}
