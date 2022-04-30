import { publicRequest, userRequest } from "../requestMethods";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
  getUserStart,
  getUserSuccess,
  getUserFailure,
} from "./userRedux";
import {
  getPostStart,
  getPostSuccess,
  getPostFailure,
  updatePostStart,
  updatePostFailure,
  updatePostSuccess,
  deletePostStart,
  deletePostFailure,
  deletePostSuccess,
  addPostStart,
  addPostFailure,
  addPostSuccess,
} from "./postRedux";
import {
  getCoverFailure,
  getCoverStart,
  getCoverSuccess,
  updateCoverFailure,
  updateCoverStart,
  updateCoverSuccess,
} from "./coverRedux";
import {
  getAboutFailure,
  getAboutStart,
  getAboutSuccess,
  updateAboutFailure,
  updateAboutStart,
  updateAboutSuccess,
} from "./aboutRedux";

//LOGIN
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

//LOGOUT
export const logout = async (dispatch) => {
  dispatch(logoutSuccess());
};

//UPDATE USER
export const updateUser = async (dispatch, user, id) => {
  dispatch(updateStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateSuccess(res.data));
  } catch (err) {
    dispatch(updateFailure());
  }
};

//GET USER
export const getUser = async (dispatch, id) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get(`/users/find/${id}`);
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    getUserFailure(err);
  }
};

//GET POST
export const getPosts = async (dispatch, cat) => {
  dispatch(getPostStart());
  try {
    const res = await publicRequest.get(`/posts/?category=${cat}`);
    dispatch(getPostSuccess(res.data));
  } catch (err) {
    dispatch(getPostFailure());
  }
};

//UPDATE POST
export const updatePost = async (post, dispatch, id) => {
  dispatch(updatePostStart());
  try {
    const res = await userRequest.put(`/posts/${id}`, post);
    dispatch(updatePostSuccess(res.data));
  } catch (err) {
    dispatch(updatePostFailure());
  }
};

//DELETE POST
export const deletePost = async (dispatch, id) => {
  dispatch(deletePostStart());
  try {
    await userRequest.delete(`/posts/${id}`);
    dispatch(deletePostSuccess(id));
  } catch (err) {
    dispatch(deletePostFailure());
  }
};

//CREATE POST
export const addPost = async (post, dispatch) => {
  dispatch(addPostStart());
  try {
    const res = await userRequest.post(`/posts/`, post);
    dispatch(addPostSuccess(res.data));
  } catch (err) {
    dispatch(addPostFailure());
  }
};

//GET COVER
export const getCover = async (dispatch) => {
  dispatch(getCoverStart());
  try {
    const res = await publicRequest.get("/cover");
    dispatch(getCoverSuccess(res.data));
  } catch (err) {
    dispatch(getCoverFailure());
  }
};

//UPDATE COVER
export const updateCover = async (dispatch, cover, id) => {
  dispatch(updateCoverStart());
  try {
    const res = await userRequest.put(`/cover/${id}`, cover);
    dispatch(updateCoverSuccess(res.data));
  } catch (err) {
    dispatch(updateCoverFailure());
  }
};

//GET ABOUT
export const getAbout = async (dispatch) => {
  dispatch(getAboutStart());
  try {
    const res = await publicRequest.get("/about");
    dispatch(getAboutSuccess(res.data));
  } catch (err) {
    dispatch(getAboutFailure());
  }
};

//UPDATE ABOUT
export const updateAbout = async (dispatch, about, id) => {
  dispatch(updateAboutStart());
  try {
    const res = await userRequest.put(`/about/${id}`, about);
    dispatch(updateAboutSuccess(res.data));
  } catch (err) {
    dispatch(updateAboutFailure());
  }
};
