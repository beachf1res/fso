import { setFilter } from '../store/reducers/filterReducer';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();

  const style = {
    marginBottom: 10,
  };

  const handleChange = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
