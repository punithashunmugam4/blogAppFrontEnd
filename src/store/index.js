import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      if (localStorage.getItem("userId")) {
        localStorage.removeItem("userId");
      }
      // if (localStorage.getItem("accessToken")) {
      //   localStorage.removeItem("accessToken");
      // }
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
