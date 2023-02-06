import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.Slice';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

// import { compose, createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';

// import { rootReducer } from './root-reducer';

// const middleWares = [logger];

// const composedEnhancers = compose(applyMiddleware(...middleWares));

// export const store = createStore(rootReducer, undefined, composedEnhancers);
