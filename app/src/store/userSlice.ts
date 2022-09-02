import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  data: {},
}

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setUserAuth: (state, action) => {state.isAuth = action.payload},
  }
})
export const { setUser, setUserAuth} = slice.actions;
export default slice.reducer