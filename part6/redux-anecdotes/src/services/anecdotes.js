import axios from 'axios';

const BASE_URL = 'http://localhost:3001/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const createNew = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
    id: getId(),
  };

  const response = await axios.post(BASE_URL, newAnecdote);
  return response.data;
};

const vote = async (id, votes) => {
  const response = await axios.patch(`${BASE_URL}/${id}`, { votes });
  return response.data;
};

const module = { getAll, createNew, vote };
export default module;
