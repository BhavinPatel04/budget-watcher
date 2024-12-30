import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MonthlyHistoryItem } from "@/types";

export type MonthlyHistoryInitialState = {
  month: string;
  items: MonthlyHistoryItem[];
};

const initialState: MonthlyHistoryInitialState = {
  month: "",
  items: [],
};

const monthlyHistorySlice = createSlice({
  name: "monthlyHistory",
  initialState,
  reducers: {
    reset: (state) => {
      state.month = "";
      state.items = [];
    },
    updateMonth: (state, action: PayloadAction<string>) => {
      state.month = action.payload;
    },
    addItem: (state, action: PayloadAction<MonthlyHistoryItem>) => {
      state.items.push(action.payload);
    },
    addItems: (state, action: PayloadAction<MonthlyHistoryItem[]>) => {
      state.items = state.items.concat(action.payload);
    },
    deleteItem: (state, action: PayloadAction<MonthlyHistoryItem["id"]>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    deleteItems: (state) => {
      state.items = [];
    },
  },
  selectors: {
    monthSelector: (state) => state.month,
    itemsSelector: (state) => state.items,
  },
});

export const {
  actions: monthlyHistoryActions,
  reducer: monthlyHistoryReducer,
  selectors: monthlyHistorySelectors,
} = monthlyHistorySlice;
