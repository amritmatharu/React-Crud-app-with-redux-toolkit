import { createSlice } from "@reduxjs/toolkit";
import Title from "antd/lib/skeleton/Title";
const initialCartToggleState = {
  isCartVisible: false,
  notification: null,
};
const cartToggleSlice = createSlice({
  name: "cartToggle",
  initialState: initialCartToggleState,
  reducers: {
    toggle(state) {
      state.isCartVisible = !state.isCartVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});
export const cartToggleActions = cartToggleSlice.actions;
export default cartToggleSlice.reducer;
