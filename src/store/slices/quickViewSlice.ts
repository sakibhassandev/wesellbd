import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "quickView",
  initialState: false,
  reducers: {
    isQuickViewOpen(state: unknown, action: PayloadAction<string>) {
      if (action.payload === "openQuickView") {
        return true;
      } else if (action.payload === "closeQuickView") {
        return false;
      }
    },
  },
});

export default slice.reducer;
export const { isQuickViewOpen } = slice.actions;
