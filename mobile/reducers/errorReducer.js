import { SET_ERROR_MESSAGE } from "../actions/types";
const initialState = {
  message: null
};
const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
};
export default errorReducer;
