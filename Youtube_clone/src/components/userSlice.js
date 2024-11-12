import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
  userEmail: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.isAuthenticated = true), (state.userEmail = action.payload);
    },
    logout: (state) => {
      (state.isAuthenticated = false), (state.userEmail = "");
    },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
