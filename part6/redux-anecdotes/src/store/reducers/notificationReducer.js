import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationText(state, action) {
      return action.payload;
    },
    clearNotification() {
      return '';
    },
  },
});

export const { setNotificationText, clearNotification } =
  notificationSlice.actions;

export const setNotification = (message, timeout = 2000) => {
  return async (dispatch) => {
    dispatch(setNotificationText(message));
    setTimeout(() => {
      console.log(123);
      dispatch(clearNotification());
    }, timeout);
  };
};

export default notificationSlice.reducer;
