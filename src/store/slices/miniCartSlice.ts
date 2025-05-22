import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "miniCart",
  initialState: false,
  reducers: {
    isMiniCartOpen(state: unknown, action: PayloadAction<string>) {
      if (action.payload === "openMiniCart") {
        return true;
      } else if (action.payload === "closeMiniCart") {
        return false;
      }
    },
  },
});

export default slice.reducer;
export const { isMiniCartOpen } = slice.actions;
