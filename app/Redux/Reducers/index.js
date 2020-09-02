import { combineReducers } from 'redux';
import onBoarding from './onBoarding';
import products from './products';

export const AllReducers = combineReducers({
  auth: onBoarding,
  products: products,
});

const rootReducer = (state, action) => {
  return AllReducers(state, action);
};
export default rootReducer;
