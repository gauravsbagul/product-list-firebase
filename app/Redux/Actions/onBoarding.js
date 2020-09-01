// import axios from 'axios';

import auth from '@react-native-firebase/auth';
import { ACTION_TYPE } from './constants';

// Signup with email and password with firebase
export const createUserWithEmailAndPassword = (email, password) => async (
  dispatch,
) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );

    dispatch({
      type: ACTION_TYPE.LOGIN,
      payload: { response: response, error: false },
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPE.LOGIN,
      payload: { response: error, error: true },
    });
  }
};

// Signup with email and password with firebase
export const signInWithEmailAndPassword = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      dispatch({
        type: ACTION_TYPE.LOGIN,
        payload: { response: response, error: false },
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.LOGIN,
        payload: { response: error, error: true },
      });
    }
  };
};

export const clearSignInProps = () => async (dispatch) => {
  dispatch({
    type: ACTION_TYPE.LOGIN,
    payload: undefined,
  });
};

export const logout = () => async (dispatch) => {
  try {
    // await AsyncStorage.removeItem('loginDetails');

    const response = await auth().signOut();
    dispatch({
      type: ACTION_TYPE.LOGOUT,
      payload: { response: 'Error White logging out', error: false },
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPE.LOGOUT,
      payload: { response: 'Error White logging out', error: true },
    });
  }
};
