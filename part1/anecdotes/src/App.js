import { useState } from 'react';
import './App.css';

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const randomAnecdoteHandler = () => {
    const nextAnecdoteIdx = Math.floor(Math.random() * anecdotes.length);
    setSelected(nextAnecdoteIdx);
  };

  const voteHandler = () => {
    const copy = [...points];
    copy[selected]++;
    setPoints(copy);
  };

  function getMostVotedAnecdote() {
    const maxVal = Math.max(...points);
    const maxValIdx = points.indexOf(maxVal);

    return anecdotes[maxValIdx];
  }

  return (
    <div className='App'>
      <h1>Random Anecdote</h1>
      <p>{anecdotes[selected]}</p>
      <div>
        <button onClick={randomAnecdoteHandler}>next anecdote</button>
        <button onClick={voteHandler}>vote</button>
      </div>
      <h2>Most voted anecdote</h2>
      <p>{getMostVotedAnecdote()}</p>
    </div>
  );
}

export default App;
