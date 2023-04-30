import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
  const req = await axios.get(baseUrl);
  return req.data;
};

const createPerson = async (newPerson) => {
  const req = await axios.post(baseUrl, newPerson);
  return req.data;
};

const deletePerson = async (id) => {
  const req = await axios.delete(`${baseUrl}/${id}`);
  return req.data;
};

const updatePerson = async (id, updatedPerson) => {
  const req = await axios.put(`${baseUrl}/${id}`, updatedPerson);
  return req.data;
};

const module = {
  getAll,
  createPerson,
  deletePerson,
  updatePerson,
};

export default module;
