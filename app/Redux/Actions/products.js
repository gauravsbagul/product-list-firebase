import firestore from '@react-native-firebase/firestore';
import { ACTION_TYPE } from './constants';

const productCollection = firestore().collection('Product');
export const uploadProduct = (body) => async (dispatch) => {
  try {
    const userDocument = await productCollection.add({ ...body });

    dispatch({
      type: ACTION_TYPE.UPLOAD_PRODUCT,
      payload: { response: userDocument, error: false },
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPE.UPLOAD_PRODUCT,
      payload: { response: error, error: true },
    });
  }
};

export const clearUploadProductProps = () => async (dispatch) => {
  dispatch({
    type: ACTION_TYPE.UPLOAD_PRODUCT,
    payload: undefined,
  });
};

export const getProduct = () => async (dispatch) => {
  try {
    let productData = [];
    const querySnapshot = await productCollection.get();

    querySnapshot.forEach((documentSnapshot) => {
      productData.push({
        id: documentSnapshot.id,
        data: documentSnapshot.data(),
      });
    });
    dispatch({
      type: ACTION_TYPE.GET_PRODUCT,
      payload: { response: productData, error: false },
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPE.GET_PRODUCT,
      payload: { response: error, error: true },
    });
  }
};

export const clearGetProductProps = () => async (dispatch) => {
  dispatch({
    type: ACTION_TYPE.GET_PRODUCT,
    payload: undefined,
  });
};
