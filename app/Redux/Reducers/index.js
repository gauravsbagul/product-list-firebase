import { combineReducers } from 'redux';
import onBoarding from './onBoarding';

export const AllReducers = combineReducers({
  auth: onBoarding,
});

const rootReducer = (state, action) => {
  return AllReducers(state, action);
};
export default rootReducer;
