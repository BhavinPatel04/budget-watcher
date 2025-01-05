import { DATE_FORMAT } from "@/constants/app";
import { SubCategoryItem, MonthlyHistory, Category, Categories } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

export type AppInitialState = {
  categories: Category[];
  subCategories: SubCategoryItem[];
  monthlyHistory: MonthlyHistory;
  selectedMonth: string;
  storeNames: string[];
};

const currentMonth = moment().format(DATE_FORMAT);

const initialState: AppInitialState = {
  categories: [
    Categories.Groceries,
    Categories.Gas,
    Categories.Restaurants,
    Categories.Alcohol,
    Categories.Electronics,
    Categories.Clothing,
    Categories.Other,
  ],
  subCategories: [],
  monthlyHistory: {},
  selectedMonth: currentMonth,
  storeNames: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    reset: (state) => {
      state.categories = [
        Categories.Groceries,
        Categories.Gas,
        Categories.Restaurants,
        Categories.Alcohol,
        Categories.Electronics,
        Categories.Clothing,
        Categories.Other,
      ];
      state.subCategories = [];
      state.monthlyHistory = {};
      state.selectedMonth = currentMonth;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories = [...state.categories, action.payload];
    },
    addCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = state.categories.concat(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<Category>) => {
      state.categories = state.categories.filter(
        (category) => category !== action.payload,
      );
    },
    deleteCategories: (state) => {
      state.categories = [];
    },
    addSubCategory: (state, action: PayloadAction<SubCategoryItem>) => {
      state.subCategories = [...state.subCategories, action.payload];
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
    addMonthlyHistory: (state, action: PayloadAction<MonthlyHistory>) => {
      state.monthlyHistory = {
        ...state.monthlyHistory,
        ...action.payload,
      };
    },
    addMonthlyHistoryItem: (state, action: PayloadAction<MonthlyHistory>) => {
      state.monthlyHistory = {
        ...state.monthlyHistory,
        ...action.payload,
      };
    },
    deleteMonthlyHistory: (state) => {
      state.monthlyHistory = {};
    },
    deleteMonthlyHistoryItem: (state, action: PayloadAction<string>) => {
      delete state.monthlyHistory[action.payload];
    },
    updateSelectedMonth: (state, action: PayloadAction<string>) => {
      state.selectedMonth = action.payload;
    },
    addStoreName: (state, action: PayloadAction<string>) => {
      state.storeNames = [...state.storeNames, action.payload];
    },
    addStoreNames: (state, action: PayloadAction<string[]>) => {
      state.storeNames = state.storeNames.concat(action.payload);
    },
    deleteStoreName: (state, action: PayloadAction<string>) => {
      state.storeNames = state.storeNames.filter(
        (storeName) => storeName !== action.payload,
      );
    },
  },
  selectors: {
    storeNamesSelector: (state) => state.storeNames,
    categoriesSelector: (state) => state.categories,
    subCategoriesSelector: (state) => state.subCategories,
    monthlyHistorySelector: (state) => state.monthlyHistory,
    selectedMonthSelector: (state) => state.selectedMonth,
  },
});

export const {
  actions: appActions,
  reducer: appReducer,
  selectors: appSelectors,
} = appSlice;
