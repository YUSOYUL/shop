import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "../../types";

type CartState = { items: CartItem[] };
const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const found = state.items.find((it) => it.product.id === action.payload.id);
      if (found) found.qty += 1;
      else state.items.push({ product: action.payload, qty: 1 });
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((it) => it.product.id !== action.payload);
    },
    inc(state, action: PayloadAction<number>) {
      const it = state.items.find((i) => i.product.id === action.payload);
      if (it) it.qty += 1;
    },
    dec(state, action: PayloadAction<number>) {
      const it = state.items.find((i) => i.product.id === action.payload);
      if (it && it.qty > 1) it.qty -= 1;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, inc, dec, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const cartTotal = (items: CartItem[]) =>
  items.reduce((sum, it) => sum + it.product.price * it.qty, 0);
