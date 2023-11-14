import PropTypes from 'prop-types';

export function ButtonFilter({ funcFilter, label }) {
  return (
    <>
      <button
        type='button'
        onClick={funcFilter}
        className='inline-block px-6 py-3 text-center align-middle text-xs uppercase tracking-tight text-gray-50 transition-all ease-in hover:rounded hover:bg-gray-950/25'>
        {label}
      </button>
    </>
  );
}

ButtonFilter.propTypes = {
  funcFilter: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
