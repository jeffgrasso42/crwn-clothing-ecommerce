import { combineReducers } from 'redux';

import { userReducer } from './user/user.Slice';

export const rootReducer = combineReducers({
  user: userReducer,
});
