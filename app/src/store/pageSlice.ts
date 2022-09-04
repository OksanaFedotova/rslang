import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentGroup: null,
  currentPage: null,
  markedWordsOnPage: 0,
}

export const slice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setGroup: (state, action) => {state.currentGroup = action.payload},
    setPage: (state, action) => {state.currentPage = action.payload},
    calculateMarkedWords: (state, action) => {state.markedWordsOnPage += action.payload},
    setMarkedWords: (state, action) => {state.markedWordsOnPage = action.payload}
  }
})
export const { setGroup, setPage, calculateMarkedWords, setMarkedWords } = slice.actions;
export default slice.reducer