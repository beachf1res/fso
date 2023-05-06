import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import NewAnecdoteForm from './components/NewAnecdoteForm';
import Notification from './components/Notification';

const App = () => {
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
