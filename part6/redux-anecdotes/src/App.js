import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import NewAnecdoteForm from './components/NewAnecdoteForm';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <NewAnecdoteForm />
    </div>
  );
};

export default App;
