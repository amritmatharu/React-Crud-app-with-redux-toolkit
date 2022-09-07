import { createSlice } from "@reduxjs/toolkit";

//Authetication Slice
const initialAuthState = {
  isAutheticated: false,
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAutheticated = true;
    },
    logout(state) {
      state.isAutheticated = false;
    },
  },
});
export default authSlice.reducer;
export const authActions = authSlice.actions;
