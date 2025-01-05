export type ReceiptItem = {
  id: string;
  name: string;
  price: number;
  category: Category;
  subCategory: string;
  storeName: string;
};

export type ReviewReceiptItem = Omit<ReceiptItem, "price"> & {
  price: string;
};

export type MonthlyHistoryItem = {
  id: string;
  name: string;
  price: number;
  items: ReceiptItem[];
  categoryTotal: {
    [key in Category]: number;
  };
};

export type SubCategoryItem = {
  name: string;
  price?: number;
};

export type AppSelectItem = {
  name: string;
};

export type MonthlyHistory = {
  [key: string]: MonthlyHistoryItem;
};

// create enum using const
export const enum Categories {
  Alcohol = "Alcohol",
  Clothing = "Clothing",
  Electronics = "Electronics",
  HomeFurnishings = "Home Furnishings",
  Groceries = "Groceries",
  Other = "Other",
  Restaurants = "Restaurants",
  Gas = "Gas",
}

export type Category = (typeof Categories)[keyof typeof Categories] | string;
