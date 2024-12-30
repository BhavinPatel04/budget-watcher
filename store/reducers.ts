import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { documentDirectory, EncodingType } from "expo-file-system";
import { persistReducer } from "redux-persist";
import { createExpoFileSystemStorage } from "redux-persist-expo-file-system-storage";

import { appReducer, AppInitialState } from "./app/slice";
import {
  receiptItemsReducer,
  ReceiptSliceInitialState,
} from "./receiptItems/slice";
import {
  monthlyHistoryReducer,
  MonthlyHistoryInitialState,
} from "./monthlyHistory/slice";

console.info("Document Directory:", documentDirectory);

export const expoFileSystemStorage = createExpoFileSystemStorage({
  storagePath: `${documentDirectory}customPathName/`,
  encoding: EncodingType.UTF8,
  debug: true,
});

const persist = (key: string, reducer: Reducer) =>
  persistReducer(
    {
      key,
      storage: expoFileSystemStorage,
    },
    reducer,
  );

export const rootReducer = combineReducers({
  app: persist("app", appReducer) as Reducer<AppInitialState>,
  receiptItems: persist(
    "receiptItems",
    receiptItemsReducer,
  ) as Reducer<ReceiptSliceInitialState>,
  monthlyHistory: persist(
    "monthlyHistory",
    monthlyHistoryReducer,
  ) as Reducer<MonthlyHistoryInitialState>,
});
export type RootReducer = ReturnType<typeof rootReducer>;
