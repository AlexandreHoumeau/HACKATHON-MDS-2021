import axios from 'axios';
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./type";
import setAuthToken from '../utils/setAuthToken';
const instance = axios.create({baseURL: 'http://localhost:5000'})

export const loginUser = userData => dispatch => {
  instance
    .post("/api/auth/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      console.log(err)
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err
      // })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};