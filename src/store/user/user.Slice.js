import { createSlice } from '@reduxjs/toolkit';

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState: INITIAL_STATE,
  reducers: {
    userReducer(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { userReducer } = userSlice.actions;
export default userSlice.reducer;

// export const userReducer = (state = INITIAL_STATE, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case USER_ACTION_TYPES.SET_CURRENT_USER:
//       return {
//         ...state,
//         currentUser: payload,
//       };
//     default:
//       return state;
//   }
// };
