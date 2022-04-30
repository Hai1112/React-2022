import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    updateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    getUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
      state.error = false;
      state.isFetching = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  logoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
