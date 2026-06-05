import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    addWishlist: (state, action) => {
      const exists = state.wishlist.find(
        (item) => item._id === action.payload._id
      );

      if (!exists) {
        state.wishlist.push(action.payload);

        localStorage.setItem(
          "wishlist",
          JSON.stringify(state.wishlist)
        );
      }
    },

    removeWishlists: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item._id !== action.payload
      );

      localStorage.setItem(
        "wishlist",
        JSON.stringify(state.wishlist)
      );
    },

    clearWishlist: (state) => {
      state.wishlist = [];

      localStorage.removeItem("wishlist");
    },
  },
});

export const {
  addWishlist,
  removeWishlists,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;