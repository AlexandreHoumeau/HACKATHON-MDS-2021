import { combineReducers } from "redux";
import authReducer from "./authReducers";
// import errorReducer from "./errorReducers";
// import contactUser from "./contactUser"
// import searchresult from "./searchResult"
export default combineReducers({
  auth: authReducer,
  // errors: errorReducer,
  // contact: contactUser,
  // search: searchresult
});