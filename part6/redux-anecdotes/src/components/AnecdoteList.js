import React from 'react';
import { Anecdote } from './Anecdote';
import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (!filter) {
      return anecdotes;
    }

    return anecdotes.filter(
      (anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase()) ||
        anecdote.content.toLowerCase().startsWith(filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  const sortedByVotesAnecdotes = [...anecdotes].sort(
    (a, b) => b.votes - a.votes
  );

  const vote = (id) => {
    dispatch(voteForAnecdote(id));
  };

  return (
    <div>
      {sortedByVotesAnecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} onClick={vote} anecdote={anecdote} />
      ))}
    </div>
  );
};

export default AnecdoteList;
