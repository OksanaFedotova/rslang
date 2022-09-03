import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentGroup: null,
  currentPage: null
}

export const slice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setGroup: (state, action) => {state.currentGroup = action.payload},
    setPage: (state, action) => {state.currentPage = action.payload}
  }
})
export const { setGroup, setPage} = slice.actions;
export default slice.reducer