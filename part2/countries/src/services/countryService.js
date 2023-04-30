import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

const getAll = async () => {
  const res = await axios.get(`${BASE_URL}/all`);
  return res.data;
};

const queryByName = async (str) => {
  const res = await axios.get(`${BASE_URL}/name/${str}`);
  return res.data;
};

export { getAll, queryByName };
