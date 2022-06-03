import { createSlice } from "@reduxjs/toolkit";
import api from "services/api";

const INITIAL_STATE = {
  currentUserToken: window.sessionStorage.getItem("Auth Token"),
  currentUser: [{}],
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,

  reducers: {
    fetchUser(state, action) {
      if (state.currentUserToken) {
        api.get(`/usuarios/email/${action.email}`).then((result) => {
          state.currentUser.push(result.data);
        });
      }
    },
  },
});

export const cartActions = userSlice.actions;
export default userSlice;
