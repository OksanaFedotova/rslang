import { createSlice } from "@reduxjs/toolkit";
import IUserWord from "../Interfaces/IUserWord";
import IPageState from "../Interfaces/statesInterfaces/IPageState";

const initialState: IPageState = {
  currentGroup: null,
  currentPage: null,
  markedWordsOnPage: []
};
export const slice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setGroup: (
      state: IPageState,
      action: { payload: number | null; type: string }
    ) => {
      state.currentGroup = action.payload;
    },
    setPage: (
      state: IPageState,
      action: { payload: number | null; type: string }
    ) => {
      state.currentPage = action.payload;
    },
    setMarkedWords: (
      state: IPageState,
      action: { payload: IUserWord; type: string }
    ) => {
      const temp = [...state.markedWordsOnPage];
      temp.push(action.payload);
      const setTemp: IUserWord[] = [];
      temp.forEach(el => {
        const notUnique = setTemp.reduce(
          (isNotUnique: boolean, val: IUserWord) =>
            isNotUnique || val.wordId === el.wordId,
          false
        );
        if (!notUnique) {
          setTemp.push(el);
        }
      });
      state.markedWordsOnPage = setTemp;
    },
    addMarkedWords: (
      state: IPageState,
      action: { payload: IUserWord; type: string }
    ) => {
      let result: IUserWord[] = [];
      result = state.markedWordsOnPage;
      result.push(action.payload);
      state.markedWordsOnPage = result;
    },
    removeMarkedWords: (state, action) => {
      const temp = [...state.markedWordsOnPage].filter(
        word => word.wordId !== action.payload
      );
      state.markedWordsOnPage = temp;
    },
    cleanMarkedWords: state => {
      state.markedWordsOnPage = [];
    }
  }
});
export const {
  setGroup,
  setPage,
  setMarkedWords,
  addMarkedWords,
  removeMarkedWords,
  cleanMarkedWords
} = slice.actions;
export default slice.reducer;
