import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addCart: (state, action) => {
      const exists = state.cart.find(
        (item) => item._id === action.payload._id &&
      item.selectedSize === action.payload.selectedSize

      );

      if (!exists) {
        state.cart.push(action.payload);

        localStorage.setItem(
          "cart",
          JSON.stringify(state.cart)
        );
      }
    },

    removeCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item._id !== action.payload
      );

      localStorage.setItem(
        "cart",
        JSON.stringify(state.cart)
      );
    },

    clearCart: (state) => {
      state.cart = [];

      localStorage.removeItem("cart");
    },
  },
});

export const {
  addCart,
  removeCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;