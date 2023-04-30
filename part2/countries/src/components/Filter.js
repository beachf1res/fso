import { debounce } from '../utils';

export const Filter = ({ value, onFilterChange }) => {
  return (
    <div>
      <h2>Search countries</h2>
      <div>
        <input
          value={value}
          onChange={onFilterChange}
          placeholder='Type to search...'
        />
      </div>
    </div>
  );
};
