import {
  AUTH_LOGGEDIN,
  AUTH_LOGIN,
  AUTH_LOGIN_ERROR,
  AUTH_LOGOUT,
} from './../types/index';
import { firebase } from '../../firebase';
const auth = firebase.auth();

export const authenticate = (email, password) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN });
  try {
    const authenticate = await auth.signInWithEmailAndPassword(email, password);
    if (authenticate.user) {
      dispatch({
        type: AUTH_LOGGEDIN,
        payload: { email: authenticate.user.email, uid: authenticate.user.uid },
      });
    }
  } catch (e) {
    if (e.message) dispatch({ type: AUTH_LOGIN_ERROR, payload: e.message });
  }
};

export const logout = () => async (dispatch) => {
  await auth.signOut();
  dispatch({ type: AUTH_LOGOUT });
};

export const setAuth = ({ email, uid }) => (dispatch) => {
  dispatch({
    type: AUTH_LOGGEDIN,
    payload: { email, uid },
  });
};
