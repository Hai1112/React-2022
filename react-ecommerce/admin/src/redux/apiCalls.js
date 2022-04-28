import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "./productRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await userRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProducts = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProducts = async (dispatch, id, product) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProducts = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products/`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
