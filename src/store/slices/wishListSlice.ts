import { WishListState } from "@/lib/definitions";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

const findItemIndex = (
  state: WishListState[],
  action: PayloadAction<{ id: WishListState["id"] }>
) => state.findIndex((item) => item.id === action.payload.id);

const slice = createSlice({
  name: "wishList",
  initialState:
    typeof window !== "undefined" && window.localStorage
      ? JSON.parse(localStorage.getItem("wishlistItems") || "[]")
      : [],
  reducers: {
    addWishListItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += action.payload.quantity || 1;
      } else {
        state.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      localStorage.setItem("wishlistItems", JSON.stringify(current(state)));
    },
    removeWishListItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      state.splice(existingItemIndex, 1);
      localStorage.setItem("wishlistItems", JSON.stringify(current(state)));
    },
    increaseWishlistQuantity(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += 1;
      }
      localStorage.setItem("wishlistItems", JSON.stringify(current(state)));
    },
    decreaseWishlistQuantity(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity -= 1;
      }
      if (state[existingItemIndex].quantity === 0) {
        state.splice(existingItemIndex, 1);
      }
      localStorage.setItem("wishlistItems", JSON.stringify(current(state)));
    },
  },
});

export default slice.reducer;
export const {
  addWishListItem,
  removeWishListItem,
  increaseWishlistQuantity,
  decreaseWishlistQuantity,
} = slice.actions;
