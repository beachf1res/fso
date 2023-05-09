import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../store/reducers/anecdoteReducer';
import {
  setNotification,
  clearNotification,
} from '../store/reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const NewAnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdoteHandler = async (event) => {
    event.preventDefault();
    const { target: form } = event;
    const anecdoteContent = form.content.value;
    form.content.value = '';

    const newAnecdote = await anecdoteService.createNew(anecdoteContent);
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`${anecdoteContent} was added to the list`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <div>
      <form onSubmit={newAnecdoteHandler}>
        <div>
          <input name='content' />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default NewAnecdoteForm;
