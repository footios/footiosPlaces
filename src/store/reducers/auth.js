import {
    AUTH_TOKEN
  } from "../actions/actionTypes";
  
  const initialState = {
    toke : null
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTH_TOKEN:
        return {
          ...state,
          token: action.token
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  