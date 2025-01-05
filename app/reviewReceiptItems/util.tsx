import TextRecognition from "@react-native-ml-kit/text-recognition";
import {
  getSubTotalFromItems,
  getTotalFromItems,
  parseTextFromImage,
} from "@/utils/textRecognition";
import {
  Category,
  MonthlyHistory,
  ReceiptItem,
  SubCategoryItem,
} from "@/types";
import { isPureLineString } from "@/utils";
import { getFoodCategory } from "@/utils/fdc";

export const processImageUri = async (
  imageUri: string,
  receiptCategory: string,
  storeName: string,
) => {
  const result = await TextRecognition.recognize(imageUri);
  const parsedData = parseTextFromImage(result, receiptCategory, storeName);
  const total = getTotalFromItems(parsedData);
  const subTotal = getSubTotalFromItems(parsedData);
  const lines = result.blocks
    .map((block) => block.lines)
    .flat()
    .map((line) => line.text)
    .filter((line) => isPureLineString(line));
  const uniqueLines = [...new Set(lines)];
  const filteredItems: ReceiptItem[] = [];
  parsedData.forEach((item) => {
    if (Number(item.price) !== total && Number(item.price) !== subTotal) {
      filteredItems.push(item);
      if (!uniqueLines.includes(item.name)) {
        uniqueLines.push(item.name);
      }
    }
  });
  const itemTotal = Number(
    filteredItems.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2),
  );

  return {
    uniqueLines,
    itemTotal,
    total,
    parsedData,
    filteredItems,
  };
};

export const getCategoryData = async (filteredItems: ReceiptItem[]) => {
  const _subCategories: SubCategoryItem[] = [];
  const items = filteredItems.map((item) => item.name);
  const promises = items.map((item) => getFoodCategory(item));
  const responses = await Promise.allSettled(promises);
  let subCategorizedData: Record<string, string> = {};
  responses.forEach((response) => {
    if (response.status === "fulfilled" && response.value) {
      subCategorizedData = { ...subCategorizedData, ...response.value };
    }
  });
  const updatedItems = filteredItems.map((item) => {
    const subCategory = subCategorizedData[item.name];
    const _subCategory = subCategory
      ? subCategory.charAt(0).toUpperCase() + subCategory.slice(1)
      : "Other";
    item.subCategory = _subCategory;
    if (!_subCategories.map((c) => c.name).includes(_subCategory)) {
      _subCategories.push({ name: _subCategory, price: item.price });
    }
    return item;
  });
  return { updatedItems, subCategories: _subCategories };
};

export const getMonthlyHistoryDataToSubmit = (
  monthlyHistory: MonthlyHistory,
  currentMonth: string,
  receiptItems: ReceiptItem[],
) => {
  const currentMonthHistory = { ...(monthlyHistory[currentMonth] || {}) };
  const _receiptItems = [...(currentMonthHistory.items || []), ...receiptItems];
  const categoryTotal = { ...(currentMonthHistory.categoryTotal || {}) };
  // group receiptItems by category
  const itemsByCategory: Record<Category, ReceiptItem[]> = _receiptItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<Category, ReceiptItem[]>,
  );

  (Object.keys(itemsByCategory) as Category[]).forEach((category) => {
    const categoryItems = itemsByCategory[category];
    const total = categoryItems.reduce((acc, item) => acc + item.price, 0);
    categoryTotal[category] = total;
  });
  return {
    receiptItems: _receiptItems,
    categoryTotal,
    currentMonthHistory,
  };
};
