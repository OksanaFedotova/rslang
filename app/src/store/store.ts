import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import words from "./wordsSlice";
import page from "./pageSlice";

const store = configureStore({
  reducer: {
    user,
    words,
    page
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
