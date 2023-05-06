import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const NewAnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdoteHandler = (event) => {
    event.preventDefault();
    const { target: form } = event;
    const anecdoteContent = form.content.value;
    form.content.value = '';

    dispatch(createAnecdote(anecdoteContent));
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
