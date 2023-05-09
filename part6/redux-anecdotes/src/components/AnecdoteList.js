import React from 'react';
import { Anecdote } from './Anecdote';
import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from '../store/reducers/anecdoteReducer';
import { setNotification } from '../store/reducers/notificationReducer';

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

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote.id, anecdote.votes + 1));
    dispatch(
      setNotification(
        `Voted for '${anecdotes.find((a) => a.id === anecdote.id).content}'`
      )
    );
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
