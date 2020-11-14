import {
  AUTH_LOGIN,
  AUTH_LOGGEDIN,
  AUTH_LOGIN_ERROR,
  AUTH_LOGOUT,
} from '../types';

const initState = {
  loading: false,
  user: null,
  authError: null,
};

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        loading: true,
        authError: false,
      };
    case AUTH_LOGGEDIN:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        authError: action.payload,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
