import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  authToken: "",
  authEmail: "",
  authCurrentUser: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,

  reducers: {
    getUser: (state, action) => {
      const data = action.payload;
      if (state.authCurrentUser.length === 0) {
        state.authToken = data.authToken;
        state.authEmail = data.authEmail;
        state.authCurrentUser = data.authCurrentUser;
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
