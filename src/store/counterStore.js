import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
  showCounter: true,
};
//Using react Toolkit Create Slice for creating a slice of our store
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggle(state) {
      state.showCounter = !state.showCounter;
    },
  },
});
export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
