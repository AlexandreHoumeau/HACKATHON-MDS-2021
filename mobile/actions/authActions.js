import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { url } from "../config/keys";
import AsyncStorage from "@react-native-community/async-storage";
import { SET_CURRENT_USER, SET_ERROR_MESSAGE } from "./types";

export const login = userData => dispatch => {
  axios
    .post(`${url}/api/auth/login`, userData)
    .then(async res => {
      const { token } = res.data;
      if (token != undefined) {
        dispatch(tokenHandler(token));
        dispatch(setToken(token));
        dispatch(errorHandler(null));
      } else {
        dispatch(errorHandler(red.data));
      }
    })
    .catch(err => {
      if (err.request) {
        dispatch(errorHandler(err.request._response));
      } else {
        dispatch(errorHandler("Mot de passe ou email incorrect"));
      }
    });
};

export const logoutUser =  () => async dispatch => {
  dispatch(setToken(null));
  await AsyncStorage.removeItem("token");
};

export const tokenHandler = token => async dispatch => {
  const payload = {
    token
  };
  await AsyncStorage.setItem("token", token);
  setAuthToken(token);
};

export const errorHandler = value => {
  return {
    type: SET_ERROR_MESSAGE,
    payload: value
  };
};

export const setToken = token => {
  return {
    type: SET_CURRENT_USER,
    payload: token
  };
};
