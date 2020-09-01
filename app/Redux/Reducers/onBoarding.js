/* eslint-disable no-unreachable */
import { ACTION_TYPE } from '../Actions/constants';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPE.LOGIN:
      return {
        ...state,
        login: payload,
        userLoggedOut: false,
      };
    case ACTION_TYPE.IS_LOGIN:
      return {
        ...state,
        isLogin: payload,
        userLoggedOut: action.payload.error,
      };
    case ACTION_TYPE.LOGOUT:
      return {
        state: undefined,
        userLoggedOut: true,
      };
    default:
      return state;
  }
};
