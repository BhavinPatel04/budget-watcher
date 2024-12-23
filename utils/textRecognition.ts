import { TextLine, TextRecognitionResult } from "@react-native-ml-kit/text-recognition";

export type ReceiptItem = {
  item: string;
  price: string;
};

export const parseTextFromImage = (result: TextRecognitionResult): ReceiptItem[] => {
  const threshold = 25;
  const lineList: TextLine[] = result.blocks
    .map((block) => block.lines).flat();

  const items: ReceiptItem[] = [];
  lineList.forEach((line) => {
    const top = line.frame?.top;
    const text = line.text;
    if (!top || text.startsWith('$')) return;
    const item = lineList.find((l) => {
      return l.text !== text &&
        l.frame?.top &&
        l.frame.top > top - threshold &&
        l.frame.top < top + threshold;
    });
    if(item && item.text.startsWith('$')) {
      items.push({
        item: text,
        price: item.text
      });
    } else {
      console.log('Price not found for item', line);
    }
  });

  return items;
};