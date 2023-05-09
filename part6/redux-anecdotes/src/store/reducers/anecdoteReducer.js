import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteForAnecdote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    patchAnecdote(state, action) {
      return state.map((a) =>
        a.id === action.payload.id ? action.payload : a
      );
    },
  },
});

export const { addAnecdote, setAnecdotes, patchAnecdote } =
  anecdoteSlice.actions;

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(addAnecdote(newAnecdote));
  };
};

export const voteForAnecdote = (id, votes) => {
  return async (dispatch) => {
    const patchedAnecdote = await anecdoteService.vote(id, votes);
    dispatch(patchAnecdote(patchedAnecdote));
  };
};

export default anecdoteSlice.reducer;
