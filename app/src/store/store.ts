import { configureStore } from '@reduxjs/toolkit';
import user from './userSlice';
import words from './wordsSlice';
import page from './pageSlice';

export default configureStore({
  reducer: {
    user,
    words,
    page
  },
});