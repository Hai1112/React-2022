import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getPostStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getPostSuccess: (state, action) => {
      state.isFetching = false;
      state.posts = action.payload;
      state.error = false;
    },
    getPostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // UPDATE
    updatePostStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updatePostSuccess: (state, action) => {
      state.isFetching = false;
      state.posts[
        state.posts.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.post;
      state.error = false;
    },
    updatePostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //DELETE
    deletePostStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deletePostSuccess: (state, action) => {
      state.isFetching = false;
      state.posts.splice(
        state.posts.findIndex((item) => item._id === action.payload),
        1
      );
      state.error = false;
    },
    deletePostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //ADD
    addPostStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addPostSuccess: (state, action) => {
      state.isFetching = false;
      state.posts.push(action.payload);
      state.error = false;
    },
    addPostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getPostStart,
  getPostSuccess,
  getPostFailure,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
  addPostStart,
  addPostSuccess,
  addPostFailure,
  updatePostStart,
  updatePostSuccess,
  updatePostFailure,
} = postSlice.actions;

export default postSlice.reducer;
