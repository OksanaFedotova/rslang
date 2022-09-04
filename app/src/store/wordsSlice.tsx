import { createSlice } from "@reduxjs/toolkit";
import IWord from '../Interfaces/IWord'

interface usersWords {
    difficult: IWord[],
    studied: IWord[],
    newWords: IWord[],
}

const initialState: usersWords = {
    difficult: [],
    studied: [],
    newWords: [],
}

export const slice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setDifficultWords: (state, action) => {
      state.difficult.push(action.payload);
    },
    setStudiedtWords: (state, action) => {
      state.studied.push(action.payload);
    },
    setNewWords: (state, action) => {
      state.newWords.push(action.payload);
    },
    setAllDifficultWords: (state, action) => {
       state.difficult = action.payload;
    }
  } 
})
export const { setDifficultWords, setAllDifficultWords } = slice.actions;
export default slice.reducer