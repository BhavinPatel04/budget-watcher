import { OpaqueColorValue } from "react-native";
import { GetThemeValueForKey } from "tamagui";

export const getDifferenceText = (difference: number): string => {
  let text = "";
  const differenceText = difference.toFixed(2).replace("-", "");
  if (difference === 0) {
    text = `($${differenceText})`;
  } else if (difference > 0) {
    text = `(+$${differenceText})`;
  } else {
    text = `(-$${differenceText})`;
  }
  return text;
};

export const getDifferenceTextColor = (
  difference: number,
): OpaqueColorValue | "unset" | GetThemeValueForKey<"color"> | undefined => {
  if (difference === 0) {
    return "$gray10";
  } else if (difference > 0) {
    return "$red10";
  } else {
    return "$green10";
  }
};

export const getIsDollarAmount = (value: string): boolean => {
  return /^\$?\d+(\.\d{1,2})?$/.test(value);
};

export const removeNonAlphabets = (input: string): string => {
  return input.replace(/[^a-zA-Z]/g, "");
};

export const isPureString = (input: string): boolean => {
  return /^[a-zA-Z]+$/.test(input);
};

export const isPureLineString = (input: string): boolean => {
  return /^[a-zA-Z\s]+$/.test(input);
};

export const getRandomStoreName = (): string => {
  const storeName = "Store#";
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${storeName}${randomNumber}`;
};
