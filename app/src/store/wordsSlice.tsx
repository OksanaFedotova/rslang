import { createSlice } from "@reduxjs/toolkit";
import { _IWord } from "../Interfaces/IWord";

interface usersWords {
  difficult: _IWord[];
}

const initialState: usersWords = {
  difficult: []
};

export const slice = createSlice({
  name: "words",
  initialState,
  reducers: {
    setDifficultWords: (state, action: { payload: _IWord }) => {
      state.difficult.push(action.payload);
    },
    setAllDifficultWords: (state, action: { payload: _IWord[] }) => {
      state.difficult = action.payload;
    }
  }
});
export const { setDifficultWords, setAllDifficultWords } = slice.actions;
export default slice.reducer;
