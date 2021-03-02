import * as actionTypes from './actionTypes';
import axios from '../../axios-auth';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: authData.token,
    userId: authData.userId,
    error: null,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const signOut = () => {
  return {
    type: actionTypes.AUTH_SIGN_OUT,
  };
};

export const checkAuthTimeout = (time) => {
  return (dispatch) => {
    const ms = time - new Date();
    setTimeout(() => {
      dispatch(signOut());
    }, ms);
  };
};

export const signIn = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .signIn(email, password)
      .then((response) => {
        dispatch(authSuccess(response));
        dispatch(checkAuthTimeout(response.expirationTime));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const signUp = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .signUp(email, password)
      .then((response) => {
        dispatch(authSuccess(response));
        dispatch(checkAuthTimeout(response.expirationTime));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};
