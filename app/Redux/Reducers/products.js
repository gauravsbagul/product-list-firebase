/* eslint-disable no-unreachable */
import { ACTION_TYPE } from '../Actions/constants';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPE.UPLOAD_PRODUCT:
      return {
        ...state,
        uploadProduct: payload,
      };
    case ACTION_TYPE.GET_PRODUCT:
      return {
        ...state,
        getProductResponse: payload,
      };

    default:
      return state;
  }
};
