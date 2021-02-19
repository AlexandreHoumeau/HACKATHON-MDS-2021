import { SET_CURRENT_USER } from "../actions/types";
const initialState = {
  token: null
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
};
export default userReducer;
