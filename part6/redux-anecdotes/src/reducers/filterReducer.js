const reducer = (state = '', action) => {
  if (action.type === 'FILTER') {
    return action.payload;
  }

  return state;
};

export function setFilter(query) {
  return {
    type: 'FILTER',
    payload: query,
  };
}

export default reducer;
