import { createSlice } from "@reduxjs/toolkit";
import IWord from '../Interfaces/IWord'

interface usersWords {
  words: {
    difficult: IWord[],
    studied: IWord[],
    newWords: IWord[],
  }
}

const initialState: usersWords = {
  words: {
    difficult: [],
    studied: [],
    newWords: [],
  }
}

export const slice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setDifficultWords: (state, action) => {
      state.words.difficult.push(action.payload);
    },
    setStudiedtWords: (state, action) => {
      state.words.studied.push(action.payload);
    },
    setnewWords: (state, action) => {
      state.words.newWords.push(action.payload);
    },
  }
})
export const { setDifficultWords } = slice.actions;
export default slice.reducer