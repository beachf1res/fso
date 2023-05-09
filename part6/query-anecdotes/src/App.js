import { useMutation, useQuery, useQueryClient } from 'react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, updateAnecdote } from './requests';

const App = () => {
  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });
  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const handleVote = (anecdote) => {
    console.log({ ...anecdote, votes: anecdote.votes + 1 });
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    // patchAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (result.isLoading) {
    return <div>loading...</div>;
  }
  if (result.isError) {
    return <div>Server must have encountered some error. Try again later.</div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
