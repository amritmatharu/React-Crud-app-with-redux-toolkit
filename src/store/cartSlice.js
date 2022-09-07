import { createSlice } from "@reduxjs/toolkit";
import { cartToggleActions } from "./cartToggleStore";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    cartChanged: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      console.log("newItem added to cart: ", newItem);
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.cartChanged = true;
      if (!existingItem) {
        state.items.push({
          name: newItem.name,
          id: newItem.id,
          price: newItem.price,
          totalPrice: newItem.price,
          quantity: 1,
          description: newItem.description,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.cartChanged = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export default cartSlice;
export const cartActions = cartSlice.actions;
