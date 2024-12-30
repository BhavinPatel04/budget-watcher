import { DATE_FORMAT } from "@/constants/app";
import { useAppSelector } from "@/hooks";
import { appSelectors } from "@/store/app/slice";
import { Category, Categories, MonthlyHistoryItem } from "@/types";
import { getDifferenceText, getDifferenceTextColor } from "@/utils";
import moment from "moment";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  H4,
  Label,
  Separator,
  styled,
  Text,
  ToggleGroup,
  XStack,
  YStack,
} from "tamagui";

const StyledToggleGroupItem = styled(ToggleGroup.Item, {
  variants: {
    active: {
      true: {
        borderRadius: 40,
        backgroundColor: "$gray6",
      },
    },
  },
});

export type CategorySelectionProps = {
  id?: string;
  defaultCategory: Category;
  label?: string;
  showCategoryTotal?: boolean;
  onCategorySelect: (category: Category) => void;
};

export function CategorySelection({
  id = "category-selection",
  defaultCategory,
  label = "",
  showCategoryTotal,
  onCategorySelect,
}: CategorySelectionProps) {
  const selectedMonth = useAppSelector(appSelectors.selectedMonthSelector);
  const monthlyHistory = useAppSelector(appSelectors.monthlyHistorySelector);
  const lastMonth = moment(selectedMonth)
    .subtract(1, "month")
    .format(DATE_FORMAT);
  const history: MonthlyHistoryItem = monthlyHistory[selectedMonth] || {};
  const lastMonthHistory: MonthlyHistoryItem = monthlyHistory[lastMonth] || {};
  const categories: Category[] = useAppSelector(
    appSelectors.categoriesSelector,
  );

  const getTotalText = (category: Category) => {
    const categoryTotal = history.categoryTotal;
    const lastMonthCategoryTotal = lastMonthHistory.categoryTotal;
    const categoryTotalValue = (categoryTotal && categoryTotal[category]) || 0;
    const lastMonthCategoryTotalValue =
      (lastMonthCategoryTotal && lastMonthCategoryTotal[category]) || 0;
    const difference = categoryTotalValue - lastMonthCategoryTotalValue;
    const categoryTotalText = `$${
      categoryTotalValue
        ? Number(categoryTotalValue).toFixed(2)
        : Number(0).toFixed(2)
    }`;
    const lastMonthCategoryTotalText = `$${
      lastMonthCategoryTotalValue
        ? Number(lastMonthCategoryTotalValue).toFixed(2)
        : Number(0).toFixed(2)
    }`;

    return (
      <YStack alignItems="center">
        <XStack gap={4}>
          <Text>{categoryTotalText}</Text>
          <Text color={getDifferenceTextColor(difference)}>
            {getDifferenceText(difference)}
          </Text>
        </XStack>
        <Text color={"$gray10"}>{lastMonthCategoryTotalText}</Text>
      </YStack>
    );
  };

  return (
    <XStack
      width={"100%"}
      alignItems="center"
      justifyContent="center"
      minHeight={50}
    >
      {label && (
        <>
          <Label
            width={"100%"}
            paddingRight="$0"
            justifyContent="flex-end"
            alignItems="center"
            size={"$4"}
            htmlFor={id}
          >
            <H4>{label}</H4>
          </Label>
          <Separator marginVertical={4} />
        </>
      )}
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={
          Platform.OS == "android" ? "handled" : "always"
        }
        style={{ flex: 1 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <ToggleGroup
          flex={1}
          orientation={"horizontal"}
          borderWidth={0}
          type={"single"}
          disableDeactivation={true}
          disablePassBorderRadius={true}
          defaultValue={defaultCategory}
          minHeight={50}
          onValueChange={(category: Category) => {
            onCategorySelect(category);
          }}
        >
          {categories.map((category, index) => (
            <StyledToggleGroupItem
              key={`receipt-type-${index}`}
              value={category}
              aria-label={category}
              borderWidth={0}
              paddingVertical={8}
              paddingHorizontal={16}
              active={category === defaultCategory}
            >
              <YStack alignItems="center">
                <Text fontWeight={"bold"}>{category}</Text>
                {showCategoryTotal && getTotalText(category)}
              </YStack>
            </StyledToggleGroupItem>
          ))}
        </ToggleGroup>
      </KeyboardAwareScrollView>
    </XStack>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
  },
  button: {
    padding: 8,
    width: "100%",
  },
});
