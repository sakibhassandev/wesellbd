import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/store/slices/cartSlice";
import wishListReducer from "@/store/slices/wishListSlice";
import miniCartReducer from "@/store/slices/miniCartSlice";
import quickViewReducer from "@/store/slices/quickViewSlice";

export const store = configureStore({
  reducer: {
    cartItems: cartReducer,
    wishList: wishListReducer,
    miniCart: miniCartReducer,
    quickView: quickViewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
