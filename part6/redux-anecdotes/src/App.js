import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import NewAnecdoteForm from './components/NewAnecdoteForm';
import Notification from './components/Notification';

import anecdoteService from './services/anecdotes';
import { setAnecdotes } from './store/reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <NewAnecdoteForm />
    </div>
  );
};

export default App;
