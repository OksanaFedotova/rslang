import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentGroup: null,
  currentPage: null,
  resultPage: null,
  resultGroup: null,
  markedWordsOnPage: <any>[],
}

export const slice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setGroup: (state, action) => {state.currentGroup = action.payload},
    setPage: (state, action) => {state.currentPage = action.payload},
    setResultGroup: (state, action) => {state.resultGroup = action.payload},
    setResultPage: (state, action) => {state.resultPage = action.payload},
    setMarkedWords: (state, action) => {
      const temp = [...state.markedWordsOnPage];
      temp.push(action.payload);
      const setTemp = <any>[];
      temp.forEach((el) => {
        const notUnique = setTemp.reduce((isNotUnique: boolean, val: any) => isNotUnique || val.wordId === el.wordId, false);
        if (!notUnique) {
          setTemp.push(el)
        }
      })
      state.markedWordsOnPage = setTemp;
    },
    addMarkedWords: (state, action) => {state.markedWordsOnPage.push(action.payload)},
    removeMarkedWords: (state, action) => {
      const temp = [...state.markedWordsOnPage].filter((word) => word.wordId !== action.payload);
      state.markedWordsOnPage = temp;
    }
  }
})
export const { setGroup, setPage, setMarkedWords, addMarkedWords, removeMarkedWords, setResultGroup, setResultPage} = slice.actions;
export default slice.reducer