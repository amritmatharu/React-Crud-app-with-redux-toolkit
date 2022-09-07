import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  loading: true,
  error: "",
  action: "",
  isProductsChanged: false,
};
const productStore = createSlice({
  name: "product",
  initialState,
  reducers: {
    replaceProducts(state, action) {
      state.products = action.payload;
      state.loading = false;
      state.error = "";
      state.action = "replaceProducts";
    },
    editProductInState(state, action) {
      const editedProduct = action.payload;
      state.products.map((item) => {
        if (item.id === editedProduct.id) {
          item = editedProduct;
        }
      });
    },
    addNewProduct(state, action) {
      const newItem = action.payload;
      console.log("newItem: ", newItem);
      state.isProductsChanged = true;
      const existingItem = state.products.find(
        (item) => item.id === newItem.id
      );
      if (!existingItem) {
        state.loading = false;
        state.products.push({
          name: newItem.name,
          id: newItem.id,
          price: newItem.price,
          quantity: newItem.quantity,
          description: newItem.description,
        });
      }
    },
    editProduct() {},
    deleteProduct(state, action) {
      const id = action.payload;
      state.products = state.products.filter((item) => item.id !== id);
    },
    getProductById() {},
  },
});
export default productStore;
export const productAllActions = productStore.actions;
