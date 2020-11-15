import {
  AUTH_LOGGEDIN,
  AUTH_LOGIN,
  AUTH_LOGIN_ERROR,
  AUTH_LOGOUT,
} from '../types/index';
import { firebase } from '../../firebase';
import { setToken } from '../../utils';
const auth = firebase.auth();
const firestore = firebase.firestore();

export const authenticate = (email, password) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN });
  try {
    const authenticate = await auth.signInWithEmailAndPassword(email, password);
    if (authenticate.user) {
      const token = await auth.currentUser.getIdToken();
      setToken(token);
      const user = await getUserDetails(authenticate.user.uid)();
      dispatch({
        type: AUTH_LOGGEDIN,
        payload: user,
      });
    }
  } catch (e) {
    if (e.message) dispatch({ type: AUTH_LOGIN_ERROR, payload: e.message });
  }
};

export const logout = () => async (dispatch) => {
  await auth.signOut();
  dispatch({ type: AUTH_LOGOUT });
  localStorage.removeItem('FBIdToken');
};

export const setAuth = (user) => async (dispatch) => {
  dispatch({
    type: AUTH_LOGGEDIN,
    payload: user,
  });
};

export const getUserDetails = (uid) => () => {
  return new Promise(async (resolve) => {
    const userSnapShot = await firestore.collection('users').doc(uid).get();
    resolve(userSnapShot.data());
  });
};
