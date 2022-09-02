import { configureStore } from '@reduxjs/toolkit';
import user from './userSlice';
import words from './wordsSlice';

export default configureStore({
  reducer: {
    user,
    words
  },
});