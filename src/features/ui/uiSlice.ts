import { createSlice } from "@reduxjs/toolkit";

type UIState = { miniCartOpen: boolean };

const initialState: UIState = { miniCartOpen: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openMiniCart: (s) => { s.miniCartOpen = true; },
    closeMiniCart: (s) => { s.miniCartOpen = false; },
    toggleMiniCart: (s) => { s.miniCartOpen = !s.miniCartOpen; },
  },
});

export const { openMiniCart, closeMiniCart, toggleMiniCart } = uiSlice.actions;
export default uiSlice.reducer;
