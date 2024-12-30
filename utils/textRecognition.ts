import {
  TextLine,
  TextRecognitionResult,
} from "@react-native-ml-kit/text-recognition";
import { Category, ReceiptItem } from "@/types";
import { getIsDollarAmount, removeNonAlphabets } from ".";

export const parseTextFromImage = (
  result: TextRecognitionResult,
  category: Category,
): ReceiptItem[] => {
  const threshold = 25;
  const lineList: TextLine[] = result.blocks.map((block) => block.lines).flat();
  const items: ReceiptItem[] = [];
  lineList.forEach((line, lineIndex) => {
    const top = line.frame?.top;
    const text = line.text;
    if (!top || getIsDollarAmount(text)) return;
    const amountItem = lineList.find((l, index) => {
      return (
        l.text !== text &&
        l.frame?.top &&
        l.frame.top > top - threshold &&
        l.frame.top < top + threshold &&
        index > lineIndex // make sure the the amount/number is after the item
      );
    });
    if (amountItem && getIsDollarAmount(amountItem.text)) {
      items.push({
        id: `${text}-${lineIndex}`,
        name: text,
        price: Number(amountItem.text.replace("$", "")),
        category,
      });
    } else {
      console.info("Price not found for item", line);
    }
  });

  return items;
};

export const getTotalFromItems = (items: ReceiptItem[]): number => {
  let total = 0;

  items.some((item) => {
    const sanitizedItemName = removeNonAlphabets(item.name).toLowerCase();
    /**
     * Don't use any spaces
     */
    ["total", "totalsales"].includes(sanitizedItemName) &&
      (total = Number(item.price));
  });
  if (!total) {
    total = items.reduce((acc, item) => acc + Number(item.price), 0);
  }
  return total;
};

export const getSubTotalFromItems = (items: ReceiptItem[]): number => {
  let subTotal = 0;
  items.some((item) => {
    const sanitizedItemName = removeNonAlphabets(item.name).toLowerCase();
    /**
     * Don't use any spaces
     */
    ["subtotal"].includes(sanitizedItemName) && (subTotal = Number(item.price));
  });
  return subTotal;
};

export const getTaxFromItems = (items: ReceiptItem[]): number => {
  let hst = 0;
  items.some((item) => {
    const sanitizedItemName = removeNonAlphabets(item.name).toLowerCase();
    /**
     * Don't use any spaces
     */
    ["hst", "tax"].includes(sanitizedItemName) && (hst = Number(item.price));
  });
  return hst;
};
