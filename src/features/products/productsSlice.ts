import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types";
import {
  fetchProducts as apiFetchProducts,
  fetchCategories as apiFetchCategories,
} from "../../api/fakestore";

type ProductsState = {
  items: Product[];
  categories: string[];
  selectedCategory: string; // ← 현재 선택된 카테고리 ("all" 포함)
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ProductsState = {
  items: [],
  categories: [],
  selectedCategory: "all",
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  return await apiFetchProducts();
});

export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  return await apiFetchCategories();
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // ✅ CategoryFilter에서 사용하는 액션 (다시 추가)
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "failed to fetch products";
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.categories = action.payload;
      });
  },
});

export const { setCategory } = productsSlice.actions; // ✅ 내보내기
export default productsSlice.reducer;
