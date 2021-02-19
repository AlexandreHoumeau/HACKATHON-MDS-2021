import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import userReducer from "../reducers/userReducer";
import errorReducer from "../reducers/errorReducer";

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )
);
export default store;
