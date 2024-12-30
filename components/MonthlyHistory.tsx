import React from "react";
import { useAppSelector } from "@/hooks";
import { appSelectors } from "@/store/app/slice";
import { Categories, Category, MonthlyHistoryItem, ReceiptItem } from "@/types";
import { Platform, StyleSheet } from "react-native";
import { H2, Separator, Text, View, XStack, YStack } from "tamagui";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CategorySelection } from "./CategorySelection";
import { getDifferenceText, getDifferenceTextColor } from "@/utils";
import { MonthlyHistoryAccordion } from "./MonthlyHistoryAccordion";

export type MonthlyHistoryProps = {};

export function MonthlyHistory({}: MonthlyHistoryProps) {
  const selectedMonth = useAppSelector(appSelectors.selectedMonthSelector);
  const monthlyHistory = useAppSelector(appSelectors.monthlyHistorySelector);
  const [selectedCategory, setSelectedCategory] = React.useState<Category>(
    Categories.Groceries,
  );
  const history: MonthlyHistoryItem = monthlyHistory[selectedMonth] || {};
  const difference =
    Number(history.price || 0) - Number(history.lastMonthPrice || 0);

  const items = [...(history.items || [])].filter(
    (item) => item.category === selectedCategory,
  );

  const itemsByCategory: Record<Category, ReceiptItem[]> =
    items.reduce(
      (acc, item) => {
        if (!item.subCategory || item.subCategory === "") {
          item.subCategory = "Others";
        }
        if (!acc[item.subCategory]) {
          acc[item.subCategory] = [];
        }
        acc[item.subCategory].push(item);
        return acc;
      },
      {} as Record<Category, ReceiptItem[]>,
    ) || {};

  const categoriesList = Object.keys(itemsByCategory);

  return (
    <View flex={1} height={"100%"}>
      <View flex={2}>
        <H2>
          ${Number(history.price || 0).toFixed(2)}{" "}
          <Text color={getDifferenceTextColor(difference)}>
            {getDifferenceText(difference)}
          </Text>
        </H2>
        <Text color={"$gray10"} fontSize={"$5"}>
          Last month: ${Number(history.lastMonthPrice || 0).toFixed(2)}
        </Text>
      </View>
      <Separator marginBottom={8} />
      <View flex={2}>
        <CategorySelection
          id="category-selection"
          defaultCategory={selectedCategory}
          showCategoryTotal={true}
          onCategorySelect={(category: Category) => {
            setSelectedCategory(category);
          }}
        />
      </View>
      <Separator marginTop={9} />
      <View flex={10}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={
            Platform.OS == "android" ? "handled" : "always"
          }
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={true}
        >
          {!categoriesList.length && (
            <YStack
              flex={1}
              justifyContent="center"
              alignItems="center"
              marginTop={100}
            >
              <Text color="$gray10" fontSize={"$6"}>
                No items found. Start adding by scanning or add manually.
              </Text>
            </YStack>
          )}
          {!!categoriesList.length && (
            <MonthlyHistoryAccordion itemsByCategory={itemsByCategory} />
          )}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
