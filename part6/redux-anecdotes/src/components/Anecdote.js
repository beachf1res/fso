import React from 'react';

export const Anecdote = ({ anecdote, onClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => onClick(anecdote)}>vote</button>
      </div>
    </div>
  );
};
