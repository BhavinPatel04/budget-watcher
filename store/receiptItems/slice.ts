import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SubCategoryItem, ReceiptItem, Category, Categories } from "@/types";

export type ReceiptSliceInitialState = {
  receiptCategory: Category;
  imageUri: string;
  scanningReceipt: boolean;
  allItems: ReceiptItem[];
  items: ReceiptItem[];
  subCategories: SubCategoryItem[];
  total: number;
  lines: string[]; // stores all the strings extracted from the image
};

const initialState: ReceiptSliceInitialState = {
  receiptCategory: Categories.Groceries,
  imageUri: "",
  scanningReceipt: false,
  allItems: [],
  items: [],
  subCategories: [],
  total: 0,
  lines: [],
};

const receiptItemsSlice = createSlice({
  name: "receiptItems",
  initialState,
  reducers: {
    reset: (state) => {
      state.receiptCategory = Categories.Groceries;
      state.imageUri = "";
      state.scanningReceipt = false;
      state.allItems = [];
      state.items = [];
      state.total = 0;
      state.subCategories = [];
      state.lines = [];
    },
    updateReceiptCategory: (state, action: PayloadAction<Category>) => {
      state.receiptCategory = action.payload;
    },
    updateImageUri: (state, action: PayloadAction<string>) => {
      state.imageUri = action.payload;
    },
    updateScanningReceipt: (state, action: PayloadAction<boolean>) => {
      state.scanningReceipt = action.payload;
    },
    updateTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    addItem: (state, action: PayloadAction<ReceiptItem>) => {
      state.items.push(action.payload);
    },
    addItems: (state, action: PayloadAction<ReceiptItem[]>) => {
      state.items = state.items.concat(action.payload);
    },
    addAllItems: (state, action: PayloadAction<ReceiptItem[]>) => {
      state.allItems = state.allItems.concat(action.payload);
    },
    deleteItem: (state, action: PayloadAction<ReceiptItem["id"]>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    deleteItems: (state) => {
      state.items = [];
    },
    deleteAllItems: (state) => {
      state.allItems = [];
    },
    updateItem: (state, action: PayloadAction<ReceiptItem>) => {
      const { id, name, price, subCategory, category } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index >= 0) {
        state.items[index] = { id, name, price, subCategory, category };
      }
    },
    updateItems: (state, action: PayloadAction<ReceiptItem[]>) => {
      state.items = action.payload;
    },
    addSubCategory: (state, action: PayloadAction<SubCategoryItem>) => {
      state.subCategories.push(action.payload);
    },
    addSubCategories: (state, action: PayloadAction<SubCategoryItem[]>) => {
      state.subCategories = state.subCategories.concat(action.payload);
    },
    deleteSubCategory: (
      state,
      action: PayloadAction<SubCategoryItem["name"]>,
    ) => {
      state.subCategories = state.subCategories.filter(
        (subCategory) => subCategory.name !== action.payload,
      );
    },
    deleteSubCategories: (state) => {
      state.subCategories = [];
    },
    addLine: (state, action: PayloadAction<string>) => {
      state.lines.push(action.payload);
    },
    addLines: (state, action: PayloadAction<string[]>) => {
      state.lines = action.payload;
    },
    deleteLine: (state, action: PayloadAction<string>) => {
      state.lines = state.lines.filter((line) => line !== action.payload);
    },
    deleteLines: (state) => {
      state.lines = [];
    },
  },
  selectors: {
    receiptCategorySelector: (state) => state.receiptCategory,
    receiptItemsSelector: (state) => state.items,
    imageUriSelector: (state) => state.imageUri,
    scanningReceiptSelector: (state) => state.scanningReceipt,
    subCategoriesSelector: (state) => state.subCategories,
    totalSelector: (state) => state.total,
    linesSelector: (state) => state.lines,
  },
});

export const {
  actions: receiptItemsActions,
  reducer: receiptItemsReducer,
  selectors: receiptItemsSelectors,
} = receiptItemsSlice;
