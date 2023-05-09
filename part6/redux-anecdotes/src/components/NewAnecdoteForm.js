import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../store/reducers/anecdoteReducer';
import { setNotification } from '../store/reducers/notificationReducer';

const NewAnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdoteHandler = async (event) => {
    event.preventDefault();
    const { target: form } = event;
    const anecdoteContent = form.content.value;
    form.content.value = '';

    dispatch(createAnecdote(anecdoteContent));
    dispatch(setNotification(`${anecdoteContent} was added to the list`));
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
