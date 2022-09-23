import { createSlice } from "@reduxjs/toolkit";
import { IUserExist } from "../Interfaces/IUser";

interface IUserState {
  isAuth: boolean;
  data: IUserExist | null;
}

const initialState: IUserState = {
  isAuth: false,
  data: {
    token: "",
    refreshToken: "",
    expire: 0,
    userId: "",
    name: ""
  }
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: IUserState, action: { payload: IUserExist | null }) => {
      state.data = action.payload;
    },
    setUserAuth: (state: IUserState, action: { payload: boolean }) => {
      state.isAuth = action.payload;
    }
  }
});
export const { setUser, setUserAuth } = slice.actions;
export default slice.reducer;
