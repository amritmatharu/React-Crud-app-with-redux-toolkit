import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterStore";
import authReducer from "./authStore";
import cartToggle from "./cartToggleStore";
import cartSlice from "./cartSlice";
import productStore from "./product-store";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    cartToggle: cartToggle,
    cart: cartSlice.reducer,
    product: productStore.reducer,
  },
});
export default store;
